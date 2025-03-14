import { NextResponse } from "next/server";
import { getPayload } from "payload";
import configPromise from "@payload-config";

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise });
    const { docs: universites } = await payload.find({
      collection: "universites",
      limit: 100,
      sort: "nomDeLUniversite",
      select: {
        nomDeLUniversite: true,
        slug: true,
        region: true,
        logo: true,
        description: true,
        longDescription: true,
    },
    });

    return NextResponse.json({ success: true, universites });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: false, error: 'An unknown error occurred' }, { status: 500 });
  }
}