"use client";
import { FailureAlert, SuccessAlert } from "../general/Alerts";
import { addProject } from "@/helpers/actions";
import SubmitBtn from "../general/SubmitBtn";
import { useFormState } from "react-dom";

const initialState = {
  message: "",
  success: false,
};

const CreateProject = ({ languages, tags }: Props) => {
  const [createProjectState, createProjectAction] = useFormState(
    addProject,
    initialState,
  );

  return (
    <>
      {(!createProjectState.success && createProjectState.message.length)
        ? <FailureAlert content={createProjectState.message} />
        : null}

      {createProjectState.success
        ? <SuccessAlert content={createProjectState.message} />
        : null}

      <form
        action={createProjectAction}
        className="flex flex-col mx-auto max-w-screen-sm text-black"
      >
        <label htmlFor="title" className="text-white">
          Enter Project Title:
        </label>
        <input
          className="h-6 rounded-lg bg-blue-200"
          name="title"
          type="text"
          required
        />
        <label htmlFor="description" className="text-white">
          Enter description:
        </label>
        <textarea
          className="rounded-lg bg-blue-200"
          name="description"
          required
        />
        <label htmlFor="projectURL" className="text-white">
          Enter Project URL:
        </label>
        <input
          name="projectURL"
          type="text"
          className="rounded-lg bg-blue-200"
          required
        />
        <label htmlFor="img" className="text-white">
          Upload Project Cover Image:
        </label>
        <input
          name="img"
          type="file"
          className="rounded-lg bg-blue-200"
          required
          accept="image/png, image/jpeg"
        />
        <label htmlFor="langId" className="text-white">
          Select a language:
        </label>
        <select className="text-black rounded-lg bg-blue-200" name="langId">
          {languages.map((language) => (
            <option key={language.id} value={language.id}>
              {language.name}
            </option>
          ))}
        </select>
        <label htmlFor="tagId" className="text-white">Select a tag:</label>
        <select className="text-black rounded-lg bg-blue-200" name="tagId">
          {tags.map((tag) => (
            <option key={tag.id} value={tag.id}>{tag.name}</option>
          ))}
        </select>
        <SubmitBtn />
      </form>
    </>
  );
};

interface Props {
  languages: LanguageType;
  tags: TagType;
}

export default CreateProject;
