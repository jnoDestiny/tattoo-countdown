import { NextResponse } from 'next/server'
import { readdir, stat } from 'fs/promises'
import { join } from 'path'

export async function GET() {
  try {
    const imagesDir = join(process.cwd(), 'public', 'images')
    
    // Check if directory exists
    try {
      await stat(imagesDir)
    } catch {
      console.log('Images directory does not exist')
      return NextResponse.json([])
    }
    
    const files = await readdir(imagesDir)
    console.log('All files in directory:', files)
    
    // Filter for image files by extension
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.svg']
    const imageFiles = files.filter(file => {
      const ext = file.toLowerCase().substring(file.lastIndexOf('.'))
      return imageExtensions.includes(ext)
    })
    
    console.log('Image files found:', imageFiles)
    
    // Convert to full URLs
    const imageUrls = imageFiles.map(file => `/images/${file}`)
    
    return NextResponse.json(imageUrls)
  } catch (error) {
    console.error('Error reading images directory:', error)
    return NextResponse.json([])
  }
} 