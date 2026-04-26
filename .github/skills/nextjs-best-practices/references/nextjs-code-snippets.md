# Next.js Code Snippets

## Server Component Data Fetch (App Router)
```tsx
// app/products/page.tsx
export default async function ProductsPage() {
  const res = await fetch(`${process.env.API_URL}/products`, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error("Failed to load products");
  }

  const products = (await res.json()) as Array<{ id: string; name: string }>;

  return (
    <main>
      <h1>Products</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </main>
  );
}
```

## Route Handler with Validation
```ts
// app/api/contact/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string; message?: string };

  if (!body.email || !body.message) {
    return NextResponse.json(
      { error: "email and message are required" },
      { status: 400 },
    );
  }

  // TODO: send to provider or queue
  return NextResponse.json({ ok: true }, { status: 200 });
}
```

## Loading and Error Boundaries
```tsx
// app/dashboard/loading.tsx
export default function Loading() {
  return <p>Loading dashboard...</p>;
}
```

```tsx
// app/dashboard/error.tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <section>
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </section>
  );
}
```

## Metadata
```ts
// app/blog/[slug]/page.tsx
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Post: ${slug}`,
    description: `Read ${slug}`,
  };
}
```

## Client Boundary for Interactivity
```tsx
// app/components/LikeButton.tsx
"use client";

import { useState } from "react";

export default function LikeButton() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount((v) => v + 1)}>Likes: {count}</button>;
}
```
