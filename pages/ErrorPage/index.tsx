// pages/ErrorPage.js
import { useRouter } from "next/router";
import Link from "next/link";

const ErrorPage = () => {
  const router = useRouter();
  const { error } = router.query;

  // Ensure 'error' is a string before decoding
  const errorMessage = Array.isArray(error) ? error[0] : error;
  const decodedMessage = errorMessage ? decodeURIComponent(errorMessage) : null;

  return (
    <div className="flex items-center justify-center h-screen">
      <div className=" p-8 rounded shadow-md max-w-md w-full bg-slate-300">
        {decodedMessage && (
          <p className="text-slate-800 mb-4">{decodedMessage}</p>
        )}
        <div className="flex justify-end">
          <button
            type="button"
            className="px-2 py-2 bg-purple-400 text-white rounded-lg "
            onClick={() => router.back()}
          >
            Click here to go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
