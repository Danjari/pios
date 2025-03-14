import { NextResponse, NextRequest } from "next/server";
import { getPayload } from "payload";
import configPromise from "@payload-config";

export async function GET(req: NextRequest, context: { params: Promise<{ slug: string }> }) {
  try {
    const {slug} = await context.params;
    if (!slug) {
      return NextResponse.json({ success: false, error: "Missing slug" }, { status: 400 });
    }

    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: "filieres",
      where: { slug: { equals: slug } },
      limit: 1,
      pagination: false,
    });

    const filiere = result.docs?.[0];

    if (!filiere) {
      return NextResponse.json({ success: false, error: "Filiere not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, filiere });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: false, error: "An unknown error occurred" }, { status: 500 });
  }
}