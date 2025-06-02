"use client";
export const runtime = "nodejs";

import { forms } from "@/(data)";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import { Button, Select } from "@radix-ui/themes";

export default function Page({ params }: { params: { form: string } }) {
  const form = forms.find((f) => f.link === `${params.form}`);

  const [responses, setResponses] = useState<any>(null);
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
    if (!form) return;
    const savedResponses = localStorage.getItem(`flowboat-forms-${form.link}`);
    if (savedResponses) {
      setResponses(JSON.parse(savedResponses));
    }
  }, [form]);

  if (!form) return <div>Form not found</div>;

  const onChange = (e: React.FormEvent<HTMLFormElement>) => {
    const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
    const date = new Date();
    setResponses((prev: any) => ({
      ...prev,
      timestamp: date.toLocaleString(),
      [name]: value
    }));
    localStorage.setItem(
      `flowboat-forms-${form.link}`,
      JSON.stringify({
        ...responses,
        timestamp: date.toLocaleString(),
        [name]: value
      })
    );
    setStatus("Saved");
    setStatusColor("text-green-600");
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus("Saving");
    setStatusColor("text-yellow-600");

    try {
      const response = await fetch(
        `/api/sheet?spreadsheetId=${form.sheetId}&range=A:Z`
      );
      const data = await response.json();

      if (response.ok) {
        try {
          const response = await fetch("/api/sheet", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              ...responses,
              spreadsheetId: form.sheetId,
              range: "A:Z"
            })
          });

          if (response.ok) {
            console.log("Data written successfully");
            toast.success("Application submitted successfully!");

            localStorage.setItem(
              `flowboat-forms-${form.link}`,
              JSON.stringify({
                ...form.fields.map((field) => ({
                  [field.name]: ""
                }))
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
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error(`An error occurred: ${error}`);
    }

    setStatus("Saved");
    setStatusColor("text-green-600");
  };

  return (
    <div className="max-w-[26rem] m-auto py-16 px-4">
      <Toaster richColors position="top-right" visibleToasts={7} />
      <code className="text-neutral-600 text-sm">{form.year}</code>
      <h1 className="font-bold text-2xl">{form.name}</h1>
      <p className="text-gray-500">{form.description}</p>
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
        {form.fields.map((field) => {
          if (field.type === "input") {
            return (
              <Input
                key={field.name}
                {...field}
                value={responses?.[field.name] || ""}
              />
            );
          }
          if (field.type === "textarea") {
            return (
              <Textarea
                key={field.name}
                {...field}
                minrows={3}
                value={responses?.[field.name] || ""}
              />
            );
          }
          if (field.type === "select") {
            return (
              <div key={field.name} className="flex flex-col gap-2">
                <label>{field.label}</label>
                {field.description && (
                  <p className="text-sm text-neutral-400">
                    {field.description}
                  </p>
                )}
                <Select.Root
                  name={field.name}
                  value={responses?.[field.name] || field.options?.[0] || ""}
                  onValueChange={(val) => {
                    setResponses((prev: any) => ({
                      ...prev,
                      [field.name]: val
                    }));
                  }}
                  required={field.required}
                >
                  <Select.Trigger />
                  <Select.Content>
                    {field.options?.map((option) => (
                      <Select.Item key={option} value={option}>
                        {option}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
                {field.requiredMessage && (
                  <p className="text-xs text-red-400 transition-all opacity-0 h-0">
                    {field.requiredMessage}
                  </p>
                )}
              </div>
            );
          }
          return null;
        })}

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
                  `flowboat-forms-${form.link}`,
                  JSON.stringify({
                    ...form.fields.map((field) => ({
                      [field.name]: ""
                    }))
                  })
                );
                setResponses({
                  ...form.fields.map((field) => ({
                    [field.name]: ""
                  }))
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
}
