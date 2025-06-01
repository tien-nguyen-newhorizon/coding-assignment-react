const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center">
        <p className="text-2xl mt-4 text-gray-800">Something went wrong</p>
        <a
          href="/"
          className="inline-block mt-6 px-6 py-2 bg-sky-600/75 text-white rounded-md hover:bg-sky-700/75 transition"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
