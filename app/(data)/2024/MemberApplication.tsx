import Form from "@/form";

export const MemberApplication = new Form({
  name: "Flowboat Member Application",
  year: "2024-2025",
  description: "Accelerating the ideas of tomorrow.",
  link: "2024-member-application",
  sheetId: "1LH_SylMKjJZ5uY47DSwsOOv1vhEhoqknjIAjhGKeBQQ",
  range: "A:Z",
  fields: [
    {
      type: "input",
      name: "name",
      label: "What is your full name?",
      required: true,
      requiredMessage: "We all have names, I think.",
      placeholder: "You can call me...",
    },
    {
      type: "select",
      name: "grade",
      label: "What grade will you be entering in September 2024?",
      description: "All Flowboat members are high school students.",
      required: true,
      requiredMessage: "We all have grades, I think.",
      placeholder: "Select your grade",
      options: ["Grade 9", "Grade 10", "Grade 11", "Grade 12"],
    },
    {
      type: "input",
      name: "school",
      label: "What high school do you currently attend?",
      description:
        "All applying members must be located in the Waterloo Region.",
      required: true,
      requiredMessage: "School name is required.",
      placeholder: "I currently attend...",
    },
    {
      type: "textarea",
      name: "reason",
      label: "Why are you looking to be a part of Flowboat this year?",
      description: "Your response must be a minimum of 4 sentences.",
      required: true,
      requiredMessage: "Please type a minimum of 4 sentences.",
      placeholder: "Type your response here...",
    },
    {
      type: "input",
      name: "idea",
      label:
        "You're almost done! Please tell us about a cool startup idea you have in mind!",
      description: "Anything! Don't worry if you think it isn't great.",
      required: true,
      requiredMessage: "Try to think of something!",
      placeholder: "An AI-powered app that...",
    },
    {
      type: "input",
      name: "source",
      label: "One last thing! How did you hear about Flowboat?",
      required: true,
      requiredMessage: "Try to think of something!",
      placeholder: "My friend ... told me",
    },
    {
      type: "input",
      name: "email",
      label:
        "Now that you've finished up the paperwork, enter your email below so that we can contact you.",
      description: "Who doesn't have an email in 2024?",
      required: true,
      requiredMessage: "Please enter a valid email address.",
      placeholder: "member@flowboat.ca",
      validation: (value) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
    },
    {
      type: "input",
      name: "link",
      label:
        "Do you have a personal website, GitHub, portfolio or LinkedIn? Link it to us and we'll check it out!",
      description:
        "This is entirely optional and will not negatively affect your application.",
      required: false,
      placeholder: "linkedin.com/in/...",
    },
  ],
});
