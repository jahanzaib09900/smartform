import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function getAuthenticatedSupabaseContext() {
  const client = await createSupabaseServerClient();

  if (!client) {
    return {
      response: Response.json(
        { error: "Supabase is not configured on this server." },
        { status: 503 },
      ),
    } as const;
  }

  const { data, error } = await client.auth.getUser();

  if (error || !data.user) {
    return {
      response: Response.json({ error: "Authentication required." }, { status: 401 }),
    } as const;
  }

  return { client, user: data.user } as const;
}