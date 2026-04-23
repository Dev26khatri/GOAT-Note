"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { Loader2, LogIn, UserPlus2 } from "lucide-react";
import Link from "next/link";
import { loginAction, signupAction } from "@/actions/users";

type Props = {
  type: "login" | "signup";
};

const AuthForm = ({ type }: Props) => {
  const [isPending, startTransition] = useTransition();

  const isLoginForm = type === "login";
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    //without transition we are facing some UI freeze becuase of the async operation and also we are not able to show the Loading state properly
    //So we are using startTransition to avoid UI freeze and also to show the Loading state properly
    startTransition(async () => {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      let errorMessage;
      let title;
      let description;

      if (isLoginForm) {
        errorMessage = (await loginAction(email, password)).errorMessage;
        title = "Logged in";
        description = "You have been successfully logged in";
        if (!errorMessage) router.prefetch("/login");
        router.push("/");
      } else {
        errorMessage = (await signupAction(email, password)).errorMessage;
        title = "Signup successful";
        description = "Check your email for a confirmation link";
        if (!errorMessage) router.prefetch("/signup");
        router.push("/");
      }

      if (!errorMessage) {
        toast.success(title, { description });
      } else {
        toast.error(errorMessage);
      }
    });
  };
  return (
    <form action={handleSubmit}>
      <CardContent className=" grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="john@gmail.com"
            className="focus:outline-none focus:ring-0"
            disabled={isPending}
            required
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="******"
            className="focus:outline-none focus:ring-0"
            disabled={isPending}
            required
          />
        </div>
      </CardContent>
      <CardFooter className="mt-2 flex flex-col gap-4">
        <Button
          className=" mt-4 w-full font-semibold"
          disabled={isPending}
          type="submit"
        >
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : isLoginForm ? (
            <div className="flex items-center gap-2">
              <LogIn className="size-5" />
              Login
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <UserPlus2 className="size-5" />
              Signup
            </div>
          )}
        </Button>
        <p className="text-center">
          {isLoginForm
            ? "Don't have an account yet ?"
            : "Already have an account ?"}
          {""}
          <Link
            className="text-blue-300 ml-1  hover:underline"
            href={isLoginForm ? "/signup" : "/login"}
          >
            {isLoginForm ? "Sign Up" : "Login"}
          </Link>
        </p>
      </CardFooter>
    </form>
  );
};

export default AuthForm;
