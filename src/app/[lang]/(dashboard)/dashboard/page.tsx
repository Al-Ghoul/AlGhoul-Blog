import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CreateAuthor from "@/components/Dashboard/CreateAuthor";
import CreatePost from "@/components/Dashboard/CreatePost";
import CreateTag from "@/components/Dashboard/CreateTag";
import CreateTopic from "@/components/Dashboard/CreateTopic";
import CreateTopicTranslation from "@/components/Dashboard/CreateTopicTranslation";
import DashboardTabs from "@/components/Dashboard/DashboardTabs";
import { GetAuthorsWithLanguages, GetLanguages, GetMainTopics, prisma } from "@/helpers/db";
import { getServerSession } from "next-auth/next"


const DashboardPage = async () => {
    const session = await getServerSession(authOptions);
    const languagesData = await GetLanguages();
    const topicsData = await GetMainTopics();
    const authorsData = await GetAuthorsWithLanguages();

    return (
        <main className="flex min-h-screen p-1 md:p-24 md:px-48">
            <div className="flex-col min-w-full mx-auto lg:mb-16 mb-8 backdrop-blur-3xl bg-black/25 rounded-xl p-3">
                <DashboardTabs
                    createAuthorComponent={<CreateAuthor languages={languagesData} currentUserId={session?.user.id!} currentUserProfileImage={session?.user.image!} />}
                    createTagComponent={<CreateTag languages={languagesData} />}
                    createTopicComponent={<CreateTopic />}
                    createTopicTranslationComponent={<CreateTopicTranslation languages={languagesData} topics={topicsData} />}
                    createPostComponent={<CreatePost languages={languagesData} topics={topicsData} authors={authorsData} />}
                />
            </div>
        </main>
    );
}


export default DashboardPage;