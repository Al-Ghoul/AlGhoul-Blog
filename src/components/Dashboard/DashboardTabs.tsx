"use client";
import { Flowbite, Tabs } from "flowbite-react";
import { TbUserPlus } from "react-icons/tb";
import { IoMdPricetags } from "react-icons/io";
import { MdOutlinePostAdd, MdOutlineTopic } from "react-icons/md";
import { HiTranslate } from "react-icons/hi";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { useSearchParams } from "next/navigation";
import { GrProjects } from "react-icons/gr";

export default function DashboardTabs({
  createAuthorComponent,
  createTagComponent,
  createTopicComponent,
  createTopicTranslationComponent,
  createPostComponent,
  revalidateTagsComponent,
  createProjectComponent,
}: Props) {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab")?.toLowerCase();

  return (
    <Flowbite theme={{ theme: tabsCustomTheme }}>
      <Tabs.Group
        aria-label="Default tabs"
        style="default"
      >
        <Tabs.Item
          active={activeTab === ""}
          icon={TbUserPlus}
          title="Authors Management"
        >
          {createAuthorComponent}
        </Tabs.Item>
        <Tabs.Item
          active={activeTab === "tag"}
          icon={IoMdPricetags}
          title="Tags Management"
        >
          {createTagComponent}
        </Tabs.Item>
        <Tabs.Item
          active={activeTab === "topic"}
          icon={MdOutlineTopic}
          title="Topics Management"
        >
          {createTopicComponent}
        </Tabs.Item>
        <Tabs.Item
          active={activeTab === "topictranslation"}
          icon={HiTranslate}
          title="Topics Translation Management"
        >
          {createTopicTranslationComponent}
        </Tabs.Item>
        <Tabs.Item
          active={activeTab === "createpost"}
          icon={MdOutlinePostAdd}
          title="Posts Management"
        >
          {createPostComponent}
        </Tabs.Item>
        <Tabs.Item
          active={activeTab === "revalidate"}
          icon={MdOutlinePostAdd}
          title="Revalidation Management"
        >
          {revalidateTagsComponent}
        </Tabs.Item>
        <Tabs.Item
          active={activeTab === "projects"}
          icon={GrProjects}
          title="Projects Management"
        >
          {createProjectComponent}
        </Tabs.Item>
      </Tabs.Group>
    </Flowbite>
  );
}

interface Props {
  createAuthorComponent: React.ReactNode;
  createTagComponent: React.ReactNode;
  createTopicComponent: React.ReactNode;
  createTopicTranslationComponent: React.ReactNode;
  createPostComponent: React.ReactNode;
  revalidateTagsComponent: React.ReactNode;
  createProjectComponent: React.ReactNode;
}

const tabsCustomTheme: CustomFlowbiteTheme = {
  tab: {
    base: "flex flex-col gap-2",
    tablist: {
      base: "flex text-center",
      styles: {
        "default": "flex-wrap border-b border-gray-200 dark:border-gray-700",
        "underline":
          "flex-wrap -mb-px border-b border-gray-200 dark:border-gray-700",
        "pills":
          "flex-wrap font-medium text-sm text-white dark:text-gray-400 space-x-2",
        "fullWidth":
          "w-full text-sm font-medium divide-x divide-gray-200 shadow grid grid-flow-col dark:divide-gray-700 dark:text-gray-400 rounded-none",
      },
      tabitem: {
        "base":
          "flex items-center justify-center p-4 rounded-t-lg text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500",
        "styles": {
          "default": {
            "base": "rounded-t-lg",
            "active": {
              "on":
                "backdrop-blur-3xl bg-black/30 text-cyan-200 dark:bg-gray-800 dark:text-cyan-500",
              "off":
                "text-white hover:bg-gray-50 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800  dark:hover:text-gray-300",
            },
          },
          "underline": {
            "base": "rounded-t-lg",
            "active": {
              "on":
                "text-cyan-200 rounded-t-lg border-b-2 border-cyan-600 active dark:text-cyan-500 dark:border-cyan-500",
              "off":
                "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
            },
          },
          "pills": {
            "base": "",
            "active": {
              "on": "rounded-lg bg-cyan-600 text-white",
              "off":
                "rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white",
            },
          },
          "fullWidth": {
            "base": "ml-0 first:ml-0 w-full rounded-none flex",
            "active": {
              "on":
                "p-4 text-gray-900 bg-gray-100 active dark:bg-gray-700 dark:text-white rounded-none",
              "off":
                "bg-white hover:text-gray-700 hover:bg-gray-50 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 rounded-none",
            },
          },
        },
        "icon": "mr-2 h-5 w-5",
      },
    },
    tabpanel: "py-3",
  },
};
