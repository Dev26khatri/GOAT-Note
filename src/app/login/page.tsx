import AuthForm from "@/components/AuthForm";
import { Card, CardTitle } from "@/components/ui/card";
import { getUser } from "@/auth/server";
import { redirect } from "next/navigation";
import React from "react";

const LoginPage = async () => {
  const user = await getUser();
  if (user) redirect("/");

  return (
    <div className="mt-2 flex flex-1 flex-col items-center">
      <Card className="w-full max-w-md">
        <CardTitle className="mb-4 text-3xl text-center font-semibold tracking-tight">
          Login
        </CardTitle>
        <AuthForm type="login" />
      </Card>
    </div>
  );
};

export default LoginPage;
