import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const slug = params.slug.join('/')
  const imagePath = path.join(process.cwd(), 'content/blog', slug)

  console.log('Requested image path:', imagePath) // Add this line for debugging

  try {
    const imageBuffer = fs.readFileSync(imagePath)
    const response = new NextResponse(imageBuffer)
    
    // Determine content type based on file extension
    const ext = path.extname(imagePath).toLowerCase()
    const contentType = ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' 
                      : ext === '.png' ? 'image/png'
                      : ext === '.gif' ? 'image/gif'
                      : 'application/octet-stream'
    
    response.headers.set('Content-Type', contentType)
    return response
  } catch (error) {
    console.error('Error serving image:', error) // Add this line for debugging
    return new NextResponse('Image not found', { status: 404 })
  }
}