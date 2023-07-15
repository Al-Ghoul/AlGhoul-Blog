"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import { FailureAlert, SuccessAlert } from '@/components/general/Alerts';
import useSWR from "swr";
import { fetcher } from "@/helpers";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import { notFound } from "next/navigation";
import { AuthorDataType } from "@/helpers/db";
import { editAuthor } from "@/helpers/actions";


const EditAuthorPage = ({ params }: PageProps) => {
    const { data, error, isLoading } = useSWR<AuthorDataType>(`/api/dashboard/author/${params.id}`, fetcher);
    let [isPending, startTransition] = useTransition();
    const authorInputRef = useRef<HTMLInputElement>(null);
    const profileURLInputRef = useRef<HTMLInputElement>(null);
    const bioInputRef = useRef<HTMLTextAreaElement>(null);
    const languageInputRef = useRef<HTMLSelectElement>(null);
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
            <div className="flex-col min-w-full mx-auto lg:mb-16 mb-8 backdrop-blur-3xl bg-black/25 rounded-xl p-3">

                {
                    isError &&
                    <FailureAlert content="Failed to edit this author's info, please check your input." />
                }

                {
                    isSuccess &&
                    <SuccessAlert content="Author was edited successfully." />
                }

                <form className="flex flex-col mx-auto max-w-screen-sm text-black"
                    onSubmit={(e) => {
                        e.preventDefault();
                        startTransition(() => editAuthor({
                            name: authorInputRef.current?.value!,
                            profileImageURL: profileURLInputRef.current?.value!,
                            bio: bioInputRef.current?.value!,
                            languageId: parseInt(languageInputRef.current?.value!),
                        }, parseInt(params.id))
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
                    <label htmlFor="author" className="text-white">Enter Author Name: </label>
                    <input ref={authorInputRef} className="h-6 rounded-lg bg-blue-200" name="author" type="text" required defaultValue={data.author?.name} />
                    <label htmlFor="profImgURL" className="text-white">Enter Profile Image URL: </label>
                    <input ref={profileURLInputRef} defaultValue={data.author?.profileImageURL} className="h-6 rounded-lg bg-blue-200" name="profImgURL" type="text" required />
                    <label htmlFor="bio" className="text-white">Enter bio: </label>
                    <textarea ref={bioInputRef} className="rounded-lg bg-blue-200" name="bio" required defaultValue={data.author?.bio} />
                    <label htmlFor="langId" className="text-white">Select a language: </label>
                    <select ref={languageInputRef} className="text-black rounded-lg bg-blue-200" name="langId" defaultValue={data.author?.languageId}>
                        {data.languages.map(language => <option key={language.id} value={language.id}>{language.name}</option>)}
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
        id: string,
    }
}

export default EditAuthorPage;