import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CreateAuthor from "@/components/Dashboard/CreateAuthor";
import CreatePost from "@/components/Dashboard/CreatePost";
import CreateTag from "@/components/Dashboard/CreateTag";
import CreateTopic from "@/components/Dashboard/CreateTopic";
import CreateTopicTranslation from "@/components/Dashboard/CreateTopicTranslation";
import DashboardTabs from "@/components/Dashboard/DashboardTabs";
import RevalidateTag from "@/components/Dashboard/RevalidateTag";
import { getBaseUrl } from "@/helpers";
import { getServerSession } from "next-auth/next"


async function fetchLanguages() {
    const res = await fetch(`${getBaseUrl()}/api/languages`, { next: { tags: ["languages"] } });

    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json() as Promise<{ languages: LanguageType }>;
}

async function fetchTags() {
    const res = await fetch(`${getBaseUrl()}/api/tags?include=language`,  { next: { tags: ["tags"] } });

    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json() as Promise<{ tags: Array<TagWithLanguage> }>;
}

async function fetchMainTopics() {
    const res = await fetch(`${getBaseUrl()}/api/maintopics`,  { next: { tags: ["maintopics"] } });

    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json() as Promise<{ topics: MainTopicsType }>;
}


async function fetchAuthorsWithLanguages() {
    const res = await fetch(`${getBaseUrl()}/api/authors?include=language`,  { next: { tags: ["authors"] } });

    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json() as Promise<{ authors: Array<AuthorWithLanguage> }>;
}


const DashboardPage = async () => {
    const session = await getServerSession(authOptions);
    const { languages } = await fetchLanguages().catch(() => ({ languages: [] }));
    const { tags } = await fetchTags().catch(() => ({ tags: [] }));
    const { topics } = await fetchMainTopics().catch(() => ({ topics: [] }));
    const { authors } = await fetchAuthorsWithLanguages().catch(() => ({ authors: [] }));


    return (
        <main className="flex min-h-screen p-1 lg:p-24">
            <div className="flex-col min-w-full mx-auto lg:mb-16 mb-8 backdrop-blur-3xl bg-blue-800/70 rounded-xl p-3">
                <DashboardTabs
                    createAuthorComponent={<CreateAuthor languages={languages} currentUserId={session?.user.id!} currentUserProfileImage={session?.user.image!} />}
                    createTagComponent={<CreateTag languages={languages} />}
                    createTopicComponent={<CreateTopic />}
                    createTopicTranslationComponent={<CreateTopicTranslation languages={languages} topics={topics} />}
                    createPostComponent={<CreatePost languages={languages} topics={topics} authors={authors} tags={tags} />}
                    revalidateTagsComponent={<RevalidateTag />}
                />
            </div>
        </main>
    );
}


export default DashboardPage;