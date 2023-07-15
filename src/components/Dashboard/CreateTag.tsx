'use client';
import { createTag } from "@/helpers/actions";
import type { Languages } from "@/helpers/db";
import { useEffect, useRef, useState, useTransition } from "react";
import { FailureAlert, SuccessAlert } from "../general/Alerts";

const CreateTag = ({ languages }: Props) => {
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

    return (
        <>
            {
                isError &&
                <FailureAlert content="This Tag either already exists or your input is not correct." />
            }

            {
                isSuccess &&
                <SuccessAlert content="Tag was added successfully." />
            }
            <form className="flex flex-col mx-auto max-w-screen-sm text-black"
                onSubmit={(e) => {
                    e.preventDefault();
                    startTransition(() => createTag({
                        name: tagInputRef.current?.value!,
                        icon: iconInputRef.current?.value!,
                        languageId: parseInt(languageInputRef.current?.value!),
                    })
                        .then(() => {
                            setIsError(false);
                            setIsSuccess(true);
                            tagInputRef.current!.value = "";
                        })
                        .catch(() => {
                            setIsSuccess(false);
                            setIsError(true);
                        })
                    );
                }}>
                <label htmlFor="tagName" className="text-white">Enter Tag Name: </label>
                <input ref={tagInputRef} className="h-6 rounded-lg bg-blue-200" name="tagName" type="text" required />
                <label htmlFor="icon" className="text-white">Enter Icon SVG path: </label>
                <input ref={iconInputRef} className="h-6 rounded-lg bg-blue-200" name="icon" type="text" required />
                <label htmlFor="langId" className="text-white">Select a language: </label>
                <select ref={languageInputRef} className="text-black rounded-lg bg-blue-200" name="langId">
                    {languages.map(language => <option key={language.id} value={language.id}>{language.name}</option>)}
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
}

export default CreateTag;