import OpenCC from "opencc-js";

export type SiteLocale = "en" | "zh-Hans" | "zh-Hant";

export const siteOrigin = "https://termind.akinokaede.com";

const toTaiwanTraditional = OpenCC.Converter({ from: "cn", to: "twp" });
const taiwanTerms: Array<[string, string]> = [
  ["隱私郵箱", "隱私聯絡信箱"],
  ["郵箱", "電子郵件信箱"],
  ["服務器", "伺服器"],
  ["後臺服務", "後端服務"],
  ["後臺處理程序", "背景處理程序"],
  ["後臺程序", "背景程序"],
  ["守護處理程序", "常駐程式"],
  ["處理處理程序", "處理程序"],
  ["網絡卡", "網路介面"],
  ["網路介面卡", "網路介面"],
  ["全域性", "全域"],
  ["引數", "參數"],
  ["鑰匙串專案", "鑰匙串項目"],
  ["工作臺", "工作台"],
  ["平臺", "平台"],
  ["自定義", "自訂"],
  ["許可權", "權限"],
  ["運營", "營運"],
  ["賬戶", "帳號"],
  ["賬號", "帳號"],
  ["訪問", "存取"],
  ["配置", "設定"],
  ["標識", "識別碼"],
  ["主機名", "主機名稱"],
  ["端點地址", "端點位址"],
  ["分組", "群組"],
  ["點選", "點按"],
  ["文本", "文字"],
  ["推介促銷", "促銷"],
  ["審批模式", "核准模式"],
  ["迴環地址", "Loopback 位址"],
  ["迴環", "Loopback"],
  ["地址", "位址"],
  ["社區", "社群"],
  ["私聊", "私訊"],
  ["默認", "預設"],
  ["回車", "Return 鍵"],
  ["暴露", "提供"],
  ["通過", "透過"],
  ["應用", "應用程式"],
  ["身份", "身分"],
  ["當前", "目前"],
];

function taiwanTraditional(text: string): string {
  return taiwanTerms.reduce((value, [source, target]) => value.replaceAll(source, target), toTaiwanTraditional(text));
}

export function copy(locale: SiteLocale, english: string, simplified: string): string {
  if (locale === "en") return english;
  return locale === "zh-Hant" ? taiwanTraditional(simplified) : simplified;
}

export function localizedPath(locale: SiteLocale, pagePath = "/"): string {
  const path = pagePath.startsWith("/") ? pagePath : `/${pagePath}`;
  if (locale === "en") return path;
  const prefix = locale === "zh-Hans" ? "/zh-hans" : "/zh-hant";
  return path === "/" ? `${prefix}/` : `${prefix}${path}`;
}

export function assetLocale(locale: SiteLocale): "en" | "zh-hans" | "zh-hant" {
  if (locale === "zh-Hans") return "zh-hans";
  if (locale === "zh-Hant") return "zh-hant";
  return "en";
}

export const supportedLocales: SiteLocale[] = ["en", "zh-Hans", "zh-Hant"];
