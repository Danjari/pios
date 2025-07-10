

export async function revalidatePage({ path }: { path: string }) {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate`, {
      method: "POST",
      headers: { "Content-Type": "application/json",
        "x-revalidate-secret": process.env.REVALIDATE_SECRET || "",
       },
      body: JSON.stringify({ path }),
    });
  } catch (err) {
    console.error("Revalidation error:", err);
  }
}
