import { getUser } from "@/auth/server";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Note } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import SidebarGroupContent from "./SidebarGroupContent";

export async function AppSidebar({ user }: { user: any }) {
  // const user = await getUser();

  let notes: Note[] = [];

  if (user) {
    notes = await prisma.note.findMany({
      where: {
        authorId: user.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  }
  return (
    <Sidebar className="hidden lg:block">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {user ? (
              <div className=" flex flex-col mt-5 space-y-3">
                <h1 className="text-2xl">Your Notes</h1>
                {user && <SidebarGroupContent notes={notes} />}
              </div>
            ) : (
              <Link
                href={"/login"}
                className="underline  text-lg font-semibold "
              >
                Login to see your notes
              </Link>
            )}
            <div className="block"></div>
          </SidebarGroupLabel>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
