import { Card } from "@/components/ui/card";

const HomePage = () => {
  return (
    <section className="grid h-[calc(100vh-(--spacing(36)))] grid-cols-12 gap-6">
      <div className="col-span-4">
        <Card>Card job</Card>
      </div>

      <Card className="col-span-8">Card Detail</Card>
    </section>
  );
};
export default HomePage;
