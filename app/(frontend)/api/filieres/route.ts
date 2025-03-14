import { NextResponse } from "next/server";
import { getPayload } from "payload";
import configPromise from "@payload-config";

// This API route will run on the server
export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise });
    const { docs: filieres } = await payload.find({
      collection: "filieres",
      limit: 100, // Adjust as necessary
      sort: "title",
      select: {
        nomDeFiliere: true,
        slug: true,
        Categorie: true,
        salaireMoyen: true,
        longDescription: true,
    },
    });

    return NextResponse.json({ success: true, filieres });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: false, error: 'An unknown error occurred' }, { status: 500 });
  }
}