import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { buildingId } = await request.json();
    if (!buildingId) {
      return NextResponse.json(
        { error: "Building ID is required" },
        { status: 400 },
      );
    }

    const strapiUrl = process.env.STRAPI_API_URL || "http://localhost:1337";
    const strapiKey = process.env.STRAPI_API_KEY;

    // Get client details from request headers
    const userAgent = request.headers.get("user-agent") || "";
    const referrer = request.headers.get("referer") || "";

    // Resolve client IP (with headers standard in cloud/reverse-proxies)
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "";

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (strapiKey) {
      headers["Authorization"] = `Bearer ${strapiKey}`;
    }

    const response = await fetch(`${strapiUrl}/api/visits`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        data: {
          building: buildingId,
          userAgent,
          referrer,
          ipAddress: ip,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to log visit to Strapi:", errorText);
      return NextResponse.json(
        { error: "Failed to log visit" },
        { status: response.status },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in visit API route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
