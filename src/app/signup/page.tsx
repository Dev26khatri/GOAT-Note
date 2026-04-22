import AuthForm from "@/components/AuthForm";
import { Card, CardTitle } from "@/components/ui/card";
import React from "react";

const SignupPage = () => {
  return (
    <div className="mt-2 flex flex-1 flex-col items-center">
      <Card className="w-full max-w-md">
        <CardTitle className="mb-4  text-3xl text-center font-semibold tracking-tight ">
          Sign Up
        </CardTitle>
        <AuthForm type="signup" />
      </Card>
    </div>
  );
};

export default SignupPage;
