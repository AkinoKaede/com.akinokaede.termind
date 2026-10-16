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
const sessionTools = ["Herdr", "tmux", "Zellij", "zmx"];
function assertSessionTools(text, location) {
  const names = text.match(/\b(?:Herdr|tmux|Zellij|zmx)\b/g) ?? [];
  assert.deepEqual(names, sessionTools, `${location}: list all Session Persistence tools in alphabetical order`);
}
const proFeatureTitles = {
  en: ["Unlimited hosts", "iCloud sync", "Built-in Tailscale", "Multi-connection SFTP", "Multi-connection port forwarding"],
  "zh-Hans": ["无限主机", "iCloud 同步", "内置 Tailscale", "多连接 SFTP", "多连接端口转发"],
  "zh-Hant": ["無限主機", "iCloud 同步", "內建 Tailscale", "多連線 SFTP", "多連線埠轉發"],
};
const prioritySupportTitles = {
  en: "Priority support",
  "zh-Hans": "优先支持",
  "zh-Hant": "優先支援",
};

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
const proAnswer = englishFAQ.find(([question]) => question === "What is free, and what does Pro add?")?.[1]?.[1];
assert.ok(proAnswer, "FAQ: Pro feature overview");
const proTopics = ["unlimited hosts", "iCloud sync", "Tailscale", "SFTP", "port forwarding"];
let previousTopic = -1;
for (const topic of proTopics) {
  const position = proAnswer.indexOf(topic);
  assert.ok(position > previousTopic, `FAQ: list ${topic} in the same category order as pricing`);
  previousTopic = position;
}
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
for (const locale of ["de", "fr", "ja", "ko"]) {
  const exports = await loadExports(`src/lib/${locale}.ts`);
  const dictionary = exports[locale === "ja" ? "japanese" : locale];
  proFeatureTitles[locale] = proFeatureTitles.en.map(key => dictionary[key]);
  prioritySupportTitles[locale] = dictionary["Priority support"];
}

