"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import { FailureAlert, SuccessAlert } from "../general/Alerts";
import { createPost } from "@/helpers/actions";
import type { AuthorsWithLangs, Languages, MainTopics, TagsType } from "@/helpers/db";


const CreatePost = ({ languages, topics, authors, tags }: Props) => {
    let [isPending, startTransition] = useTransition();
    const titleInputRef = useRef<HTMLInputElement>(null);
    const contentInputRef = useRef<HTMLTextAreaElement>(null);
    const descriptionInputRef = useRef<HTMLInputElement>(null);
    const isPublishedInputRef = useRef<HTMLInputElement>(null);

    const languageInputRef = useRef<HTMLSelectElement>(null);
    const topicInputRef = useRef<HTMLSelectElement>(null);
    const authorInputRef = useRef<HTMLSelectElement>(null);

    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [tagsToConnect, setTagsToConnect] = useState<Array<number>>([]);

    useEffect(() => {
        const timer = setTimeout(() => setIsSuccess(false), 10 * 1000);

        return () => clearTimeout(timer);
    }, [isSuccess]);

    return (
        <>
            {
                isError &&
                <FailureAlert content="This Post either already exists or your input is not correct." />
            }

            {
                isSuccess &&
                <SuccessAlert content="Post was added successfully." />
            }

            <form className="flex flex-col mx-auto max-w-screen-sm text-black"
                onSubmit={(e) => {
                    e.preventDefault();
                    startTransition(() => createPost({
                        title: titleInputRef.current?.value!,
                        content: contentInputRef.current?.value!,
                        description: descriptionInputRef.current?.value!,
                        languageId: parseInt(languageInputRef.current?.value!),
                        topicId: parseInt(topicInputRef.current?.value!),
                        authorId: parseInt(authorInputRef.current?.value!),
                        published: contentInputRef.current?.value.length !== 0
                    }, tagsToConnect)
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
                <input ref={titleInputRef} className="h-6 rounded-lg bg-blue-200" name="title" type="text" required />
                <label htmlFor="description" className="text-white">Enter Post Description: </label>
                <input ref={descriptionInputRef} className="h-6 rounded-lg bg-blue-200" name="description" type="text" required />
                <label htmlFor="content" className="text-white">Enter Post Content: </label>
                <textarea ref={contentInputRef} className="rounded-lg bg-blue-200" name="content" required />
                <div>
                    <label htmlFor="publish" className="text-white">Publish Post?: </label>
                    <input type="checkbox" ref={isPublishedInputRef} className="rounded-lg bg-blue-200" name="publish" />
                </div>

                <label htmlFor="tags" className="text-white">Tags: </label>

                <ul className="flex gap-2">
                    {
                        tags.map(tag =>
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
                                name={tag.name} />
                                <p className="mx-1">
                                    {tag.name} ({tag.language.name})
                                </p>
                            </li>
                        )
                    }
                </ul>
                <label htmlFor="langId" className="text-white">Select a language: </label>
                <select ref={languageInputRef} className="text-black rounded-lg bg-blue-200" name="langId">
                    {languages.map(language => <option key={language.id} value={language.id}>{language.name}</option>)}
                </select>
                <label htmlFor="topicId" className="text-white">Select a Topic: </label>
                <select ref={topicInputRef} className="text-black rounded-lg bg-blue-200" name="topicId">
                    {topics.map(topic => <option key={topic.id} value={topic.id}>{topic.tag}</option>)}
                </select>
                <label htmlFor="authorId" className="text-white">Select an Author: </label>
                <select ref={authorInputRef} className="text-black rounded-lg bg-blue-200" name="topicId">
                    {authors.map(author => <option key={author.id} value={author.id}>{author.name} : {author.language.name}</option>)}
                </select>
                <input
                    disabled={isPending}
                    className="h-8 w-24 bg-blue-500 text-white rounded-2xl mt-2 mx-auto disabled:bg-slate-900"
                    type="submit"
                    value="Create!"
                />
            </form>
        </>
    );
}

interface Props {
    languages: Languages,
    topics: MainTopics,
    authors: AuthorsWithLangs,
    tags: TagsType
}

export default CreatePost;
