import { getAuthenticatedSupabaseContext } from "@/lib/api-auth";

export async function DELETE(
  _request: Request,
  context: RouteContext<"/api/documents/[id]">,
) {
  const auth = await getAuthenticatedSupabaseContext();
  if ("response" in auth) return auth.response;

  const { id } = await context.params;
  const { data: document, error: lookupError } = await auth.client
    .from("documents")
    .select("file_url")
    .eq("id", id)
    .eq("user_id", auth.user.id)
    .maybeSingle();

  if (lookupError || !document) {
    return Response.json({ error: "Document not found." }, { status: 404 });
  }

  if (document.file_url) {
    const { error: storageError } = await auth.client.storage
      .from("smartform-documents")
      .remove([document.file_url]);
    if (storageError) {
      return Response.json({ error: "Could not remove the stored PDF." }, { status: 503 });
    }
  }

  const { error } = await auth.client
    .from("documents")
    .delete()
    .eq("id", id)
    .eq("user_id", auth.user.id);

  if (error) {
    return Response.json({ error: "Could not delete the document record." }, { status: 503 });
  }

  return Response.json({ deleted: true });
}