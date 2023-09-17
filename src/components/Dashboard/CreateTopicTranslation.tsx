"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import { FailureAlert, SuccessAlert } from "../general/Alerts";
import { createTopicTranslation } from "@/helpers/actions";

const CreateTopicTranslation = ({ languages, topics }: Props) => {
  let [isPending, startTransition] = useTransition();
  const topicTranslationInputRef = useRef<HTMLInputElement>(null);
  const languageInputRef = useRef<HTMLSelectElement>(null);
  const topicInputRef = useRef<HTMLSelectElement>(null);

  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsSuccess(false), 10 * 1000);

    return () => clearTimeout(timer);
  }, [isSuccess]);

  return (
    <>
      {
        isError &&
        <FailureAlert content="This Topic Translation either already exists or your input is not correct." />
      }

      {
        isSuccess &&
        <SuccessAlert content="Topic Translation was added successfully." />
      }

      <form className="flex flex-col mx-auto max-w-screen-sm text-black"
        onSubmit={(e) => {
          e.preventDefault();
          startTransition(() => createTopicTranslation({
            translation: topicTranslationInputRef.current?.value!,
            languageId: parseInt(languageInputRef.current?.value!),
            topicId: parseInt(topicInputRef.current?.value!)
          })
            .then(() => {
              setIsError(false);
              setIsSuccess(true);
              topicTranslationInputRef.current!.value = "";
            })
            .catch(() => {
              setIsSuccess(false);
              setIsError(true);
            })
          );
        }}>
        <label htmlFor="topicTranslation" className="text-white">Enter Topic Translation: </label>
        <input ref={topicTranslationInputRef} className="h-6 rounded-lg bg-blue-200" name="topicTranslation" type="text" required />
        <label htmlFor="langId" className="text-white">Select a language: </label>
        <select ref={languageInputRef} className="text-black rounded-lg bg-blue-200" name="langId">
          {languages.map(language => <option key={language.id} value={language.id}>{language.name}</option>)}
        </select>
        <label htmlFor="topicId" className="text-white">Select a Topic: </label>
        <select ref={topicInputRef} className="text-black rounded-lg bg-blue-200" name="topicId">
          {topics.map(topic => <option key={topic.id} value={topic.id}>{topic.tag}</option>)}
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
  languages: LanguageType,
  topics: MainTopicsType
}

export default CreateTopicTranslation;