"use client";

import { useState, useEffect } from "react";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import { Button, Select } from "@radix-ui/themes";
import { Toaster, toast } from "sonner";

interface Application {
  name: string;
  grade: string;
  school: string;
  reason: string;
  skills: string;
  idea: string;
  source: string;
  email: string;
  link: string;
}

const Apply = () => {
  const [application, setApplication] = useState<Application>({
    name: "",
    grade: "Grade 9",
    school: "",
    reason: "",
    skills: "",
    idea: "",
    source: "",
    email: "",
    link: "",
  });

  const [status, setStatus] = useState<
    "No Changes" | "Saving" | "Saved" | "Submitted"
  >("No Changes");
  const [statusColor, setStatusColor] = useState<
    | ""
    | "text-red-600"
    | "text-yellow-600"
    | "text-blue-600"
    | "text-green-600"
    | "text-gray-600"
  >("text-gray-600");

  useEffect(() => {
    const savedApplication = localStorage.getItem("flowboat-application");
    if (savedApplication) {
      setApplication(JSON.parse(savedApplication));
    }
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus("Saving");
    setStatusColor("text-yellow-600");

    try {
      const response = await fetch(
        `/api/sheet?spreadsheetId=${process.env.NEXT_PUBLIC_APPLICATION_SHEET_ID}&range=A:Z`
      );
      const data = await response.json();

      if (response.ok) {
        const emails = data.values.map((row: string[]) => row[7]);
        if (emails.includes(application.email)) {
          console.error("Error: Email already exists");
          toast.error(
            "You've already submitted an application! Try a different email."
          );
        } else {

          try {
            const response = await fetch("/api/sheet", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...application,
                spreadsheetId: process.env.NEXT_PUBLIC_APPLICATION_SHEET_ID,
                range: "A:Z",
              }),
            });

            if (response.ok) {
              console.log("Data written successfully");
              toast.success("Application submitted successfully!");

              localStorage.setItem(
                "flowboat-application",
                JSON.stringify({
                  name: "",
                  grade: "Grade 9",
                  school: "",
                  reason: "",
                  skills: "",
                  idea: "",
                  source: "",
                  email: "",
                  link: "",
                })
              );
            } else {
              const errorData = await response.json();
              console.error(`Error: ${errorData.message}`);
              toast.error(`An error occurred: ${errorData.message}`);
            }
          } catch (error) {
            console.error("Error submitting form:", error);
            toast.error(`An error occurred: ${error}`);
          }
        }
      } else {
        console.error("Error:", data.message);
        toast.error(`An error occurred: ${data.message}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error(`An error occurred: ${error}`);
    }

    setStatus("Saved");
    setStatusColor("text-green-600");
  };

  const onChange = (e: React.FormEvent<HTMLFormElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    setApplication({
      ...application,
      [name]: value,
    });

    localStorage.setItem("flowboat-application", JSON.stringify(application));

    setStatus("Saved");
    setStatusColor("text-green-600");
  };

  return (
    <div className="max-w-[26rem] m-auto py-16 px-4">
      <Toaster richColors position="top-right" visibleToasts={7} />
      <code className="text-neutral-600 text-sm">2024-2025</code>
      <h1 className="font-bold text-2xl">Flowboat Member Application</h1>
      <p>Accelerating the ideas of tomorrow.</p>
      {status && <p className={`text-xs ${statusColor}`}>• {status}</p>}

      <form
        className="flex flex-col gap-8 mt-8"
        onSubmit={onSubmit}
        onChange={onChange}
        onBlur={onChange}
        onInvalid={(e: React.FormEvent<HTMLFormElement>) => {
          const form = e.target as HTMLInputElement | HTMLTextAreaElement;
          toast.error(`Please fill out the "${form.name}" field.`);
        }}
      >
        <Input
          label="What is your full name?"
          requiredMessage="We all have names, I think."
          placeholder="You can call me..."
          name="name"
          value={application.name}
          required
        />

        <div className="flex flex-col gap-2">
          <label>What grade will you be entering in September 2024?</label>
          <p className="text-sm text-neutral-40">
            All Flowboat members are high school students.
          </p>
          <Select.Root
            name="grade"
            onValueChange={(e) => {
              setApplication({
                ...application,
                grade: e.toString(),
              });
            }}
            defaultValue="Grade 9"
            size="2"
            value={application.grade}
          >
            <Select.Trigger />
            <Select.Content>
              <Select.Item value="Grade 9">Grade 9</Select.Item>
              <Select.Item value="Grade 10">Grade 10</Select.Item>
              <Select.Item value="Grade 11">Grade 11</Select.Item>
              <Select.Item value="Grade 12">Grade 12</Select.Item>
            </Select.Content>
          </Select.Root>
        </div>

        <Input
          name="school"
          label="What high school do you currently attend?"
          description="All applying members must be located in the Waterloo Region."
          requiredMessage="School name is required."
          placeholder="I currently attend..."
          value={application.school}
          required
        />

        <Textarea
          name="reason"
          label="Why are you looking to be a part of Flowboat this year?"
          description="Your response must be a minimum of 5 sentences."
          requiredMessage="Please type a minimum of 5 sentences."
          placeholder="Type your response here..."
          minrows={3}
          value={application.reason}
          required
        />

        <Textarea
          name="skills"
          label="What technological skills, business expertise or other valuable traits do you bring to the table? Explain your biggest accomplishments/experiences."
          description={
            <>
              You can discuss clubs, projects and organizations you have taken
              part in; talk about anything you think would fit here. Your
              response must be <strong>300 to 400 words</strong>.
            </>
          }
          requiredMessage="Please type a minimum of 5 sentences."
          placeholder="Type your response here..."
          minrows={7}
          value={application.skills}
          required
        />

        <Input
          name="idea"
          label="You're almost done! Please tell us about a cool startup idea you have in mind!"
          description="Anything! Don't worry if you think it isn't great."
          requiredMessage="Try to think of something!"
          placeholder="An AI-powered app that..."
          value={application.idea}
          required
        />

        <Input
          name="source"
          label="One last thing! How did you hear about Flowboat?"
          requiredMessage="Try to think of something!"
          placeholder="My friend ... told me"
          value={application.source}
          required
        />

        <Input
          name="email"
          label="Now that you've finished up the paperwork, enter your email below so that we can contact you."
          description="Who doesn't have an email in 2024?"
          requiredMessage="Please enter a valid email address."
          placeholder="member@flowboat.ca"
          type="email"
          value={application.email}
          required
        />

        <Input
          name="link"
          label="Do you have a personal website, GitHub, portfolio or LinkedIn? Link it to us and we'll check it out!"
          description="This is entirely optional and will not negatively affect your application."
          placeholder="linkedin.com/in/..."
          value={application.link}
        />

        <div>
          <Button
            className="mt-4 w-full"
            variant="surface"
            type="submit"
            loading={status == "Saving"}
          >
            Submit Application
          </Button>
          <p className="mt-1 text-xs text-gray-400">
            This form saves automatically, but your data will be cleared when
            you submit.{" "}
            <button
              className="font-bold"
              type="button"
              onClick={() => {
                localStorage.setItem(
                  "flowboat-application",
                  JSON.stringify({
                    name: "",
                    grade: "Grade 9",
                    school: "",
                    reason: "",
                    skills: "",
                    idea: "",
                    source: "",
                    email: "",
                    link: "",
                  })
                );
                setApplication({
                  name: "",
                  grade: "Grade 9",
                  school: "",
                  reason: "",
                  skills: "",
                  idea: "",
                  source: "",
                  email: "",
                  link: "",
                });
                toast.success("Data cleared successfully!");
              }}
            >
              Clear data now.
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Apply;
