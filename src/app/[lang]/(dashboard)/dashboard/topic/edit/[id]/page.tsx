"use client";
import useSWR from 'swr';
import { useEffect, useRef, useState, useTransition } from "react";
import LoadingSpinner from '@/components/general/LoadingSpinner';
import { notFound } from 'next/navigation';
import { FailureAlert, SuccessAlert } from '@/components/general/Alerts';
import { fetcher } from '@/helpers';
import type { MainTopics } from '@/helpers/db';
import { editTopic } from '@/helpers/actions';


const EditTopicPage = ({ params }: PageProps) => {
    const { data, error, isLoading } = useSWR<MainTopics[0]>(`/api/dashboard/topic/${params.id}`, fetcher);
    const topicInputRef = useRef<HTMLInputElement>(null);
    let [isPending, startTransition] = useTransition();
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
                        startTransition(() => editTopic({
                            tag: topicInputRef.current?.value!
                        }, data.id)
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
                    <label htmlFor="topicName" className="text-white">Enter Topic Name: </label>
                    <input ref={topicInputRef} defaultValue={data.tag} className="h-6 rounded-lg bg-blue-200" name="topicName" type="text" required />
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
        id: string
    }
}

export default EditTopicPage;