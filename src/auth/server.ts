import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY;

export const createClient = (
  cookieStore: Awaited<ReturnType<typeof cookies>>,
) => {
  const client = createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {}
      },
    },
  });
  return client;
};
export async function getUser() {
  const cookieStore = await cookies();
  const { auth } = await createClient(cookieStore);
  const userObject = await auth.getUser();
  if (userObject.error) {
    console.error(userObject.error);
    return null;
  }
  console.log("Users", userObject.data.user);
  return userObject.data.user;
}
export async function getSession() {
  const cookieStore = await cookies();
  const { auth } = await createClient(cookieStore);
  const sessionObject = await auth.getSession();
  if (sessionObject.error) {
    console.error(sessionObject.error);
    return null;
  }
  return sessionObject.data.session;
}
