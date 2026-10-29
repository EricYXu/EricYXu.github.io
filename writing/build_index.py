#!/usr/bin/env python3
"""Scan writing/posts/*.md and write writing/posts.json.

Each post may start with front matter:

    ---
    title: On Reading Slowly
    subtitle: Notes from a winter   (optional)
    date: 2026-10-29
    draft: true                     (optional; hides the post)
    ---

Missing title falls back to the first "# Heading", then the filename.
Missing date falls back to the file's first git commit date, then today.
"""
import json, re, subprocess, datetime
from pathlib import Path

ROOT = Path(__file__).parent
POSTS = ROOT / 'posts'
FM = re.compile(r'^---\s*\n(.*?)\n---\s*\n?', re.S)

def git_date(path):
    try:
        out = subprocess.check_output(
            ['git', 'log', '--diff-filter=A', '--follow', '--format=%as', '--', str(path)],
            cwd=ROOT, text=True, stderr=subprocess.DEVNULL).strip().splitlines()
        return out[-1] if out else None
    except Exception:
        return None

posts = []
for md in sorted(POSTS.glob('*.md')):
    text = md.read_text(encoding='utf-8')
    meta = {}
    m = FM.match(text)
    body = text
    if m:
        for line in m.group(1).splitlines():
            if ':' in line:
                k, v = line.split(':', 1)
                meta[k.strip()] = v.strip().strip('"\'')
        body = text[m.end():]
    h1 = re.search(r'^#\s+(.+)$', body, re.M)
    title = meta.get('title') or (h1.group(1).strip() if h1 else md.stem.replace('-', ' ').title())
    date = meta.get('date') or git_date(md) or datetime.date.today().isoformat()
    entry = {'slug': md.stem, 'file': md.name, 'title': title, 'date': date}
    if meta.get('subtitle'):
        entry['subtitle'] = meta['subtitle']
    if meta.get('draft', '').lower() in ('true', 'yes', '1'):
        entry['draft'] = True
    posts.append(entry)

posts.sort(key=lambda p: p['date'], reverse=True)
(ROOT / 'posts.json').write_text(json.dumps({'posts': posts}, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
print(f'Indexed {len(posts)} post(s).')
