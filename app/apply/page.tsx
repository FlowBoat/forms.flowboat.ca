"use client";

import React from "react";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import { Button, Select } from "@radix-ui/themes";

const page = () => {
  return (
    <div className="max-w-[25rem] m-auto pt-16">
      <code className="text-neutral-400 text-sm">2024-2025</code>
      <h1 className="font-bold text-2xl">Flowboat Member Application</h1>
      <p>Accelerating the ideas of tomorrow.</p>

      <form className="flex flex-col gap-8 mt-8">
        <Input
          label="What is your full name?"
          requiredMessage="We all have names, I think."
          placeholder="You can call me..."
          required
        />

        <div className="flex flex-col gap-2">
          <label>What grade will you be entering in September 2024?</label>
          <p className="text-sm text-neutral-40">
            All Flowboat members are high school students.
          </p>
          <Select.Root defaultValue="gr9" size="2">
            <Select.Trigger />
            <Select.Content>
              <Select.Item value="gr9">Grade 9</Select.Item>
              <Select.Item value="gr10">Grade 10</Select.Item>
              <Select.Item value="gr11">Grade 11</Select.Item>
              <Select.Item value="gr12">Grade 12</Select.Item>
            </Select.Content>
          </Select.Root>
        </div>

        <Input
          label="What high school do you currently attend?"
          description="All applying members must be located in the Waterloo Region."
          requiredMessage="School name is required."
          placeholder="I currently attend..."
          required
        />

        <Textarea
          label="Why are you looking to be a part of Flowboat this year?"
          description="Your response must be a minimum of 5 sentences."
          requiredMessage="Please type a minimum of 5 sentences."
          placeholder="Type your response here..."
          minrows={3}
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
          required
        />

        <Input
          label="You're almost done! Please tell us about a cool startup idea you have in mind!"
          description="Anything! Don't worry if you think it isn't great."
          requiredMessage="Try to think of something!"
          placeholder="Only 0.3% of pitches..."
          required
        />

        <Input
          label="One last thing! How did you hear about Flowboat?"
          description="Anything! Don't worry if you think it isn't great."
          requiredMessage="Try to think of something!"
          placeholder="My friend ... told me"
          required
        />

        <Input
          label="Now that you've finished up the paperwork, enter your email below so that we can contact you."
          description="Who doesn't have an email in 2024?"
          requiredMessage="Please enter a valid email address."
          placeholder="member@flowboat.ca"
          type="email"
          required
        />

        <Input
          label="Do you have a personal website, GitHub, portfolio or LinkedIn? Link it to us and we'll check it out!"
          description="This is entirely optional and will not negatively affect your application."
          placeholder="linkedin.com/in/..."
        />

        <Button className="mt-4" variant="surface" type="submit">
          Submit Application
        </Button>
      </form>
    </div>
  );
};

export default page;
