import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const SuccessApplyPage = () => {
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center gap-4">
      <Image
        src="/illustration/success.svg"
        alt="success-apply"
        width={100}
        height={100}
        className="h-auto w-full sm:w-[100px] lg:w-[214px]"
      />
      <p className="text-2xl font-bold text-neutral-900">
        🎉 Your application was sent!
      </p>
      <p className="w-full text-center text-lg text-neutral-900 lg:w-[650px]">
        Congratulations! You&apos;ve taken the first step towards a rewarding
        career. We look forward to learning more about you during the
        application&apos;s process.
      </p>
      <Link href="/">
        <Button variant="primary-solid">Lihat Job lainnya</Button>
      </Link>
    </section>
  );
};

export default SuccessApplyPage;
