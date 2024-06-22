import { Card } from "@radix-ui/themes";
import Link from 'next/link'

const HomePage = () => {
  return (
    <div className="p-16">
      <h1 className="font-bold text-2xl">Flowboat Forms</h1>
      <p className="mt-2 mb-8">Flowboat is accelerating the ideas of tomorrow. Waterloo's very own start-up incubator for high school students.</p>
      <Link href="/apply">
        <Card className="max-w-[20rem] hover:bg-gray-200 transition-colors">
          <code className="text-neutral-600 text-sm">2024-2025</code>
          <h2 className="font-bold">Flowboat Member Application</h2>
          <p className="text-gray-500">Accelerating the ideas of tomorrow.</p>
        </Card>
      </Link>
    </div>
  )
};

export default HomePage;