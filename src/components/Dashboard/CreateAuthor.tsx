"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import { createAuthor } from "@/helpers/actions";
import { FailureAlert, SuccessAlert } from "../general/Alerts";

const CreateAuthor = (
  { languages, currentUserId, currentUserProfileImage }: Props,
) => {
  const [isPending, startTransition] = useTransition();
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

  return (
    <>
      {isError &&
        (
          <FailureAlert content="This Author either already exists or your input is not correct." />
        )}

      {isSuccess &&
        <SuccessAlert content="Author was added successfully." />}

      <form
        className="flex flex-col mx-auto max-w-screen-sm text-black"
        onSubmit={(e) => {
          e.preventDefault();
          startTransition(() =>
            createAuthor({
              name: authorInputRef.current?.value!,
              profileImageURL: profileURLInputRef.current?.value!,
              bio: bioInputRef.current?.value!,
              languageId: parseInt(languageInputRef.current?.value!),
            }, currentUserId)
              .then(() => {
                setIsError(false);
                setIsSuccess(true);
                authorInputRef.current!.value = "";
                bioInputRef.current!.value = "";
              })
              .catch(() => {
                setIsSuccess(false);
                setIsError(true);
              })
          );
        }}
      >
        <label htmlFor="author" className="text-white">
          Enter Author Name:
        </label>
        <input
          ref={authorInputRef}
          className="h-6 rounded-lg bg-blue-200"
          name="author"
          type="text"
          required
        />
        <label htmlFor="profImgURL" className="text-white">
          Enter Profile Image URL:
        </label>
        <input
          ref={profileURLInputRef}
          defaultValue={currentUserProfileImage}
          className="h-6 rounded-lg bg-blue-200"
          name="profImgURL"
          type="text"
          required
        />
        <label htmlFor="bio" className="text-white">Enter bio:</label>
        <textarea
          ref={bioInputRef}
          className="rounded-lg bg-blue-200"
          name="bio"
          required
        />
        <label htmlFor="langId" className="text-white">
          Select a language:
        </label>
        <select
          ref={languageInputRef}
          className="text-black rounded-lg bg-blue-200"
          name="langId"
        >
          {languages.map((language) => (
            <option key={language.id} value={language.id}>
              {language.name}
            </option>
          ))}
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
};

interface Props {
  languages: LanguageType;
  currentUserId: string;
  currentUserProfileImage: string;
}

export default CreateAuthor;
