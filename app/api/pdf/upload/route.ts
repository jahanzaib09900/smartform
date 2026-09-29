import { getAuthenticatedSupabaseContext } from "@/lib/api-auth";

const maxUploadBytes = 25 * 1024 * 1024;

export async function POST(request: Request) {
  const context = await getAuthenticatedSupabaseContext();
  if ("response" in context) return context.response;

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return Response.json({ error: "Choose a PDF file to upload." }, { status: 400 });
    }

    if (
      file.size === 0 ||
      file.size > maxUploadBytes ||
      (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) ||
      (await file.slice(0, 5).text()) !== "%PDF-"
    ) {
      return Response.json(
        { error: "Upload a valid PDF no larger than 25 MB." },
        { status: 400 },
      );
    }

    const fileName = file.name.replace(/[\\/\u0000-\u001f]/g, "_").slice(0, 255);
    const { data, error } = await context.client
      .from("documents")
      .insert({ user_id: context.user.id, file_name: fileName, status: "processing" })
      .select("id, file_name, status, file_url, created_at")
      .single();

    if (error) {
      console.error("Could not create document record:", error.message);
      return Response.json(
        { error: "Document storage is not ready. Apply the SmartForm database migration first." },
        { status: 503 },
      );
    }

    const objectPath = `${context.user.id}/${data.id}/source.pdf`;
    // Connect PDF API here later
    const { error: storageError } = await context.client.storage
      .from("smartform-documents")
      .upload(objectPath, file, { contentType: "application/pdf" });

    if (storageError) {
      await context.client.from("documents").delete().eq("id", data.id);
      console.error("Could not store PDF:", storageError.message);
      return Response.json(
        { error: "Private PDF storage is unavailable. Apply the SmartForm database migration first." },
        { status: 503 },
      );
    }

    const { data: storedDocument, error: updateError } = await context.client
      .from("documents")
      .update({ file_url: objectPath })
      .eq("id", data.id)
      .select("id, file_name, status, file_url, created_at")
      .single();

    if (updateError) {
      await context.client.storage.from("smartform-documents").remove([objectPath]);
      await context.client.from("documents").delete().eq("id", data.id);
      return Response.json({ error: "Could not finish saving this PDF." }, { status: 503 });
    }

    return Response.json({ document: storedDocument }, { status: 201 });
  } catch {
    return Response.json({ error: "The upload request could not be read." }, { status: 400 });
  }
}