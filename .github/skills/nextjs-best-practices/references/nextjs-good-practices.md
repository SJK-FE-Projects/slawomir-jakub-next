# Next.js Good Practices

## Architecture
- Prefer App Router with route groups to keep feature boundaries clear.
- Keep most UI as server components; move only interactive islands to client components.
- Co-locate route files (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`) with feature data access.

## Data Fetching and Rendering
- Use server-side fetch in server components by default.
- Choose strategy intentionally:
  - SSR: personalized/request-time data
  - SSG: stable static pages
  - ISR: mostly static data with periodic revalidation
- Avoid cascading data waterfalls; fetch in parallel when possible.

## Caching and Revalidation
- Set explicit fetch cache intent (`force-cache`, `no-store`, or revalidate values).
- Use tag/path revalidation for mutation workflows.
- Document freshness expectations per page.

## API and Security
- Keep secrets and privileged logic in server-only files and route handlers.
- Validate input at boundaries (route handlers, server actions).
- Return typed, stable response shapes from internal APIs.

## UX Reliability
- Always include `loading.tsx` and `error.tsx` for key routes.
- Add optimistic or disabled states for form submissions.
- Ensure empty states and fallback states are not blank.

## Accessibility
- Use semantic elements and accessible form labels.
- Keep keyboard focus visible and manageable after interactions.
- Ensure icon-only controls have accessible names.

## Performance
- Use `next/image` and size images correctly.
- Avoid sending heavy dependencies to client bundles.
- Use dynamic import for rarely used client-only widgets.

## SEO and Metadata
- Use route-level metadata consistently.
- Provide meaningful titles/descriptions and canonical-friendly patterns.
- For content pages, include Open Graph metadata.

## Delivery Checklist
- Build passes without type errors.
- Lint passes for changed files.
- Route loading/error states tested manually.
- Key user path tested on mobile and desktop.
