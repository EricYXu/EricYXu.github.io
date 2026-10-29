// Renders the index from posts.json, or a single post when ?p=<slug> is set.
// posts.json is regenerated automatically by .github/workflows/writing-index.yml
// whenever a Markdown file is added to writing/posts/.

const app = document.getElementById('app');

const fmtDate = iso => {
  const d = new Date(iso + 'T00:00:00');
  return isNaN(d) ? iso : d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// Strip YAML-style front matter (--- ... ---) and return { meta, body }.
function splitFrontMatter(text) {
  const m = text.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  if (!m) return { meta: {}, body: text };
  const meta = {};
  m[1].split('\n').forEach(line => {
    const i = line.indexOf(':');
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, '');
  });
  return { meta, body: text.slice(m[0].length) };
}

async function loadIndex() {
  const res = await fetch('posts.json', { cache: 'no-cache' });
  if (!res.ok) throw new Error(`posts.json: ${res.status}`);
  const posts = (await res.json()).posts.filter(p => !p.draft);
  posts.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  return posts;
}

function renderIndex(posts) {
  document.title = 'Writing — Eric Xu';
  if (!posts.length) {
    app.innerHTML = '<p class="status">Nothing here yet. Add a Markdown file to <code>writing/posts/</code> to publish your first piece.</p>';
    return;
  }
  app.innerHTML = `<ol class="contents">${posts.map(p => `
    <li>
      <a class="entry-title" href="?p=${encodeURIComponent(p.slug)}">${esc(p.title)}</a>
      <span class="leader" aria-hidden="true"></span>
      <time class="entry-date" datetime="${esc(p.date || '')}">${esc(fmtDate(p.date || ''))}</time>
      ${p.subtitle ? `<p class="entry-sub">${esc(p.subtitle)}</p>` : ''}
    </li>`).join('')}</ol>`;
}

async function renderPost(slug, posts) {
  const entry = posts.find(p => p.slug === slug);
  const file = entry ? entry.file : `${slug}.md`;
  const res = await fetch(`posts/${file}`, { cache: 'no-cache' });
  if (!res.ok) {
    app.innerHTML = `<p class="post-nav"><a href="./">Contents</a></p><p class="status">That piece could not be found.</p>`;
    return;
  }
  const { meta, body } = splitFrontMatter(await res.text());
  const title = meta.title || (entry && entry.title) || slug;
  const date = meta.date || (entry && entry.date) || '';
  const subtitle = meta.subtitle || (entry && entry.subtitle) || '';
  document.title = `${title} — Eric Xu`;

  app.innerHTML = `
    <p class="post-nav"><a href="./">Contents</a></p>
    <header class="post-head">
      <h1>${esc(title)}</h1>
      ${subtitle ? `<p class="subtitle">${esc(subtitle)}</p>` : ''}
      ${date ? `<time datetime="${esc(date)}">${esc(fmtDate(date))}</time>` : ''}
    </header>
    <article class="post-body">${marked.parse(body)}</article>`;
}

(async () => {
  try {
    const posts = await loadIndex();
    const slug = new URLSearchParams(location.search).get('p');
    if (slug) await renderPost(slug, posts); else renderIndex(posts);
  } catch (err) {
    console.error(err);
    const msg = typeof marked === 'undefined'
      ? 'The Markdown renderer did not load. Check your connection and reload.'
      : 'The index could not be loaded. Check that <code>writing/posts.json</code> exists.';
    app.innerHTML = `<p class="status">${msg}</p>`;
  }
})();
