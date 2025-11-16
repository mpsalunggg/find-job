import { Tag } from "@/components/common/Tag";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BuildingOffice2Icon } from "@heroicons/react/24/solid";

const CardDetailJob = () => {
  return (
    <Card className="h-full rounded-lg border p-0 shadow-none">
      <CardContent className="p-6">
        <div className="flex gap-6">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-sm border">
            <BuildingOffice2Icon className="text-primary-main h-7 w-7 drop-shadow-sm" />
            <div className="bg-secondary-main absolute right-1 bottom-1 h-2 w-2 rounded-full shadow ring-2 ring-white" />
          </div>
          <div className="flex w-full justify-between">
            <div className="space-y-2">
              <Tag icon={false} size="sm" variant="success-solid">
                Fulltime
              </Tag>
              <div>
                <p className="text-lg font-bold text-neutral-900">UX Writer</p>
                <span className="text-sm text-neutral-700">Company</span>
              </div>
            </div>
            <Button variant="secondary-solid" size="sm">
              Apply
            </Button>
          </div>
        </div>
        <Separator className="my-6" />
        <span>
          Develop, test, and maintain responsive, high-performance web
          applications using modern front-end technologies. Collaborate with
          UI/UX designers to translate wireframes and prototypes into functional
          code. Integrate front-end components with APIs and backend services.
          Ensure cross-browser compatibility and optimize applications for
          maximum speed and scalability. Write clean, reusable, and maintainable
          code following best practices and coding standards. Participate in
          code reviews, contributing to continuous improvement and knowledge
          sharing. Troubleshoot and debug issues to improve usability and
          overall application quality. Stay updated with emerging front-end
          technologies and propose innovative solutions. Collaborate in
          Agile/Scrum ceremonies, contributing to sprint planning, estimation,
          and retrospectives.
        </span>
      </CardContent>
    </Card>
  );
};
export default CardDetailJob;
