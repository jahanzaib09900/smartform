import { getAuthenticatedSupabaseContext } from "@/lib/api-auth";

export async function POST(request: Request) {
  const context = await getAuthenticatedSupabaseContext();
  if ("response" in context) return context.response;

  try {
    await request.json();
  } catch {
    return Response.json({ error: "Invalid payment verification request." }, { status: 400 });
  }

  // Verify Safepay payments server-side before changing subscriptions or profile plans.
  return Response.json(
    { error: "Safepay payment verification is not configured yet." },
    { status: 501 },
  );
}