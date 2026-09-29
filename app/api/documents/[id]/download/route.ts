import { getAuthenticatedSupabaseContext } from "@/lib/api-auth";

export async function GET(
  _request: Request,
  context: RouteContext<"/api/documents/[id]/download">,
) {
  const auth = await getAuthenticatedSupabaseContext();
  if ("response" in auth) return auth.response;

  const { id } = await context.params;
  const { data: document, error } = await auth.client
    .from("documents")
    .select("file_url")
    .eq("id", id)
    .eq("user_id", auth.user.id)
    .maybeSingle();

  if (error || !document?.file_url) {
    return Response.json({ error: "Document file not found." }, { status: 404 });
  }

  const { data, error: storageError } = await auth.client.storage
    .from("smartform-documents")
    .createSignedUrl(document.file_url, 60);

  if (storageError || !data?.signedUrl) {
    return Response.json({ error: "Could not create a secure download link." }, { status: 503 });
  }

  return Response.redirect(data.signedUrl, 302);
}