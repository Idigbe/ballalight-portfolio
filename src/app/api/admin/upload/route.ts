import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as any; 
        const slug = formData.get('slug') as string | null;
        const subFolder = (formData.get('subFolder') as string | null) || ''; 

        if (!file || !slug || !file.arrayBuffer) {
            return NextResponse.json({ error: 'Missing valid file or slug' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // Create clean filename with .webp extension
        const baseName = path.parse(file.name.replace(/\s+/g, '-').toLowerCase()).name;
        const filename = `${baseName}.webp`;
        
        const relativeDir = path.join('public/assets/work/projects', slug, subFolder);
        const absoluteDir = path.join(process.cwd(), relativeDir);

        await fs.mkdir(absoluteDir, { recursive: true });

        const filePath = path.join(absoluteDir, filename);
        
        // Optmize and Resize with Sharp
        await sharp(buffer)
            .resize({ 
                width: 2000, 
                withoutEnlargement: true,
                fit: 'inside'
            })
            .webp({ quality: 85 })
            .toFile(filePath);

        const publicPath = `/${path.join('assets/work/projects', slug, subFolder, filename)}`.replace(/\\/g, '/');

        return NextResponse.json({ 
            message: 'File uploaded and optimized successfully',
            path: publicPath 
        });
    } catch (error: any) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
