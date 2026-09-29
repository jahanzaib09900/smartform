import { getAuthenticatedSupabaseContext } from "@/lib/api-auth";

export async function POST(request: Request) {
  const context = await getAuthenticatedSupabaseContext();
  if ("response" in context) return context.response;

  try {
    const body: unknown = await request.json();
    const documentId =
      typeof body === "object" && body !== null && "documentId" in body
        ? body.documentId
        : null;

    if (typeof documentId !== "string") {
      return Response.json({ error: "A document ID is required." }, { status: 400 });
    }

    const { data: document, error } = await context.client
      .from("documents")
      .select("id")
      .eq("id", documentId)
      .eq("user_id", context.user.id)
      .maybeSingle();

    if (error || !document) {
      return Response.json({ error: "Document not found." }, { status: 404 });
    }

    // Connect PDF API here later
    return Response.json(
      { error: "PDF generation is not connected yet." },
      { status: 501 },
    );
  } catch {
    return Response.json({ error: "Invalid generation request." }, { status: 400 });
  }
}