"use client";
import { useEffect, useState, useTransition } from "react";
import { FailureAlert, SuccessAlert } from "../general/Alerts";
import { revalidateTagAction } from "@/helpers/actions";


const RevalidateTag = () => {
  let [isPending, startTransition] = useTransition()
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [validatedTag, setValidatedTag] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSuccess(false)
      setValidatedTag("");
    }, 10 * 1000);

    return () => clearTimeout(timer);
  }, [isSuccess]);


  return (
    <>
      {
        isError &&
        <FailureAlert content={`${validatedTag} could not be validated.`} />
      }

      {
        isSuccess &&
        <SuccessAlert content={`${validatedTag} was validated successfully`} />
      }
      <div className="flex flex-wrap justify-center gap-2">
        <button className="bg-blue-500 rounded-full p-2 disabled:bg-black text-white" disabled={isPending} onClick={() => startTransition(() => revalidateTagAction("postsData").then(() => {
          setIsError(false);
          setIsSuccess(true);
        })
          .catch(() => {
            setIsSuccess(false);
            setIsError(true);
          }))}>Revalidate Posts</button>

        <button className="bg-blue-500 rounded-full p-2 disabled:bg-black text-white" disabled={isPending} onClick={() => startTransition(() => revalidateTagAction("authorsPosts").then(() => {
          setIsError(false);
          setIsSuccess(true);
        })
          .catch(() => {
            setIsSuccess(false);
            setIsError(true);
          }))}>Revalidate Authors Posts</button>
        <button className="bg-blue-500 rounded-full p-2 disabled:bg-black text-white" disabled={isPending} onClick={() => startTransition(() => revalidateTagAction("tagsPosts").then(() => {
          setIsError(false);
          setIsSuccess(true);
        })
          .catch(() => {
            setIsSuccess(false);
            setIsError(true);
          }))}>Revalidate Tags Posts</button>
        <button className="bg-blue-500 rounded-full p-2 disabled:bg-black text-white" disabled={isPending} onClick={() => startTransition(() => revalidateTagAction("topicsPosts").then(() => {
          setIsError(false);
          setIsSuccess(true);
        })
          .catch(() => {
            setIsSuccess(false);
            setIsError(true);
          }))}>Revalidate Topics Posts</button>

        <button className="bg-blue-500 rounded-full p-2 disabled:bg-black text-white" disabled={isPending} onClick={() => startTransition(() => revalidateTagAction("authors").then(() => {
          setIsError(false);
          setIsSuccess(true);
        })
          .catch(() => {
            setIsSuccess(false);
            setIsError(true);
          }))}>Revalidate Authors</button>
        <button className="bg-blue-500 rounded-full p-2 disabled:bg-black text-white" disabled={isPending} onClick={() => startTransition(() => revalidateTagAction("tags").then(() => {
          setIsError(false);
          setIsSuccess(true);
        })
          .catch(() => {
            setIsSuccess(false);
            setIsError(true);
          }))}>Revalidate Tags</button>
        <button className="bg-blue-500 rounded-full p-2 disabled:bg-black text-white" disabled={isPending} onClick={() => startTransition(() => revalidateTagAction("topics").then(() => {
          setIsError(false);
          setIsSuccess(true);
        })
          .catch(() => {
            setIsSuccess(false);
            setIsError(true);
          }))}>Revalidate Topics Translations</button>
        <button className="bg-blue-500 rounded-full p-2 disabled:bg-black text-white" disabled={isPending} onClick={() => startTransition(() => revalidateTagAction("maintopics").then(() => {
          setIsError(false);
          setIsSuccess(true);
        })
          .catch(() => {
            setIsSuccess(false);
            setIsError(true);
          }))}>Revalidate Main Topics</button>
        <button className="bg-blue-500 rounded-full p-2 disabled:bg-black text-white" disabled={isPending} onClick={() => startTransition(() => revalidateTagAction("languages").then(() => {
          setIsError(false);
          setIsSuccess(true);
        })
          .catch(() => {
            setIsSuccess(false);
            setIsError(true);
          }))}>Revalidate Languages</button>
      </div>
    </>
  );
}

export default RevalidateTag;

