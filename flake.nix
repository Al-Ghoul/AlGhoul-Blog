{
  description = "NextJS development environment";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    devenv.url = "github:cachix/devenv/9ba9e3b908a12ddc6c43f88c52f2bf3c1d1e82c1";
  };

  nixConfig = {
    extra-trusted-public-keys = "devenv.cachix.org-1:w1cLUi8dv3hnoSPGAuibQv+f9TZLr6cv/Hm9XgU50cw=";
    extra-substituters = "https://devenv.cachix.org";
  };

  outputs = { self, nixpkgs, devenv, ... } @ inputs:
  let
    system = "x86_64-linux";
    pkgs = import nixpkgs { inherit system; };
  in
  {
    devShell."${system}" = with pkgs; devenv.lib.mkShell {
      inherit inputs pkgs;

      modules = [ 
        ({ pkgs, config, ... }: {

         services.mysql = {
           enable = true;
           initialDatabases = [{ name = "DevDB"; }];
         };

         packages = [
           nodejs # For neovim's LSP (Remove it if you're not using neovim)
           yarn
           firefox-devedition
           openssl # For prisma
           nodePackages.prisma
           nodePackages.dotenv-cli
        ];
   
           enterShell = ''
             echo "NextJS's development template env was set successfully"
             echo "`${nodejs}/bin/node --version`"
             export PRISMA_SCHEMA_ENGINE_BINARY=${prisma-engines}/bin/schema-engine
             export PRISMA_QUERY_ENGINE_BINARY=${prisma-engines}/bin/query-engine
             export PRISMA_QUERY_ENGINE_LIBRARY=${prisma-engines}/lib/libquery_engine.node
             export PRISMA_FMT_BINARY=${prisma-engines}/bin/prisma-fmt
           '';
         })
        ];
      };

      hydraJobs = rec {
        build =
          with pkgs; mkYarnPackage {
            name  = "Blog-build";
            src = self;
            version = (builtins.fromJSON (builtins.readFile ./package.json)).version;

            nativeBuildInputs = [
              fixup_yarn_lock
              yarn
              nodejs
            ];

            offlineCache = fetchYarnDeps {
              yarnLock = self + "/yarn.lock";
              hash = "sha256-Hzp7AVonRXbHHMIq8ux7JQI1l+a7Uzup7mH1B/h1uoc=";
            }; 

            configurePhase = ''
              export HOME=$(mktemp -d)
              fixup_yarn_lock yarn.lock
              yarn config --offline set yarn-offline-mirror $offlineCache
              yarn install --offline --frozen-lockfile --ignore-scripts --no-progress --non-interactive
              patchShebangs node_modules/
            '';

            buildPhase = ''
              runHook preBuild
              yarn typesafe-i18n --no-watch
              runHook postBuild
            '';

            installPhase = ''
              runHook preInstall
              mkdir -p $out
              mv {.,}* $out
              runHook postInstall
            '';

            doDist = false;
            doCheck = false;
            dontFixup = true;

            passthru.tests.lint = runCommand "run-lint" { buildInputs = [ yarn ]; }
            ''
              export HOME=$(mktemp -d)
              cp -r ${build}/{.,}* .
              yarn lint
              touch $out
            '';

            passthru.tests.unit-test = stdenvNoCC.mkDerivation {
              name = "unit-tests";
              src = ./.;

              buildInputs = [
                yarn
                nodejs
                openssl # For prisma
                nodePackages.prisma
              ]; 

              dontPatch = true;

              buildPhase = ''
                export PRISMA_SCHEMA_ENGINE_BINARY=${prisma-engines}/bin/schema-engine
                export PRISMA_QUERY_ENGINE_BINARY=${prisma-engines}/bin/query-engine
                export PRISMA_QUERY_ENGINE_LIBRARY=${prisma-engines}/lib/libquery_engine.node
                export PRISMA_FMT_BINARY=${prisma-engines}/bin/prisma-fmt
                export HOME=$(mktemp -d)
                cp -r ${build}/{.,}* .
                chmod +w ./node_modules
                prisma generate
                mv ./node_modules/.prisma/client/libquery_engine.node ./node_modules/.prisma/client/libquery_engine-linux-nixos.so.node
              '';

              doCheck = true;
              dontInstall = true;
              checkPhase = ''
                yarn test --testPathPattern="\\.unit.ts"
                touch $out
              '';
              dontFixup = true;
            };
          
            passthru.tests.integration-test = vmTools.runInLinuxVM (
                stdenvNoCC.mkDerivation {
                  name = "integration-test";
                  src = build.out;
                  buildInputs = [
                    mariadb
                    yarn
                    nodejs
                    openssl # For prisma
                    nodePackages.prisma
                    nodePackages.dotenv-cli
                ];
                memSize = 2 * 1024;
                dontPatch = true;
                configurePhase =  ''
                  mkdir -p ./data/.devenv/state

                  mysql_install_db --no-defaults --datadir=$PWD/data
                  cd data
                  mysqld --user=root --datadir=$PWD/../data --socket=$PWD/.devenv/state/mysqld.sock --skip-name-resolve --bind-address=localhost  &

                  sleep 2

                  mysql -w --socket=$PWD/.devenv/state/mysqld.sock -e"CREATE DATABASE DevDB;"
           
                  export PRISMA_SCHEMA_ENGINE_BINARY=${prisma-engines}/bin/schema-engine
                  export PRISMA_QUERY_ENGINE_BINARY=${prisma-engines}/bin/query-engine
                  export PRISMA_QUERY_ENGINE_LIBRARY=${prisma-engines}/lib/libquery_engine.node
                  export PRISMA_FMT_BINARY=${prisma-engines}/bin/prisma-fmt

                  yarn migrate:dev
                  mv ./node_modules/.prisma/client/libquery_engine.node ./node_modules/.prisma/client/libquery_engine-linux-nixos.so.node

                  yarn deploy:dev
                ''; 
                dontBuild = true;
                doCheck = true;
                checkPhase = ''
                  dotenv -e ./.env.development yarn test -- --testPathPattern='\.integration.ts' -i --setupFilesAfterEnv
                '';
                dontFixup = true;
          });

        };
        tests = build.tests;
    };
  };
}
