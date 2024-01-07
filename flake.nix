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
           initialDatabases = [{ name = "BlogDB"; }];
         };

         packages = [
           nodejs # For neovim's LSP (Remove it if you're not using neovim)
           yarn
           firefox-devedition
           openssl # For prisma
           nodePackages.prisma
          ];
 
         enterShell = ''
           echo "NextJS's development template env was set successfully"
           echo "`${nodejs}/bin/node --version`"
           exec fish
           export PRISMA_SCHEMA_ENGINE_BINARY=${prisma-engines}/bin/schema-engine
           export PRISMA_QUERY_ENGINE_BINARY=${prisma-engines}/bin/query-engine
           export PRISMA_QUERY_ENGINE_LIBRARY=${prisma-engines}/lib/libquery_engine.node
           export PRISMA_FMT_BINARY=${prisma-engines}/bin/prisma-fmt
         '';
       })
      ];
    };
  };
}
