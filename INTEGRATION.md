# SmartForm Integration Guide

## Local Setup

1. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` from your Supabase project.
2. Apply `supabase/migrations/202609290001_smartform_schema.sql` using the Supabase SQL editor or Supabase CLI. It creates the profile trigger, RLS policies, private PDF bucket, document/subscription tables, and credit/payment RPCs.
3. Add local and deployed app URLs to Supabase Auth's allowed redirect URLs. Configure email confirmation as desired.
4. Run `npm run dev` from the `smartform` directory.

The workspace uses cookie-backed Supabase sessions. `/dashboard`, `/create`, `/documents`, and `/settings` are protected by `proxy.ts`; every API route independently validates the Supabase user. Never expose service-role or Safepay credentials in a `NEXT_PUBLIC_` variable.

## Data and API

- `profiles` is provisioned by an `auth.users` trigger and stores plan, monthly limits, usage, email, and full name.
- `documents` stores per-user processing history. Original PDFs live in the private `smartform-documents` bucket; downloads use one-minute signed URLs.
- `subscriptions` records verified payment entitlements. `activate_subscription_after_payment` is restricted to `service_role` and is idempotent by payment ID.
- `consume_profile_credit('generation' | 'extraction')` atomically checks and consumes a monthly allowance. Call it only after connected processing succeeds; current PDF routes return `501` without consuming credits.
- PDF placeholders: `/api/pdf/upload`, `/api/pdf/analyze`, and `/api/pdf/generate`.
- Safepay placeholders: `/api/payment/create` and `/api/payment/verify`.

## Remaining Integrations

1. Select the PDF/AI provider and implement analysis and completed-PDF generation in the PDF routes. After success, call the credit RPC once and update document status/output storage.
2. The upload route stores the original PDF. Add generated output object handling and retention/deletion policy before production.
3. Configure `SAFEPAY_API_KEY`, `SAFEPAY_SECRET_KEY`, and `SAFEPAY_WEBHOOK_SECRET` in the deployment secret store. Implement checkout creation and verify signed callbacks server-to-server before calling the activation RPC through a server-side Supabase service-role client.
4. Set `SUPABASE_SERVICE_ROLE_KEY` only in the server environment for verified payment activation; it is not needed by browser code.
5. Add provider-specific PDF/AI credentials as server-only variables after selecting providers. No PDF or AI processing API key is currently required or used.

Run `npm run lint` and `npm run build` from the `smartform` directory before deployment.
