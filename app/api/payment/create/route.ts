import { getAuthenticatedSupabaseContext } from "@/lib/api-auth";

const paidPlans = new Set(["Starter", "Professional"]);

export async function POST(request: Request) {
  const context = await getAuthenticatedSupabaseContext();
  if ("response" in context) return context.response;

  try {
    const body: unknown = await request.json();
    const plan =
      typeof body === "object" && body !== null && "plan" in body
        ? body.plan
        : null;

    if (typeof plan !== "string" || !paidPlans.has(plan)) {
      return Response.json({ error: "Choose a valid paid plan." }, { status: 400 });
    }

    // Connect Safepay checkout here later
    return Response.json(
      { error: "Safepay checkout is not configured yet." },
      { status: 501 },
    );
  } catch {
    return Response.json({ error: "Invalid payment request." }, { status: 400 });
  }
}