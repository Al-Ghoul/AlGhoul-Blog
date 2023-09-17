"use client";
import useSWR from 'swr';
import { useEffect, useRef, useState, useTransition } from "react";
import LoadingSpinner from '@/components/general/LoadingSpinner';
import { notFound } from 'next/navigation';
import { FailureAlert, SuccessAlert } from '@/components/general/Alerts';
import { fetcher } from '@/helpers';
import { editTopicTranslation } from '@/helpers/actions';


const EditTopicTranslationPage = ({ params }: PageProps) => {
  const { data, error, isLoading } = useSWR<{ topicTranslation: TopicWithLanguage }>(`/api/topics/${params.topicId}?langId=${params.langId}&include=language`, fetcher);
  const { data: mainTopicsData, } = useSWR<{ topics: MainTopicsType }>("/api/maintopics", fetcher);
  let [isPending, startTransition] = useTransition();
  const topicTranslationInputRef = useRef<HTMLInputElement>(null);
  const topicInputRef = useRef<HTMLSelectElement>(null);

  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);


  useEffect(() => {
    const timer = setTimeout(() => setIsSuccess(false), 10 * 1000);

    return () => clearTimeout(timer);
  }, [isSuccess]);

  if (isLoading) return <LoadingSpinner />
  if (error || !data) notFound();

  return (
    <main className="flex min-h-screen p-1 md:p-24 md:px-48">
      <div className="flex-col min-w-full mx-auto lg:mb-16 mb-8 backdrop-blur-3xl bg-blue-800/70 rounded-xl p-3">
        {
          isError &&
          <FailureAlert content="Failed to edit this post, please check your input." />
        }

        {
          isSuccess &&
          <SuccessAlert content="Post was edited successfully." />
        }
        <form className="flex flex-col mx-auto max-w-screen-sm text-black"
          onSubmit={(e) => {
            e.preventDefault();
            startTransition(() => editTopicTranslation(
              topicTranslationInputRef.current?.value!,
              data?.topicTranslation.topicId,
              data?.topicTranslation.languageId)
              .then(() => {
                setIsError(false);
                setIsSuccess(true);
              })
              .catch(() => {
                setIsSuccess(false);
                setIsError(true);
              })
            );
          }}>
          <label htmlFor="topicTranslation" className="text-white">Enter Topic Translation: </label>
          <div className='text-white'>
            <input ref={topicTranslationInputRef} className="h-6 rounded-lg bg-blue-200 text-black" name="topicTranslation" type="text" required defaultValue={data?.topicTranslation.translation} />
            ({data?.topicTranslation.language.name})
          </div>
          <label htmlFor="topicId" className="text-white">Select a Topic: </label>
          <select ref={topicInputRef} className="text-black rounded-lg bg-blue-200" name="topicId" defaultValue={data.topicTranslation.topicId}>
            {mainTopicsData?.topics.map(topic => <option key={topic.id} value={topic.id}>{topic.tag}</option>)}
          </select>
          <input
            disabled={isPending}
            className="h-8 w-24 bg-blue-500 text-white rounded-2xl mt-2 mx-auto disabled:bg-slate-900"
            type="submit"
            value="Edit!"
          />
        </form>
      </div>
    </main>
  );
}


interface PageProps {
  params: {
    topicId: string,
    langId: string,
  }
}

export default EditTopicTranslationPage;