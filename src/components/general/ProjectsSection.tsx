"use client";
import { fetcher } from "@/helpers";
import { Locales } from "@/i18n/i18n-types";
import { Project } from "@/types/global";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import Image from "next/image";
import LoadingSpinner from "../general/LoadingSpinner";

export default function ProjectsSection(
  { langCode, introMessage, headerMessage }: CompoProps,
) {
  const params = useSearchParams();
  const queryLimit = params.get("count") || 3;
  const queryDir = params.get("dir") || "fw";
  const cursor = params.get("cursor");
  const additionalParams = cursor ? `&cursor=${cursor}` : "";
  const { data, error, isLoading } = useSWR<
    { projects: Array<Project>; has_prev: boolean; has_next: boolean }
  >(
    `/api/projects?langCode=${langCode}&count=${queryLimit}&dir=${queryDir}${additionalParams}`,
    fetcher,
  );
  const lastRecId = data?.projects[data?.projects.length - 1]?.id;
  const firstRecid = data?.projects[0]?.id;

  return (
    <>
      <article className="flex min-w-full flex-col items-center prose prose-p:text-white prose-headings:text-white
                             prose-a:decoration-black prose-strong:text-white prose-code:text-white
                              prose-a:text-white prose-p:font-semibold prose-a:font-semibold
                              prose-code:bg-blue-800/70 marker:text-white font-cairo">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            {headerMessage}
          </h2>
          <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            {introMessage}
          </p>
        </div>

        {error
          ? (
            <div>
              <h3 className="text-2xl font-bold text-red-500">
                An error occurred
              </h3>
              <p>Please try again later</p>
            </div>
          )
          : null}

        {!isLoading && !data?.projects.length
          ? (
            <div>
              <h3 className="text-2xl font-bold text-red-500">
                No Projects were found.
              </h3>
            </div>
          )
          : null}

        {isLoading ? <LoadingSpinner /> : null}

        <section className="grid gap-6 md:gap-8 lg:grid-cols-3 mt-8" dir="ltr">
          {data?.projects.map((project) => (
            <div key={project.id} className="grid gap-4 relative group">
              <Link className="absolute inset-0 z-10" href={project.url}>
                <span className="sr-only">View {project.title}</span>
              </Link>
              <Image
                alt={project.description}
                className="rounded-lg object-cover w-full aspect-[1/1] group-hover:opacity-50 transition-opacity"
                height={400}
                src={project.imageURL || "/images/placeholder.svg"}
                width={400}
              />
              <div className="grid gap-1">
                <h3 className="font-semibold">{project.title}</h3>
                <p className="text-sm leading-none line-clamp-2">
                  {project.description}
                </p>
              </div>
              <Link
                className="font-semibold underline underline-offset-4"
                href={project.url}
              >
                View Project
              </Link>
            </div>
          ))}
        </section>
      </article>
      {data?.projects.length
        ? (
          <nav
            className="justify-center my-5 mx-auto"
            dir="ltr"
          >
            <ul className="list-style-none flex gap-3">
              <li>
                <Link
                  aria-disabled={!data?.has_prev}
                  href={data?.has_prev
                    ? `?count=${queryLimit}&cursor=${firstRecid}&dir=bw`
                    : "#"}
                >
                  <button
                    className="relative block rounded px-2 py-1 text-sm text-white transition-all duration-300 hover:text-blue-600 hover:bg-neutral-100 bg-blue-950 disabled:bg-transparent disabled:text-gray-950"
                    disabled={!data?.has_prev}
                  >
                    Previous
                  </button>
                </Link>
              </li>

              <li>
                <Link
                  aria-disabled={!data?.has_next}
                  href={data?.has_next
                    ? `?count=${queryLimit}&cursor=${lastRecId}&dir=fw`
                    : "#"}
                >
                  <button
                    className="relative block rounded px-2 py-1 text-sm text-white transition-all duration-300 hover:text-blue-600 hover:bg-neutral-100 bg-blue-950 disabled:bg-transparent disabled:text-gray-950"
                    disabled={!data?.has_next}
                  >
                    Next
                  </button>
                </Link>
              </li>
            </ul>
          </nav>
        )
        : null}
    </>
  );
}

type CompoProps = {
  langCode: Locales;
  introMessage: string;
  headerMessage: string;
};
