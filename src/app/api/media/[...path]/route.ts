import { NextRequest, NextResponse } from 'next/server';

const STRAPI_API_URL = process.env.STRAPI_API_URL || 'http://localhost:1337';

export async function GET(request: NextRequest) {
  // Extract the path after /api/media
  // Example: request.nextUrl.pathname = "/api/media/uploads/photo.jpg"
  // targetPath becomes "/uploads/photo.jpg"
  const targetPath = request.nextUrl.pathname.replace(/^\/api\/media/, '');
  const targetUrl = `${STRAPI_API_URL}${targetPath}`;

  try {
    const res = await fetch(targetUrl);
    
    if (!res.ok) {
      return NextResponse.json(
        { error: 'Media not found' },
        { status: res.status }
      );
    }

    const contentType = res.headers.get('content-type') || 'application/octet-stream';
    
    const headers = new Headers();
    headers.set('Content-Type', contentType);
    headers.set('Cache-Control', 'public, max-age=86400, stale-while-revalidate=43200');

    // Return the response body directly, creating a transparent proxy
    return new Response(res.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error(`Error proxying media for ${targetUrl}:`, error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