const generatedAssets = new Set();
const freeFeatureTitles = {
  en: ["3 hosts", "AI Assistant, Command Generator, and MCP",
    "Server monitoring", "Wake-on-LAN"],
  "zh-Hans": ["3 个主机", "AI 助手、命令生成器与 MCP", "服务器监控", "Wake-on-LAN"],
  "zh-Hant": ["3 個主機", "AI 助手、命令生成器與 MCP", "伺服器監控", "Wake-on-LAN"],
};
for (const locale of ["de", "fr", "ja", "ko"]) {
  const exports = await loadExports(`src/lib/${locale}.ts`);
  const dictionary = exports[locale === "ja" ? "japanese" : locale];
  freeFeatureTitles[locale] = freeFeatureTitles.en.map(key => dictionary[key]);
}
for (const route of routes) {
  const ogImages = new Set();
  for (const locale of languages) {
    const path = routePath(locale, route);
    const html = await read(`dist${path}index.html`);
    if (["zh-Hans", "zh-Hant"].includes(locale)
      && ["", "pricing/", "faq/", "privacy/", ...routes.filter(route => route.startsWith("compare/") && route !== "compare/")].includes(route)) {
      const lifetimeName = locale === "zh-Hans" ? "终身版" : "終身版";
      assert.ok(html.includes(lifetimeName), `${path}: use the localized Lifetime name ${lifetimeName}`);
      if (!route.startsWith("compare/")) {
        assert.ok(!html.includes("永久版"), `${path}: remove Termind's old Lifetime name`);
      }
    }
    if (route !== "pricing/") {
      assert.ok(!html.includes(prioritySupportTitles[locale]), `${path}: priority support belongs only on pricing`);
    }
    assert.ok(html.includes(`lang="${locale}"`), `${path}: document language`);
    assert.ok(html.includes(`rel="canonical" href="${origin}${path}"`), `${path}: canonical`);
    assert.ok(!/\{(?:annual|lifetime|name|upperName|owner)\}/.test(html), `${path}: unexpanded copy template`);
    assert.ok(!/Wake-on-LAN\s*[(（]WoL[)）]/.test(html),
      `${path}: use Wake-on-LAN or WoL, not the full name followed by its abbreviation`);
    const footer = html.match(/<footer\b[^>]*class="site-footer"[^>]*>([\s\S]*?)<\/footer>/)?.[1];
    assert.ok(footer, `${path}: shared site footer`);
    for (const group of ["product", "resources", "community"]) {
      assert.ok(footer.includes(`aria-labelledby="footer-${group}"`) && footer.includes(`id="footer-${group}"`),
        `${path}: labeled ${group} footer navigation`);
    }
    for (const destination of ["", "pricing/", "compare/", "faq/", "security/", "privacy/", "support/"]) {
      assert.ok(footer.includes(`href="${routePath(locale, destination)}"`),
        `${path}: footer links to the localized ${destination || "homepage"}`);
    }
    for (const [label, href] of [
      ["Discord", "https://discord.gg/3dzmRAUA36"],
      ["Telegram", "https://t.me/termind_updates"],
    ]) {
      const link = [...footer.matchAll(/<a\b([^>]+)>([\s\S]*?)<\/a>/g)]
        .find(([, attributes]) => attributes.includes(`href="${href}"`));
      assert.ok(link?.[2].includes(label), `${path}: visible ${label} community link uses the supplied URL`);
    }
    const footerIntro = footer.match(/<div\b[^>]*class="footer-intro"[^>]*>([\s\S]*?)<\/div>/)?.[1];
    assert.ok(footerIntro?.includes("© 2026 Termind Team"), `${path}: copyright belongs below the brand introduction`);
    assert.ok(!footer.includes("apps.apple.com") && !footer.includes("footer-heart") && !footer.includes("footer-signoff"),
      `${path}: footer has no download button or made-with-love signoff`);
    if (route === "") {
      const subtitle = html.match(/<p\b[^>]*class="lede"[^>]*>([\s\S]*?)<\/p>/)?.[1];
      const footerDescription = footer.match(/<p\b[^>]*class="footer-description"[^>]*>([\s\S]*?)<\/p>/)?.[1];
      assert.ok(subtitle, `${path}: homepage subtitle`);
      assert.equal(footerDescription, subtitle, `${path}: footer introduction matches the homepage subtitle`);
      const tools = html.match(/<section\b[^>]*\bid="session-tools"[^>]*>([\s\S]*?)<\/section>/)?.[1];
      assert.ok(tools, `${path}: connection tools are visible on the homepage`);
      for (const name of ["Mosh", "Eternal Terminal", "Wake-on-LAN"]) {
        assert.ok(tools.includes(name), `${path}: homepage explains ${name}`);
      }
      assertSessionTools(tools, `${path}: homepage`);
      assert.ok(!/\bPro\b|\bfree\b|kostenlos|gratuit|免费|免費|無料|무료/i.test(tools),
        `${path}: homepage connection tools describe capabilities, not plan tiers`);
      assert.ok(!/<a\b/.test(tools), `${path}: homepage connection tools have no setup links`);
      assert.ok(html.indexOf('class="story-row phone-row"') < html.indexOf('id="session-tools"')
        && html.indexOf('id="session-tools"') < html.indexOf('class="story-row reverse unfolded-row"'),
        `${path}: connection tools extend the terminal story before file transfers`);
      if (locale === "en") {
        assert.ok(/<h3\b[^>]*>Session Persistence<\/h3>/.test(tools),
          `${path}: use the Session Persistence feature name`);
        assert.ok(!/install|MAC address|server software|proxies|Tailscale/i.test(tools),
          `${path}: homepage describes benefits, not setup instructions`);
        assert.ok(html.includes('content="AI-driven remote work with SSH, SFTP, live metrics, and built-in Tailscale.'),
          `${path}: preserve AI-driven positioning in homepage metadata`);
      }
    }
    if (route === "pricing/") {
      assert.ok(!html.includes('class="tailscale-note"'), `${path}: keep Tailscale setup guidance out of pricing notes`);
      const pro = html.match(/<section\b[^>]*\bid="pro-features"[^>]*>([\s\S]*?)<\/section>/)?.[1];
      assert.ok(pro, `${path}: Pro feature list`);
      const headings = [...pro.matchAll(/<h3\b[^>]*>([^<]+)<\/h3>/g)].map(match => match[1]);
      assert.deepEqual(headings, proFeatureTitles[locale],
        `${path}: Pro contains unlimited hosts, iCloud sync, Tailscale, and both multi-connection features`);
      const free = html.match(/<div\b[^>]*class="plan free-plan"[^>]*>([\s\S]*?)<\/div>/)?.[1];
      assert.ok(free, `${path}: free plan`);
      assertSessionTools(free, `${path}: free Session Persistence`);
      for (const title of freeFeatureTitles[locale]) {
        assert.ok(free.includes(title), `${path}: free plan contains ${title}`);
      }
      assert.ok(!free.includes("iCloud"), `${path}: iCloud sync remains a Pro benefit`);
      assert.ok(!free.includes(prioritySupportTitles[locale]), `${path}: priority support is not in the free plan`);
      const paidPlans = [...html.matchAll(/<div\b[^>]*class="plan(?: lifetime-plan)?"[^>]*>([\s\S]*?)<\/div>/g)];
      assert.equal(paidPlans.length, 2, `${path}: annual and lifetime Pro cards`);
      if (["zh-Hans", "zh-Hant"].includes(locale)) {
        const lifetimeName = locale === "zh-Hans" ? "终身版" : "終身版";
        assert.ok(new RegExp(`<h2\\b[^>]*>${lifetimeName}<\\/h2>`).test(paidPlans[1][1]),
          `${path}: the Lifetime plan heading uses ${lifetimeName}`);
      }
      for (const [, plan] of paidPlans) {
        assert.ok(plan.includes(prioritySupportTitles[locale]), `${path}: both Pro plans include priority support`);
      }
      assert.ok(!/Unlimited (?:connections|transfers)/i.test(html),
        `${path}: only the host count is unlimited, not connection concurrency`);
      if (locale === "en") {
        assert.ok(!/card limit|locked for new|retained but locked|above the limit/.test(html),
          `${path}: keep plan copy focused on benefits, not implementation rules`);
        assert.ok(html.includes("Model provider usage is billed separately"),
          `${path}: free AI does not include provider usage`);
      }
    }
    if (route === "faq/") {
      for (const id of ["session-tools", "wake-on-lan"]) {
        assert.ok(html.includes(`id="${id}"`), `${path}: linked setup guidance for ${id}`);
      }
      const sessions = html.match(/<details\b[^>]*\bid="session-tools"[^>]*>([\s\S]*?)<\/details>/)?.[1];
      assert.ok(sessions, `${path}: Session Persistence setup guidance`);
      assertSessionTools(sessions, `${path}: FAQ`);
    }
    if (route === "compare/") {
      const note = html.match(/<p\b[^>]*class="connection-note"[^>]*>([\s\S]*?)<\/p>/)?.[1];
      assert.ok(note, `${path}: comparison overview connection capabilities`);
      assertSessionTools(note, `${path}: comparison overview`);
    }
    if (route.startsWith("compare/")) {
      const visibleCopy = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "")
        .replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, "").replace(/<[^>]*>/g, " ");
      assert.ok(!/\bfree\b|免费|免費|無料|무료|kostenlos|gratuit/i.test(visibleCopy),
        `${path}: describe capabilities without redundant free labels`);
    }
    if (route.startsWith("compare/") && route !== "compare/") {
      const summary = html.match(/<p\b[^>]*class="connection-summary"[^>]*>([\s\S]*?)<\/p>/)?.[1];
      assert.ok(summary, `${path}: shared Termind connection capabilities`);
      for (const name of ["Mosh", "Eternal Terminal", "Wake-on-LAN"]) {
        assert.ok(summary.includes(name), `${path}: comparison includes ${name}`);
      }
      assertSessionTools(summary, `${path}: comparison`);
      for (const id of ["ai", "external-agents", "monitoring", "sync"]) {
        const feature = html.match(new RegExp(`<li\\b[^>]*id="${id}"[^>]*>([\\s\\S]*?)<\\/li>`))?.[1];
        if (!feature) continue;
        const title = feature.match(/<dd\b[^>]*>\s*<strong\b[^>]*>([^<]+)<\/strong>/)?.[1];
        assert.ok(title, `${path}: ${id} has a concise Termind comparison value`);
        assert.equal(/\bPro\b/.test(title), id === "sync",
          `${path}: iCloud remains Pro; AI, MCP, and monitoring do not`);
        if (id === "monitoring" && locale === "en") {
          assert.equal(title, "Live system metrics", `${path}: describe monitoring without extra plan claims`);
        }
      }
      const wake = html.match(/<li\b[^>]*id="wake-on-lan"[^>]*>([\s\S]*?)<\/li>/)?.[1];
      assert.ok(wake, `${path}: every competitor has a Wake-on-LAN comparison`);
      const products = [...wake.matchAll(/<dd\b[^>]*>([\s\S]*?)<\/dd>/g)];
      assert.equal(products.length, 2, `${path}: both products have Wake-on-LAN details`);
      assert.ok(!/\bPro\b/.test(products[0][1]), `${path}: Termind Wake-on-LAN is not a Pro feature`);
      if (locale === "en") {
        assert.ok(products[0][1].includes("Manual and automatic wake"),
          `${path}: describe both Wake modes without a plan suffix`);
        assert.ok(products[1][1].includes("Not supported") && products[1][1].includes("No built-in Wake-on-LAN."),
          `${path}: maintainer-confirmed absence of competitor Wake-on-LAN`);
        assert.ok(summary.includes("only Termind includes Wake-on-LAN"),
          `${path}: scope Wake-on-LAN exclusivity to the apps compared here`);
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
      const persistence = html.match(/<li\b[^>]*id="tmux"[^>]*>([\s\S]*?)<\/li>/)?.[1];
      const termind = persistence?.match(/<dd\b[^>]*>([\s\S]*?)<\/dd>/)?.[1];
      assert.ok(termind, `${path}: preserve the legacy tmux anchor for Session Persistence`);
      assertSessionTools(termind, `${path}: Termind Session Persistence comparison`);
      if (locale === "en") {
        assert.ok(/<h3\b[^>]*>Session Persistence<\/h3>/.test(persistence),
          `${path}: Session Persistence comparison label`);
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
