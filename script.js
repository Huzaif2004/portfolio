/* Vanilla JS, no dependencies. */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const USER = 'Huzaif2004'; // GitHub account used for live stars and language

  /* Theme toggle: dark by default, remembered when storage is available */
  const root = document.documentElement, btn = $('#theme');
  const sync = () => {
    const light = root.dataset.theme === 'light';
    btn.setAttribute('aria-pressed', light);
    btn.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
  };
  btn.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
    sync();
  });
  sync();

  /* Skill belts: duplicate each row so the loop is seamless (copies hidden from screen readers) */
  if (!reduced) $$('.belt').forEach(b => {
    $$('li', b).forEach(li => {
      const c = li.cloneNode(true);
      c.setAttribute('aria-hidden', 'true');
      b.append(c);
    });
  });

  /* Cursor blob + magnetic pills (mouse only) */
  if (matchMedia('(hover: hover)').matches && !reduced) {
    const cur = $('.cur');
    addEventListener('pointermove', e => {
      cur.classList.add('on');
      cur.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
    });
    document.addEventListener('pointerover', e => cur.classList.toggle('big', !!e.target.closest('a,button')));
    $$('.mag').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px,${(e.clientY - r.top - r.height / 2) * .35}px)`;
      });
      el.addEventListener('pointerleave', () => (el.style.transform = ''));
    });
  }

  /* Live GitHub data: language and stars under each project. Fails quietly. */
  fetch(`https://api.github.com/users/${USER}/repos?per_page=100`)
    .then(r => (r.ok ? r.json() : Promise.reject()))
    .then(repos => $$('.proj[data-repo]').forEach(a => {
      const repo = repos.find(r => r.name === a.dataset.repo);
      if (!repo) return;
      const bits = [repo.language, repo.stargazers_count > 0 && `${repo.stargazers_count} stars`].filter(Boolean);
      $('.meta', a).textContent = bits.join(', ');
    }))
    .catch(() => {});
})();
