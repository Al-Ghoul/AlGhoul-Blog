"use client";
import useSWR from 'swr';
import { useEffect, useRef, useState, useTransition } from "react";
import type { PostWithFullDataType, } from "@/helpers/db";
import LoadingSpinner from '@/components/general/LoadingSpinner';
import { notFound } from 'next/navigation';
import { editPost } from '@/helpers/actions';
import { FailureAlert, SuccessAlert } from '@/components/general/Alerts';
import { fetcher } from '@/helpers';


const EditPostPage = ({ params }: PageProps) => {
    const { data, error, isLoading } = useSWR<PostWithFullDataType>(`/api/dashboard/post/${params.id}`, fetcher);
    let [isPending, startTransition] = useTransition();
    const titleInputRef = useRef<HTMLInputElement>(null);
    const contentInputRef = useRef<HTMLTextAreaElement>(null);
    const isPublishedInputRef = useRef<HTMLInputElement>(null);

    const languageInputRef = useRef<HTMLSelectElement>(null);
    const topicInputRef = useRef<HTMLSelectElement>(null);
    const authorInputRef = useRef<HTMLSelectElement>(null);

    const [tagsToConnect, setTagsToConnect] = useState<Array<number>>([]);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    useEffect(() => {
        setTagsToConnect(data?.post.tags.map(tag => tag.id) || []);
    }, [data?.post.tags]);

    useEffect(() => {
        const timer = setTimeout(() => setIsSuccess(false), 10 * 1000);

        return () => clearTimeout(timer);
    }, [isSuccess]);

    if (isLoading) return <LoadingSpinner />
    if (error || !data) notFound();


    return (
        <main className="flex min-h-screen p-1 md:p-24 md:px-48">
            <div className="flex-col min-w-full mx-auto lg:mb-16 mb-8 backdrop-blur-3xl bg-black/25 rounded-xl p-3">
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
                        startTransition(() => editPost({
                            title: titleInputRef.current?.value!,
                            content: contentInputRef.current?.value!,
                            languageId: parseInt(languageInputRef.current?.value!),
                            topicId: parseInt(topicInputRef.current?.value!),
                            authorId: parseInt(authorInputRef.current?.value!),
                            published: contentInputRef.current?.value.length !== 0,
                        }, tagsToConnect, data.post.id)
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
                    <label htmlFor="title" className="text-white">Enter Post Title: </label>
                    <input ref={titleInputRef} className="h-6 rounded-lg bg-blue-200" name="title" type="text" required defaultValue={data.post.title} />
                    <label htmlFor="content" className="text-white">Enter Post Content: </label>
                    <textarea ref={contentInputRef} className="rounded-lg bg-blue-200" name="content" required defaultValue={data.post.content} />
                    <div>
                        <label htmlFor="publish" className="text-white">Publish Post?: </label>
                        <input type="checkbox" ref={isPublishedInputRef} className="rounded-lg bg-blue-200" name="publish" defaultChecked={data.post.published} />
                    </div>

                    <label htmlFor="tags" className="text-white">Tags: </label>

                    <ul className="flex gap-2">
                        {
                            data?.tags.map(tag =>
                                <li key={tag.id}> <input
                                    onClick={() => {
                                        if (tagsToConnect.includes(tag.id))
                                            setTagsToConnect(tagsToConnect.filter(tagId => tagId !== tag.id));
                                        else
                                            setTagsToConnect(prevList => [...prevList, tag.id])
                                    }}
                                    className="rounded-lg bg-blue-200"
                                    type="checkbox"
                                    value={tag.id}
                                    name={tag.name}
                                    defaultChecked={data?.post?.tags.map(currentTag => currentTag.id).includes(tag.id)}
                                />
                                    <p className="mx-1">
                                        {tag.name}
                                    </p>
                                </li>
                            )
                        }
                    </ul>
                    <label htmlFor="langId" className="text-white">Select a language: </label>
                    <select ref={languageInputRef} className="text-black rounded-lg bg-blue-200" name="langId" defaultValue={data.post.languageId}>
                        {data?.languages.map(language => <option key={language.id} value={language.id}>{language.name}</option>)}
                    </select>
                    <label htmlFor="topicId" className="text-white">Select a Topic: </label>
                    <select ref={topicInputRef} className="text-black rounded-lg bg-blue-200" name="topicId" defaultValue={data.post.topicId}>
                        {data?.topics.map(topic => <option key={topic.id} value={topic.id}>{topic.tag}</option>)}
                    </select>
                    <label htmlFor="authorId" className="text-white">Select an Author: </label>
                    <select ref={authorInputRef} className="text-black rounded-lg bg-blue-200" name="topicId" defaultValue={data.post.authorId}>
                        {data?.authors.map(author => <option key={author.id} value={author.id}>{author.name} : {author.language.name}</option>)}
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
        id: string
    }
}

export default EditPostPage;