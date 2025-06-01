import { Card } from "@radix-ui/themes";
import Link from "next/link";
import Form from "@/form";
import { MemberApplication as MemberApplication2024 } from "@/(data)/2024/MemberApplication";

const forms = [MemberApplication2024] as Form[];

const HomePage = () => {
  return (
    <div className="p-16">
      <h1 className="font-bold text-2xl">Flowboat Forms</h1>
      <p className="mt-2 mb-8">
        Flowboat is accelerating the ideas of tomorrow. Waterloo&apos;s very own
        start-up incubator for high school students.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {forms.map((form) => (
          <Link href={`/forms/${form.link}`} key={form.name}>
            <Card className="max-w-[20rem] hover:bg-gray-200 transition-colors">
              <code className="text-neutral-600 text-sm">{form.year}</code>
              <h2 className="font-bold">{form.name}</h2>
              <p className="text-gray-500">{form.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
