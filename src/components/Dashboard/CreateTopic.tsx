"use client";
import { useRef, useState, useTransition } from "react";

import { FailureAlert, SuccessAlert } from "../general/Alerts";
import { createTopic } from "@/helpers/actions";

const CreateTopic = () => {
    const topicInputRef = useRef<HTMLInputElement>(null);
    let [isPending, startTransition] = useTransition();
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    return (
        <>
            {
                isError &&
                <FailureAlert content="This Topic either already exists or your input is not correct." />
            }

            {
                isSuccess &&
                <SuccessAlert content="Topic was added successfully." />
            }
            <form className="flex flex-col mx-auto max-w-screen-sm text-black"
                onSubmit={(e) => {
                    e.preventDefault();
                    startTransition(() => createTopic({
                        tag: topicInputRef.current?.value!
                    })
                        .then(() => {
                            setIsError(false);
                            setIsSuccess(true);
                            topicInputRef.current!.value = "";
                        })
                        .catch(() => {
                            setIsSuccess(false);
                            setIsError(true);
                        })
                    );
                }}>
                <label htmlFor="topicName" className="text-white">Enter Topic Name: </label>
                <input ref={topicInputRef} className="h-6 rounded-lg bg-blue-200" name="topicName" type="text" required />
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



export default CreateTopic;