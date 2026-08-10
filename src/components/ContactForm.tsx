import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import {
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),

  email: z
    .string()
    .email("Invalid email address"),

  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .max(200, "Subject must be less than 200 characters"),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

type FormData = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    // Prevent duplicate submissions within 5 seconds
    const now = Date.now();

    if (now - lastSubmitTime < 5000) {
      setErrorMessage("Please wait before submitting again.");
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    const formId = import.meta.env.VITE_FORMSPREE_FORM_ID;

    if (!formId) {
      setErrorMessage(
        "Formspree form ID is not configured. Please add VITE_FORMSPREE_FORM_ID to your environment variables."
      );
      setSubmitStatus("error");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(
        `https://formspree.io/f/${formId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        form.reset();
        setLastSubmitTime(now);
      } else {
        setErrorMessage(
          result.error ||
            "Failed to send message. Please try again."
        );
        setSubmitStatus("error");
      }
    } catch (error) {
      setErrorMessage(
        "Network error. Please check your connection and try again."
      );
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-card/20 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Send a Message</CardTitle>
        <CardDescription>
          Fill out the form below and I'll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {submitStatus === "success" && (
          <Alert className="mb-6 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              Message sent successfully! I'll get back to you soon.
            </AlertDescription>
          </Alert>
        )}

        {submitStatus === "error" && (
          <Alert className="mb-6 bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
            <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
            <AlertDescription className="text-red-800 dark:text-red-200">
              {errorMessage}
            </AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block w-full text-left">
                    Name
                  </FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Your name"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block w-full text-left">
                    Email
                  </FormLabel>

                  <FormControl>
                    <Input
                      placeholder="your.email@example.com"
                      type="email"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Subject */}
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block w-full text-left">
                    Subject
                  </FormLabel>

                  <FormControl>
                    <Input
                      placeholder="What is this about?"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Message */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block w-full text-left">
                    Message
                  </FormLabel>

                  <FormControl>
                    <Textarea
                      placeholder="Your message..."
                      className="min-h-[150px] resize-none"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;

