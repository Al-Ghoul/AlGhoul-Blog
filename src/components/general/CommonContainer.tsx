import { type Entity, isAuthor, isTag, isPost, isTopic } from "@/helpers";
import Link from "next/link";
import Image from "next/image";
import prisma from "@/helpers/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const CommonContainer = async ({
  lang,
  header,
  contentList,
  author,
}: Props) => {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen p-1 md:p-24  md:px-48">
      <div
        className="flex flex-col min-w-full mx-auto lg:mb-16 mb-8 backdrop-blur-3xl bg-blue-800/30 rounded-xl p-3"
        dir={lang == "ar" ? "rtl" : ""}
      >
        <div className="flex justify-between">
          <p className="text-white font-semibold text-5xl mt-auto mb-2">
            {header}
          </p>
          {author !== undefined && (
            <div className="flex flex-col md:flex-row text-white gap-2">
              <p className="mt-auto">{author!.bio}</p>
              <Image
                className="rounded-full self-center -order-1 md:order-1"
                width={70}
                height={70}
                src={author!.profileImageURL}
                alt={`${author!.name}'s profile picture`}
              />
            </div>
          )}
        </div>

        <hr />

        <ul className="flex flex-wrap max-w-screen-2xl text-white text-2xl">
          {isAuthor(contentList) &&
            contentList.map(async (item) => {
              const authorsPostsCount = await prisma.post.count({
                where: { authorId: item.id },
              });

              return (
                <li className="my-2 mr-5" key={item.id}>
                  <Link href={`/${lang}/author/${item.name}`}>
                    {item.name} : ({authorsPostsCount})
                  </Link>
                  {session?.user.is_admin && (
                    <Link
                      className="bg-green-400 text-center rounded-md self-center hover:bg-blue-500"
                      href={`/dashboard/author/edit/${item.name}`}
                    >
                      Edit Author
                    </Link>
                  )}
                </li>
              );
            })}

          {isTag(contentList) &&
            contentList.map(async (item) => {
              const tagsPostsCount = await prisma.tag.findFirst({
                where: { id: item.id },
                include: { _count: { select: { posts: true } } },
              });

              return (
                <li className="my-2 mr-5" key={item.id}>
                  <Link href={`/${lang}/tag/${item.id}`}>
                    {item.name} :({tagsPostsCount?._count.posts})
                  </Link>
                  {session?.user.is_admin && (
                    <Link
                      className="bg-green-400 text-center rounded-md self-center hover:bg-blue-500"
                      href={`/dashboard/tag/edit/${item.id}`}
                    >
                      Edit Tag
                    </Link>
                  )}
                </li>
              );
            })}

          {isPost(contentList) &&
            contentList.map(async (item) => {
              return (
                <li className="my-2 mr-5" key={item.id}>
                  <Link href={`/${lang}/post/${item.id}`}>{item.title}</Link>
                  {session?.user.is_admin && (
                    <Link
                      className="bg-green-400 text-center rounded-md self-center hover:bg-blue-500"
                      href={`/dashboard/post/edit/${item.id}`}
                    >
                      Edit Post
                    </Link>
                  )}
                </li>
              );
            })}

          {isTopic(contentList) &&
            contentList.map(async (item) => {
              return (
                <li className="my-2 mr-5" key={item.languageId}>
                  <Link href={`/${lang}/topic/${item.topicId}`}>
                    {item.translation}
                  </Link>
                  {session?.user.is_admin && (
                    <Link
                      className="bg-green-400 text-center rounded-md self-center hover:bg-blue-500"
                      href={`/dashboard/topictranslation/edit/${item.topicId}/${item.languageId}`}
                    >
                      Edit Topic Translation
                    </Link>
                  )}
                </li>
              );
            })}
        </ul>
      </div>
    </main>
  );
};

export default CommonContainer;

interface Props {
  lang: string;
  header: string;
  contentList: Entity;
  author?: AuthorType[0] | null;
}

