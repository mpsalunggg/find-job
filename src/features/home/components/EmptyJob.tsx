import Image from "next/image";

export const EmptyJob = () => {
  return (
    <div className="flex flex-col items-center justify-center px-2 py-16">
      <div className="mb-8 w-full max-w-md">
        <Image
          src="/illustration/artwork.svg"
          alt="No job openings"
          width={300}
          height={300}
          className="mx-auto w-[306px]"
        />
      </div>

      <h2 className="mb-2 text-center text-xl font-bold text-neutral-900">
        No job openings available
      </h2>

      <p className="mb-6 text-center text-sm text-neutral-600">
        Please wait for the next batch of openings.
      </p>
    </div>
  );
};
