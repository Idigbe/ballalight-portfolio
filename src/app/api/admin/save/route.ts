import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO; // Format: "owner/repo"
const FILE_PATH = 'src/data/projects.json';

export async function POST(req: NextRequest) {
    // 1. Check Authentication
    const session = cookies().get('admin_session');
    if (!session || session.value !== 'true') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { projects } = await req.json();

        if (!GITHUB_TOKEN || !GITHUB_REPO) {
            // Fallback for local development if token is missing
            // In a real scenario, we want to fail if not in dev
            if (process.env.NODE_ENV === 'development') {
                console.log("Local Dev: Mocking GitHub commit");
                return NextResponse.json({ message: 'Saved successfully (Local Mock)' });
            }
            return NextResponse.json({ error: 'GitHub configuration missing' }, { status: 500 });
        }

        // 2. Get the current file's SHA
        const getFileRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`, {
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
            },
        });

        const fileData = await getFileRes.json();
        const sha = fileData.sha;

        // 3. Update the file on GitHub
        const updateRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: 'Update projects via CMS',
                content: Buffer.from(JSON.stringify({ projects }, null, 2)).toString('base64'),
                sha: sha,
            }),
        });

        if (!updateRes.ok) {
            const errorData = await updateRes.json();
            return NextResponse.json({ error: 'GitHub API error', details: errorData }, { status: 500 });
        }

        return NextResponse.json({ message: 'Published successfully to GitHub' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
