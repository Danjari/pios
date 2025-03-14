import { NextResponse } from "next/server";
import { getPayload } from "payload";
import configPromise from "@payload-config";

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    if (!slug) {
      return NextResponse.json({ success: false, error: "Missing slug" }, { status: 400 });
    }

    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: "universites",
      where: { slug: { equals: slug } },
      limit: 1,
      pagination: false,
    });

    const university = result.docs?.[0];

    if (!university) {
      return NextResponse.json({ success: false, error: "University not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, university });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: false, error: 'An unknown error occurred' }, { status: 500 });
  }
}