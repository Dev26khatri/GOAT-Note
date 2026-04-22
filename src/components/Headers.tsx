import { shadow } from "@/style/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggleButton";
import LogOutButton from "./LogOutButton";
import { getUser } from "@/auth/server";
const Headers = async () => {
  const user = await getUser();
  return (
    <header
      className="bg-popover relative flex h-24 w-full justify-between items-center px-3 sm:px-8"
      style={{ boxShadow: shadow }}
    >
      <Link href={"/"} className="flex items-end gap-3">
        <Image
          src={"/goatius.png"}
          height={60}
          width={60}
          alt="logo.png"
          className="rounded-full"
          priority
        />
        <h1 className="flex flex-col text-2xl font-semibold pb-1 leading-6">
          GOAT <span>Notes</span>
        </h1>
      </Link>

      <div className="flex gap-4 ">
        {user ? (
          <LogOutButton />
        ) : (
          <>
            <Link href={"/signup"} className="hidden sm:block">
              <Button>Signup</Button>
            </Link>
            <Link href={"/login"}>
              <Button variant={"outline"}>Login</Button>
            </Link>
          </>
        )}
        <ModeToggle />
      </div>
    </header>
  );
};

export default Headers;
