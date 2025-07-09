// Importing necessary modules for handling Next.js server requests and cache revalidation
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache"; // This function is used for revalidating paths in the cache, specifically designed for App Router

// Defining an async function to handle POST requests
export async function POST(req: NextRequest) {
  // Extracting URL search parameters from the request URL
  const { searchParams } = new URL(req.url);
  // Retrieving the 'secret' parameter from the search parameters
  const secret = searchParams.get("secret");

  // Checking if the provided secret matches the environment variable REVALIDATE_SECRET
  if (secret !== process.env.REVALIDATE_SECRET) {
    // If the secret is invalid, return a JSON response with a 401 status code indicating unauthorized access
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  // Parsing the request body as JSON
  const body = await req.json();
  // Extracting the 'path' from the request body
  const path = body.path;

  // Checking if a path is provided in the request body
  if (!path) {
    // If no path is provided, return a JSON response with a 400 status code indicating a bad request
    return NextResponse.json({ message: "Path is required" }, { status: 400 });
  }

  // Attempting to revalidate the provided path
  try {
    revalidatePath(path);
    // If revalidation is successful, return a JSON response indicating the path has been revalidated
    return NextResponse.json({ revalidated: true, path });
  } catch (err) {
    // If an error occurs during revalidation, return a JSON response with a 500 status code indicating an internal server error
    return NextResponse.json({ message: "Error revalidating", error: err }, { status: 500 });
  }
}
