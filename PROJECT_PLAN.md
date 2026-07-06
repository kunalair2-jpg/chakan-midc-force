# SpaceDock Warehouse Marketplace Plan

## Product Shape

SpaceDock is a warehouse marketplace where owners list verified storage space and companies search, compare, request quotes, book, pay, and manage warehouse relationships.

## Core Roles

- Guest: browses active approved warehouses.
- Company: searches, saves, requests, accepts quotes, pays, reviews.
- Company team member: procurement, finance, admin, viewer.
- Owner: lists warehouses, manages capacity, responds to requests, creates quotes.
- Owner team member: listing manager, booking manager, finance, viewer.
- Admin: verifies users, approves listings, monitors payments, handles support.
- Super admin: manages platform settings and audit-level operations.

## Technology Stack

- Frontend: Next.js App Router, TypeScript, CSS, lucide-react.
- Backend: Supabase Auth, PostgreSQL, Storage, Row Level Security, Edge Functions.
- Payments: Razorpay for India, Stripe if required later.
- Email: Resend or Supabase transactional email.
- Maps: Mapbox or Google Maps.
- Deployment: Vercel for frontend, Supabase for backend.

## MVP Screens Already Started

- Public homepage.
- Warehouse search grid.
- Warehouse detail page with quote request panel.
- Owner dashboard.
- Owner add warehouse page.
- Company dashboard.
- Admin dashboard.

## Backend Milestones

1. Create Supabase project.
2. Run `supabase/schema.sql`.
3. Create storage buckets:
   - warehouse-images
   - warehouse-videos
   - warehouse-documents
   - company-documents
   - owner-documents
   - invoices
   - contracts
4. Add auth callback and role onboarding.
5. Replace demo data in `src/lib/warehouses.ts` with Supabase queries.
6. Add RLS policies for every table.
7. Add Edge Functions for payment webhooks, quote expiry, invoice generation, and notifications.

## Booking Flow

1. Company searches warehouses.
2. Company sends booking request with area, dates, goods category, and handling needs.
3. Owner reviews and sends quote.
4. Company accepts quote.
5. Booking is created with payment pending.
6. Payment provider webhook confirms payment.
7. Booking becomes confirmed or active.
8. Capacity is reserved in a ledger.
9. Invoice and contract are generated.

## Roadmap

### Phase 1

- Auth and role onboarding.
- Warehouse listing creation.
- Admin listing approval.
- Public search and detail pages.
- Booking request creation.

### Phase 2

- Quote builder.
- Company and owner request inbox.
- Supabase storage uploads.
- Email notifications.
- Saved warehouses.

### Phase 3

- Razorpay payment flow.
- Invoices and contracts.
- Reviews.
- Support tickets.
- Admin analytics.

### Phase 4

- Map view and distance search.
- Team accounts.
- Capacity ledger.
- WhatsApp notifications.
- Featured listings and subscription plans.
