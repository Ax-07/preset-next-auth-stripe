"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { signUp } from "@/lib/auth/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const signupFormSchema = z.object({
  name: z.string().min(2).max(100).nonempty(),
  email: z.string().email().nonempty(),
  password: z.string().min(8).max(100).nonempty(),
  confirmPassword: z.string().min(8).max(100).nonempty(),
});

export const SignupForm = ({ ...props }: React.ComponentProps<typeof Card>) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signupFormSchema>) => {
    console.log(data);
    // provider emailAndPassword
    if (data.password !== data.confirmPassword) {
      form.setError("confirmPassword", { message: "Passwords do not match" });
      return;
    }
    await signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: (user) => {
          console.log("User signed up successfully:", user);
          router.push("/auth");
        },
        onError: (error) => {
          console.error("Error signing up:", error);
          toast.error("Error signing up: " + error.error.message);
        },
      }
    );
  };
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Enter your information below to create your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Name"}</FormLabel>
                  <FormControl>
                    <Input placeholder="" autoComplete="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Email"}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="" autoComplete="email" {...field} />
                  </FormControl>
                  <FormDescription>{"We'll never share your email."}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Password"}</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="" autoComplete="new-password" {...field} />
                  </FormControl>
                  <FormDescription>{"Your password must be at least 8 characters long."}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="" autoComplete="new-password" {...field} />
                  </FormControl>
                  <FormDescription>{"Please confirm your password."}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FieldGroup>
              <Field>
                <Button type="submit">Create Account</Button>
                <Button variant="outline" type="button">
                  Sign up with Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="#">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
