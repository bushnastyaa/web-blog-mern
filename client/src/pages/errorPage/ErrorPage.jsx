const ErrorPage = () => {
  return (
    <div className="h-[80vh] flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-2xl mb-2">
          Page not found
        </h1>
        <p className="text-gray-500 text-lg">
          You can go<a href="/" className="underline"> to the main page</a>
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
