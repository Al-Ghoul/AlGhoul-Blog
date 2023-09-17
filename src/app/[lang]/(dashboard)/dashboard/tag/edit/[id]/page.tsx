"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import { FailureAlert, SuccessAlert } from '@/components/general/Alerts';
import useSWR from "swr";
import { fetcher } from "@/helpers";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import { notFound } from "next/navigation";
import { editTag } from "@/helpers/actions";


const EditTagPage = ({ params }: PageProps) => {
  const { data: tagData, error, isLoading } = useSWR<{ tag: TagType[0] }>(`/api/tags/${params.id}`, fetcher);
  const { data: languagesData } = useSWR<{ languages: LanguageType }>("/api/languages", fetcher);
  const tagInputRef = useRef<HTMLInputElement>(null);
  const iconInputRef = useRef<HTMLInputElement>(null);
  const languageInputRef = useRef<HTMLSelectElement>(null);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  let [isPending, startTransition] = useTransition()

  useEffect(() => {
    const timer = setTimeout(() => setIsSuccess(false), 10 * 1000);

    return () => clearTimeout(timer);
  }, [isSuccess]);


  if (isLoading) return <LoadingSpinner />
  console.log(tagData, languagesData);
  if (error || !tagData || !languagesData) notFound();

  return (
    <main className="flex min-h-screen p-1 md:p-24 md:px-48">
      <div className="flex-col min-w-full mx-auto lg:mb-16 mb-8 backdrop-blur-3xl bg-blue-800/70 rounded-xl p-3">

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
            startTransition(() => editTag({
              name: tagInputRef.current?.value!,
              icon: iconInputRef.current?.value!,
              languageId: parseInt(languageInputRef.current?.value!),
            }, tagData?.tag.id!)
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
          <label htmlFor="tagName" className="text-white">Enter Tag Name: </label>
          <input ref={tagInputRef} className="h-6 rounded-lg bg-blue-200" name="tagName" type="text" required defaultValue={tagData?.tag.name} />
          <label htmlFor="icon" className="text-white">Enter Icon SVG path: </label>
          <input ref={iconInputRef} className="h-6 rounded-lg bg-blue-200" name="icon" type="text" required defaultValue={tagData?.tag.icon} />
          <label htmlFor="langId" className="text-white">Select a language: </label>
          <select ref={languageInputRef} className="text-black rounded-lg bg-blue-200" name="langId" defaultValue={tagData?.tag.languageId} >
            {languagesData?.languages.map(language => <option key={language.id} value={language.id}>{language.name}</option>)}
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

export default EditTagPage;