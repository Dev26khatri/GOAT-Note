"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2Icon, LoaderIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LogoutAction } from "@/actions/users";

const LogOutButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    //Sample Code of logOut
    setIsLoading(true);
    try {
      const { errorMessage } = await LogoutAction();
      if (!errorMessage) {
        router.push("/");
        toast.success("LogOut successfully");
      } else {
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      variant={"outline"}
      className="w-20"
      disabled={isLoading}
    >
      {isLoading ? <Loader2Icon className=" animate-spin " /> : "LogOut"}
    </Button>
  );
};

export default LogOutButton;
