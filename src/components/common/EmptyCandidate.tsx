import Image from "next/image";

export const EmptyCandidate = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-32">
      <Image
        src="/illustration/empty-candidate.svg"
        alt="No candidate"
        width={300}
        height={300}
      />
      <h2 className="mb-2 text-center text-xl font-bold text-neutral-900">
        No candidate found
      </h2>
      <p className="mb-6 text-center text-sm text-neutral-600">
        Share your job vacancies so that more candidates will apply.
      </p>
    </section>
  );
};
