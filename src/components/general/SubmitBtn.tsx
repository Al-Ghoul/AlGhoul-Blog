"use client";
import { useFormStatus } from "react-dom";

const SubmitBtn = () => {
  const status = useFormStatus();
  return (
    <button
      type="submit"
      disabled={status.pending}
      className="h-8 w-24 bg-blue-500 text-white rounded-2xl mt-2 mx-auto disabled:bg-slate-900"
    >
      Submit
    </button>
  );
};

export default SubmitBtn;
