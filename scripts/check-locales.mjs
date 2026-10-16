import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import vm from "node:vm";
import ts from "typescript";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");
const languages = ["de", "en", "fr", "ja", "ko", "zh-Hans", "zh-Hant"];
const newLocales = ["de", "fr", "ko"];
const routes = [
  "", "pricing/", "faq/", "security/", "privacy/", "support/", "compare/",
  "compare/prompt-3/", "compare/servercat/", "compare/termius/", "compare/webssh/",
];
const origin = "https://termind.akinokaede.com";
const routePath = (locale, route) => locale === "en" ? `/${route}` : `/${locale.toLowerCase()}/${route}`;
const placeholders = (text) => [...text.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort();

async function loadExports(path) {
  const compiled = ts.transpileModule(await read(path), { compilerOptions: { module: ts.ModuleKind.CommonJS } });
  const context = { exports: {} };
  vm.runInNewContext(compiled.outputText, context);
  return context.exports;
}

async function sourceFiles(directory) {
  const entries = await readdir(new URL(directory, root), { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const path = `${directory}/${entry.name}`;
    return entry.isDirectory() ? sourceFiles(path) : /\.(astro|ts)$/.test(path) ? [path] : [];
  }));
  return nested.flat();
}

const faqScript = (await read("src/components/FAQPage.astro")).match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert.ok(faqScript, "FAQ deep links need client-side disclosure handling");
const faqCode = ts.transpileModule(faqScript, { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText;
for (const hash of ["", "#session-tools", "#wake-on-lan", "#tailscale", "#unknown"]) {
  const scrolled = [];
  class Answer {
    constructor(id) { this.id = id; this.open = id === "first" || id === "tailscale"; }
    closest() { return true; }
    scrollIntoView() { scrolled.push(this.id); }
  }
  const answers = ["first", "session-tools", "wake-on-lan", "tailscale"].map(id => new Answer(id));
  const listeners = {};
  const window = { location: { hash }, addEventListener: (event, handler) => { listeners[event] = handler; } };
  vm.runInNewContext(faqCode, {
    window,
    HTMLDetailsElement: Answer,
    document: {
      getElementById: id => answers.find(answer => answer.id === id) ?? null,
      querySelectorAll: () => answers,
    },
  });
  const target = answers.find(answer => `#${answer.id}` === hash);
  assert.deepEqual(answers.filter(answer => answer.open).map(answer => answer.id),
    target ? [target.id] : ["first", "tailscale"], `FAQ ${hash}: open the linked answer, not default Tailscale`);
  assert.deepEqual(scrolled, target ? [target.id] : [], `FAQ ${hash}: scroll only to a valid answer`);
  window.location.hash = "#wake-on-lan";
  listeners.hashchange();
  assert.deepEqual(answers.filter(answer => answer.open).map(answer => answer.id), ["wake-on-lan"],
    "FAQ: same-page anchor changes reveal the new answer");
}
console.log("FAQ deep links expand the correct answer on load and hash changes");

const keys = new Set();
for (const file of await sourceFiles("src")) {
  const source = await read(file);
  const calls = /\b(?:c\(\s*|copy\(locale,\s*)("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g;
  for (const match of source.matchAll(calls)) {
    const expression = ts.createSourceFile("key.ts", match[1], ts.ScriptTarget.Latest)
      .statements[0]?.expression;
    assert.ok(expression && (ts.isStringLiteral(expression) || ts.isNoSubstitutionTemplateLiteral(expression)),
      `${file}: translate a stable template before substituting values`);
    keys.add(expression.text);
  }
}
const { englishFAQ } = await loadExports("src/lib/faq.ts");
for (const [question, answer] of englishFAQ) {
  keys.add(question);
  for (const paragraph of Array.isArray(answer) ? answer : [answer]) keys.add(paragraph);
}

for (const locale of newLocales) {
  const dictionary = (await loadExports(`src/lib/${locale}.ts`))[locale];
  for (const key of keys) {
    assert.equal(typeof dictionary[key], "string", `${locale}: missing ${JSON.stringify(key)}`);
    assert.ok(dictionary[key].trim(), `${locale}: empty ${JSON.stringify(key)}`);
    assert.deepEqual(placeholders(dictionary[key]), placeholders(key), `${locale}: placeholders in ${key}`);
  }
  console.log(`${locale}: ${keys.size} copy keys and placeholders OK`);
}

const generatedAssets = new Set();
for (const route of routes) {
  const ogImages = new Set();
  for (const locale of languages) {
    const path = routePath(locale, route);
    const html = await read(`dist${path}index.html`);
    assert.ok(html.includes(`lang="${locale}"`), `${path}: document language`);
    assert.ok(html.includes(`rel="canonical" href="${origin}${path}"`), `${path}: canonical`);
    assert.ok(!/\{(?:annual|lifetime|name|upperName|owner)\}/.test(html), `${path}: unexpanded copy template`);
    if (route === "") {
      const tools = html.match(/<section\b[^>]*\bid="session-tools"[^>]*>([\s\S]*?)<\/section>/)?.[1];
      assert.ok(tools, `${path}: connection tools are visible on the homepage`);
      for (const name of ["Mosh", "Eternal Terminal", "tmux", "Wake-on-LAN", "WoL"]) {
        assert.ok(tools.includes(name), `${path}: homepage explains ${name}`);
      }
      assert.ok(!/\bPro\b|\bfree\b|kostenlos|gratuit|免费|免費|無料|무료/i.test(tools),
        `${path}: homepage connection tools describe capabilities, not plan tiers`);
      assert.ok(!/<a\b/.test(tools), `${path}: homepage connection tools have no setup links`);
      assert.ok(html.indexOf('class="story-row phone-row"') < html.indexOf('id="session-tools"')
        && html.indexOf('id="session-tools"') < html.indexOf('class="story-row reverse unfolded-row"'),
        `${path}: connection tools extend the terminal story before file transfers`);
      if (locale === "en") {
        assert.ok(!/install|MAC address|server software|proxies|Tailscale/i.test(tools),
          `${path}: homepage describes benefits, not setup instructions`);
        assert.ok(html.includes('content="AI-driven remote work with SSH, SFTP, live metrics, and built-in Tailscale.'),
          `${path}: preserve AI-driven positioning in homepage metadata`);
      }
    }
    if (route === "faq/") {
      for (const id of ["session-tools", "wake-on-lan"]) {
        assert.ok(html.includes(`id="${id}"`), `${path}: linked setup guidance for ${id}`);
      }
    }
    if (route.startsWith("compare/") && route !== "compare/") {
      const summary = html.match(/<p\b[^>]*class="connection-summary"[^>]*>([\s\S]*?)<\/p>/)?.[1];
      assert.ok(summary, `${path}: shared Termind connection capabilities`);
      for (const name of ["Mosh", "Eternal Terminal", "tmux", "Wake-on-LAN", "WoL"]) {
        assert.ok(summary.includes(name), `${path}: comparison includes ${name}`);
      }
    }
    if (route === "compare/prompt-3/") {
      for (const id of ["connections", "tmux", "wake-on-lan", "sftp", "monitoring"]) {
        assert.ok(html.includes(`id="${id}"`), `${path}: dedicated ${id} comparison`);
      }
      const connections = html.match(/<li\b[^>]*id="connections"[^>]*>([\s\S]*?)<\/li>/)?.[1];
      assert.ok(connections, `${path}: connection comparison row`);
      const products = [...connections.matchAll(/<dd\b[^>]*>([\s\S]*?)<\/dd>/g)];
      assert.equal(products.length, 2, `${path}: both products have connection details`);
      for (const [, product] of products) {
        assert.ok(product.includes("Mosh") && product.includes("Eternal Terminal"),
          `${path}: each product supports Mosh and Eternal Terminal`);
      }
      assert.ok(html.includes('href="https://help.panic.com/prompt/prompt-startup-command/"'),
        `${path}: primary source for Prompt tmux workflow`);
      if (locale === "en") {
        const wake = html.match(/<li\b[^>]*id="wake-on-lan"[^>]*>([\s\S]*?)<\/li>/)?.[1];
        assert.ok(wake?.includes("Not documented") && !wake.includes("Not supported"),
          `${path}: undocumented WoL is not presented as proven unsupported`);
        assert.ok(html.includes("visionOS, local shell, and more key types."),
          `${path}: retain Prompt-specific reasons to choose it`);
      }
    }
    const picker = [...html.matchAll(/<a\b([^>]*\bdata-locale-option="[^"]+"[^>]*)>/g)];
    assert.deepEqual(picker.map(([, attributes]) => attributes.match(/data-locale-option="([^"]+)"/)[1]),
      languages, `${path}: language picker order`);
    for (const candidate of languages) {
      const target = routePath(candidate, route);
      assert.ok(html.includes(`hreflang="${candidate}" href="${origin}${target}"`),
        `${path}: alternate ${candidate}`);
      const link = picker.find(([, attributes]) => attributes.includes(`data-locale-option="${candidate}"`));
      assert.ok(link?.[1].includes(`href="${target}"`), `${path}: preserve route when switching to ${candidate}`);
    }
    for (const [, attributes] of html.matchAll(/<a\b([^>]+)>/g)) {
      const href = attributes.match(/\bhref="([^"]+)"/)?.[1];
      if (!href?.startsWith("/") || href.startsWith("//")) continue;
      const target = href.split(/[?#]/)[0];
      await readFile(new URL(`dist${target}${target.endsWith("/") ? "index.html" : ""}`, root));
      if (newLocales.includes(locale) && !attributes.includes("data-locale-option=")) {
        assert.ok(target.startsWith(`/${locale}/`), `${path}: English fallback link ${href}`);
      }
    }
    for (const match of html.matchAll(/(?:src|href|content)="(?:https:\/\/termind\.akinokaede\.com)?(\/_astro\/[^"?#]+)"/g)) {
      generatedAssets.add(match[1]);
    }
    const ogImage = html.match(/property="og:image" content="([^"]+)"/)?.[1];
    assert.ok(ogImage, `${path}: social preview`);
    assert.ok(!ogImages.has(ogImage), `${path}: social preview must use its own locale`);
    ogImages.add(ogImage);
  }
}
for (const asset of generatedAssets) await readFile(new URL(`dist${asset}`, root));
for (const route of routes) {
  const html = await read(`dist/zh/${route}index.html`);
  assert.ok(html.includes(`/zh-hans/${route}`), `/zh/${route}: legacy redirect`);
}
console.log(`${languages.length * routes.length} localized pages, ${routes.length} legacy redirects, navigation, metadata and assets OK`);
