import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs/promises';
import path from 'path';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO; 
const FILE_PATH = 'src/data/projects.json';

export async function POST(req: NextRequest) {
    try {
        const { projects, action } = await req.json(); // action can be 'save' or 'publish'

        // 1. ALWAYS Save Locally First (for Live Preview)
        const absolutePath = path.join(process.cwd(), FILE_PATH);
        await fs.writeFile(absolutePath, JSON.stringify({ projects }, null, 2));

        if (action === 'save') {
            return NextResponse.json({ message: 'Draft saved locally' });
        }

        // 2. If 'publish', proceed to GitHub
        if (action === 'publish') {
            if (!GITHUB_TOKEN || !GITHUB_REPO) {
                return NextResponse.json({ 
                    error: 'GitHub configuration missing. Local changes saved, but could not publish.',
                    details: 'Ensure GITHUB_TOKEN and GITHUB_REPO are set in .env.local'
                }, { status: 500 });
            }

            // Get SHA for GitHub Update
            const getFileRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`, {
                headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
            });

            if (!getFileRes.ok) {
                return NextResponse.json({ error: 'Failed to fetch current SHA from GitHub' }, { status: 500 });
            }

            const fileData = await getFileRes.json();
            const sha = fileData.sha;

            // Commit to GitHub
            const updateRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${GITHUB_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: 'Publish from Portfolio CMS',
                    content: Buffer.from(JSON.stringify({ projects }, null, 2)).toString('base64'),
                    sha: sha,
                }),
            });

            if (!updateRes.ok) {
                const errorData = await updateRes.json();
                return NextResponse.json({ error: 'GitHub deployment failed', details: errorData }, { status: 500 });
            }

            return NextResponse.json({ message: 'Successfully published to GitHub' });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

    } catch (error: any) {
        console.error("Save error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
