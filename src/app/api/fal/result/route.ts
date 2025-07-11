import { NextResponse } from "next/server";
import { fal } from "@fal-ai/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requestId = searchParams.get("requestId");
  const selectedApiEndpoint = searchParams.get("selectedApiEndpoint");

  if (!requestId) {
    return NextResponse.json(
      { error: "requestId is required" },
      { status: 400 },
    );
  }

  if (!selectedApiEndpoint) {
    return NextResponse.json(
      { error: "selectedApiEndpoint is required" },
      { status: 400 },
    );
  }

  try {
    const result = await fal.queue.result(selectedApiEndpoint, {
      requestId,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching result:", error);
    return NextResponse.json(
      { error: "Failed to fetch result" },
      { status: 500 },
    );
  }
}
