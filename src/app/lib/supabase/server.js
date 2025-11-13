
import { createServerClient } from "@supabase/ssr";
import { cookies as nextCookies } from "next/headers";


export function createServerSupabase() {
  const cookieStore = nextCookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        
        getAll: (name) => cookieStore.get(name)?.value,
        // set cookie (best-effort; server components cannot always set cookies)
        setAll: (name, value, options) => {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (err) {
            // setting cookies may throw in some contexts — ignore here
          }
        },
        // remove cookie
        // remove: (name, options) => {
        //   try {
        //     cookieStore.delete(name, options);
        //   } catch (err) {}
        // },
      },
    }
  );
}
