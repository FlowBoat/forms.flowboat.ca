import Link from "next/link";

const NotFound = () => {
  return (
    <div className="max-w-[35rem] p-16">
      <h1 className="font-bold text-2xl">Page not found</h1>
      <p className="text-gray-500">
        The page you are looking for is not available. Please contact us if you
        think this is an error.{" "}
        <Link href="/" className="font-bold underline">
          Go back to the home page.
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
