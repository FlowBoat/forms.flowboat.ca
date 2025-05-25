import Form from "@/form";

export const MemberApplication = new Form(
  "Flowboat Member Application",
  "2024-2025",
  "Accelerating the ideas of tomorrow.",
  "/apply",
  [
    {
      type: "input",
      name: "name",
      label: "What is your full name?",
      required: true,
      requiredMessage: "We all have names, I think.",
      placeholder: "You can call me..."
    },
    {
      type: "select",
      name: "grade",
      label: "What grade will you be entering in September 2024?",
      description: "All Flowboat members are high school students.",
      required: true,
      requiredMessage: "We all have grades, I think.",
      placeholder: "I currently attend...",
      options: ["Grade 9", "Grade 10", "Grade 11", "Grade 12"]
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
      }
    }
  ]
);
