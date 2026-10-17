import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function getRepoRoot() {
  const parent = path.resolve(process.cwd(), '..');
  if (fs.existsSync(path.join(parent, 'CLAUDE.md'))) {
    return parent;
  }
  return process.cwd();
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || 'cv';
    const root = getRepoRoot();

    let filePath = '';
    if (type === 'cover') {
      filePath = path.join(root, 'cover_letters', 'cover_example.tex');
    } else {
      filePath = path.join(root, 'cv', 'main_example.tex');
    }

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: `Template ${type} not found at ${filePath}` }, { status: 404 });
    }

    const code = fs.readFileSync(filePath, 'utf8');

    return NextResponse.json({
      type,
      filename: path.basename(filePath),
      code,
      lines: code.split('\n').length
    });
  } catch (error: unknown) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
