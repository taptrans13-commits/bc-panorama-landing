import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const siteUrl = "https://taptrans13-commits.github.io/bc-panorama-landing";
const distDir = new URL("../dist/", import.meta.url);
const distPath = fileURLToPath(distDir);
const lastmod = "2026-06-25";

const variants = {
  "variant-2": {
    title: "БЦ Панорама - бухгалтерская компания в Перми",
    description:
      "Локальный вариант лендинга БЦ Панорама: бухгалтерское сопровождение, отчетность, налоги, зарплата и кадры для ИП и ООО в Перми.",
  },
  "variant-3": {
    title: "БЦ Панорама - учет, отчеты и налоги под контролем",
    description:
      "Деловой вариант лендинга БЦ Панорама: учет, первичка, сроки отчетности, консультации и бухгалтерское сопровождение бизнеса в Перми.",
  },
};

function replaceTag(html, pattern, replacement) {
  if (pattern.test(html)) {
    return html.replace(pattern, replacement);
  }

  return html.replace("</head>", `    ${replacement}\n  </head>`);
}

function pageHtml(html, slug, meta) {
  const url = `${siteUrl}/${slug}/`;
  let next = html;

  next = replaceTag(next, /<title>[\s\S]*?<\/title>/, `<title>${meta.title}</title>`);
  next = replaceTag(
    next,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${meta.description}" />`,
  );
  next = replaceTag(
    next,
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${url}" />`,
  );
  next = replaceTag(
    next,
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${meta.title}" />`,
  );
  next = replaceTag(
    next,
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${meta.description}" />`,
  );
  next = replaceTag(
    next,
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${url}" />`,
  );
  next = replaceTag(
    next,
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:title" content="${meta.title}" />`,
  );
  next = replaceTag(
    next,
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${meta.description}" />`,
  );

  return next;
}

const indexPath = join(distPath, "index.html");
const indexHtml = await readFile(indexPath, "utf8");
const defaultHtml = pageHtml(indexHtml, "variant-2", variants["variant-2"]);

await writeFile(indexPath, defaultHtml);
await writeFile(join(distPath, "404.html"), defaultHtml);

for (const [slug, meta] of Object.entries(variants)) {
  const dir = join(distPath, slug);

  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, "index.html"), pageHtml(indexHtml, slug, meta));
}

await writeFile(
  join(distPath, "robots.txt"),
  `User-agent: *
Allow: /bc-panorama-landing/
Sitemap: ${siteUrl}/sitemap.xml
`,
);

await writeFile(
  join(distPath, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/variant-2/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${siteUrl}/variant-3/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
`,
);
