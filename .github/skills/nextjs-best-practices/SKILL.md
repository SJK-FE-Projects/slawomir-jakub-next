---
name: nextjs-best-practices
description: 'Create or improve Next.js solutions using official documentation, production-safe patterns, and practical code snippets. Use for App Router architecture, data fetching, rendering strategy (SSR/SSG/ISR), API route handlers, caching, metadata, accessibility, performance, and deployment-ready implementations.'
argument-hint: 'Task goal, constraints, and target area (routing, data, performance, API, auth, forms, etc.)'
user-invocable: true
disable-model-invocation: false
---

# Next.js Best Practices

Build robust Next.js solutions by combining documentation-grounded guidance, implementation patterns, and ready-to-adapt snippets.

## When to Use
- Designing new Next.js features with App Router
- Refactoring for cleaner architecture and maintainability
- Choosing between SSR, SSG, ISR, and client rendering
- Improving API route handlers, forms, metadata, and SEO
- Fixing performance issues (bundle size, data waterfalls, caching)
- Producing implementation-ready snippets and explanations

## Inputs
Provide at least:
- Feature or bug goal
- Constraints (deadline, SEO, auth, API shape, infra)
- Current code or file paths
- Expected output format (patch, checklist, snippets, docs)

## Workflow
1. Clarify the outcome and scope.
2. Identify the feature area: routing, data, rendering, API, UI/client state, or deployment.
3. Select rendering and data strategy with explicit trade-offs:
   - Prefer server components by default.
   - Add client components only where interactivity is required.
   - Pick SSR/SSG/ISR based on freshness, personalization, and cost.
4. Produce a minimal, testable implementation plan.
5. Implement with patterns from [good practices](./references/nextjs-good-practices.md).
6. Include adaptation-ready snippets from [code snippets](./references/nextjs-code-snippets.md).
7. Validate quality gates before final output.

## Decision Points
- Need per-user or request-time data? Use SSR/server rendering.
- Data mostly static with periodic refresh? Use ISR/revalidation.
- Highly interactive UI state? Isolate a client component boundary.
- Repeated upstream requests? Configure cache and revalidation intentionally.
- Sensitive logic or keys? Keep on the server and never expose in client bundles.

## Quality Gates
- Uses App Router conventions and clear route boundaries
- Correct rendering strategy justified in one sentence
- No unnecessary client component usage
- Server/client data boundaries are explicit and safe
- Error and loading states are handled
- Basic accessibility checks included (labels, semantics, keyboard)
- Performance basics handled (image/font optimization, avoid large client bundles)
- Output includes runnable code or exact patch steps

## Output Format
- Brief recommendation summary
- Why this strategy fits
- Implementation steps
- Code snippets or patch-ready code
- Verification checklist

## References
- [Next.js Good Practices](./references/nextjs-good-practices.md)
- [Next.js Code Snippets](./references/nextjs-code-snippets.md)
