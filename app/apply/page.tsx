"use client";

import { useState } from "react";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import { Button, Select } from "@radix-ui/themes";

const page = () => {

  const [name, setName] = useState<string>("")
  const [grade, setGrade] = useState<string>("Grade 9")
  const [school, setSchool] = useState<string>("")
  const [reason, setReason] = useState<string>("")
  const [skills, setSkills] = useState<string>("")
  const [idea, setIdea] = useState<string>("")
  const [source, setSource] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [link, setLink] = useState<string>("")

  const [status, setStatus] = useState<"No Changes" | "Saving" | "Saved" | "Submitted">("No Changes")
  const [statusColor, setStatusColor] = useState<"" | "text-red-400" | "text-yellow-400" | "text-blue-400" | "text-green-400" | "text-gray-400">("text-gray-400")

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus("Saving")

    console.log(
      name,
      grade,
      school,
      reason,
      skills,
      idea,
      source,
      email,
      link
    )

    setStatus("Saving")
    setStatusColor("text-yellow-400")

    setTimeout(() => {
      localStorage.setItem("flowboat-application", JSON.stringify({
        name,
        grade,
        school,
        reason,
        skills,
        idea,
        source,
        email,
        link
      }))

      setStatus("Saved")
      setStatusColor("text-green-400")
    }, 800)
  }

  const onChange = (e: React.FormEvent<HTMLFormElement>) => {
    if (status !== "Saving") {
      setStatus("Saving")
      setStatusColor("text-yellow-400")

      setTimeout(() => {
        localStorage.setItem("flowboat-application", JSON.stringify({
          name,
          grade,
          school,
          reason,
          skills,
          idea,
          source,
          email,
          link
        }))

        setStatus("Saved")
        setStatusColor("text-green-400")
      }, 800)
    }
  }

  return (
    <div className="max-w-[25rem] m-auto py-16">
      <code className="text-neutral-400 text-sm">2024-2025</code>
      <h1 className="font-bold text-2xl">Flowboat Member Application</h1>
      <p>Accelerating the ideas of tomorrow.</p>
      { status && <p className={`text-xs ${statusColor}`}>• {status}</p> }

      <form className="flex flex-col gap-8 mt-8" onSubmit={onSubmit} onChange={onChange}>
        <Input
          label="What is your full name?"
          requiredMessage="We all have names, I think."
          placeholder="You can call me..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div className="flex flex-col gap-2">
          <label>What grade will you be entering in September 2024?</label>
          <p className="text-sm text-neutral-40">
            All Flowboat members are high school students.
          </p>
          <Select.Root defaultValue="Grade 9" size="2" value={grade} onValueChange={(e) => setGrade(e)}>
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
          label="What high school do you currently attend?"
          description="All applying members must be located in the Waterloo Region."
          requiredMessage="School name is required."
          placeholder="I currently attend..."
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          required
        />

        <Textarea
          label="Why are you looking to be a part of Flowboat this year?"
          description="Your response must be a minimum of 5 sentences."
          requiredMessage="Please type a minimum of 5 sentences."
          placeholder="Type your response here..."
          minrows={3}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />

        <Textarea
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
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          required
        />

        <Input
          label="You're almost done! Please tell us about a cool startup idea you have in mind!"
          description="Anything! Don't worry if you think it isn't great."
          requiredMessage="Try to think of something!"
          placeholder="Only 0.3% of pitches..."
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          required
        />

        <Input
          label="One last thing! How did you hear about Flowboat?"
          description="Anything! Don't worry if you think it isn't great."
          requiredMessage="Try to think of something!"
          placeholder="My friend ... told me"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          required
        />

        <Input
          label="Now that you've finished up the paperwork, enter your email below so that we can contact you."
          description="Who doesn't have an email in 2024?"
          requiredMessage="Please enter a valid email address."
          placeholder="member@flowboat.ca"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          label="Do you have a personal website, GitHub, portfolio or LinkedIn? Link it to us and we'll check it out!"
          description="This is entirely optional and will not negatively affect your application."
          placeholder="linkedin.com/in/..."
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        <Button className="mt-4" variant="surface" type="submit" loading={status == "Saving"}>
          Submit Application
        </Button>
      </form>
    </div>
  );
};

export default page;
