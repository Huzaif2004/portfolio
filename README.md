# Ahamed Al Huzaif – Portfolio (v2, minimal)

A static, build-free portfolio: `index.html`, `styles.css`, `script.js`. Open `index.html` in a browser to preview it.

## Customize

- **Text, projects, skills, experience:** edit `index.html`. Each project is one `<article class="card">`; copy one to add another. Set `data-repo` to the repo name and `data-lang` to its language.
- **Colours and fonts:** the variables at the top of `styles.css` (`--acc`, `--bg`, `--fd`, `--fb`, and the dark/light blocks).
- **Hero:** the big name is the `<h1>`; stickers are the `.stickers` list.
- **GitHub account for live stars and languages:** `USER` at the top of `script.js`. If the API is unreachable, the page simply keeps its static text.
- **Contact:** the big email link and social pills in the contact section.
- **Before sharing:** add a canonical URL and `og:url` in the `<head>`, and drop in your own social preview image if you like.

## Deploy (zero config)

- **GitHub Pages:** push these files to a repo named `Huzaif2004.github.io` (or any repo), then Settings → Pages → deploy from the main branch.
- **Netlify:** drag the folder onto app.netlify.com/drop.
- **Vercel:** `vercel` in this folder, accepting the defaults.

## Notes

- Fonts load from Google Fonts, with system fallbacks if offline.
- Animations respect `prefers-reduced-motion`; the board shows its text immediately for those visitors.
