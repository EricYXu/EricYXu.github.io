# Writing

A Markdown-driven writing page served from `/writing/` on GitHub Pages.

## Publishing a piece

1. Add a file to `writing/posts/`, e.g. `on-reading-slowly.md`:

   ```
   ---
   title: On Reading Slowly
   subtitle: Notes from a winter      (optional)
   date: 2026-11-02
   draft: true                        (optional; keeps it out of the index)
   ---

   Body in ordinary Markdown.
   ```

2. Commit and push. The GitHub Action in `.github/workflows/writing-index.yml`
   rebuilds `posts.json` and commits it; the piece appears at
   `/writing/?p=on-reading-slowly` and in the contents list.

If you'd rather not use the Action, run `python3 writing/build_index.py` before pushing.

## Files

- `index.html`, `writing.css`, `writing.js` — the page. Markdown is rendered in the browser by marked (loaded from cdnjs).
- `build_index.py` — scans `posts/*.md` and writes `posts.json`.
- `posts/hello.md` — a sample piece; delete it when you have a real one.

## Linking from the homepage

Add this to `.social-links-header` in the root `index.html`:

```html
<a href="writing/"><i class="fas fa-feather-alt"></i>Writing</a>
```
