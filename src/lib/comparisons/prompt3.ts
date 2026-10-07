import { copy, type SiteLocale } from "../i18n";
import { termindPricing } from "../pricing";
import type { CompetitorContent } from "./types";

// Checked 2026-10-03 against Prompt 3.5.2:
// https://panic.com/prompt/
// https://help.panic.com/prompt/prompt-yubikey/
// https://help.panic.com/releasenotes/prompt3 (3.0.11 confirms no FIDO2 over USB-C on iOS/iPadOS)
// https://help.panic.com/prompt/purchase-faq/ (trial and subscription terms)
// US App Store: https://apps.apple.com/us/app/prompt-3/id1594420480?l=en ($9.99/year or $49.99 one-time)
// https://help.panic.com/prompt/prompt-omniview/
// https://help.panic.com/prompt/prompt-vpn-on-demand/ (uses a configured OS VPN)
// The maintainer confirmed that Prompt 3 has no built-in AI features or MCP server.
export function getPrompt3(locale: SiteLocale): CompetitorContent {
  const c = (english: string, simplified: string, japaneseText?: string) => copy(locale, english, simplified, japaneseText);
  return {
    name: "Prompt 3",
    owner: "Panic Inc.",
    attribution: c("Prompt is a registered trademark of Panic Inc.", "Prompt 是 Panic Inc. 的注册商标。"),
    description: c("Compare Termind and Prompt 3: SSH and Mosh, AI, FIDO2 hardware keys, port forwarding, Tailscale, sync, and pricing.", "对比 Termind 与 Prompt 3 的 SSH 与 Mosh、AI、FIDO2 硬件密钥、端口转发、Tailscale、同步及价格。"),
    summary: c(`Termind combines SFTP, an AI Assistant, and Tailscale, with lifetime Pro at ${termindPricing.lifetime}. Prompt 3 supports Mosh and Eternal Terminal, with a $49.99 one-time purchase.`, `Termind 提供 SFTP、AI 助手与内置 Tailscale，Pro 永久版 ${termindPricing.lifetime}。Prompt 3 支持 Mosh 与 Eternal Terminal，一次购买 $49.99。`, `Termind は SFTP、AI アシスタント、Tailscale を搭載し、Pro は ${termindPricing.lifetime} の買い切りで利用できます。Prompt 3 は Mosh と Eternal Terminal に対応し、買い切り価格は $49.99 です。`),
    termindRecommendationTitle: c("Lower purchase price, FIDO2 creation on iOS.", "买断价更低，iOS 也能创建密钥。"),
    termindRecommendation: c(`Termind Pro is ${termindPricing.lifetime} lifetime or ${termindPricing.annual}/year; Prompt 3 is $49.99 one-time or $9.99/year. Termind also creates ECDSA-SK keys on iOS and offers an AI Assistant and built-in Tailscale with Pro.`, `Termind Pro 为 ${termindPricing.lifetime} 永久版或 ${termindPricing.annual}/年；Prompt 3 为 $49.99 一次购买或 $9.99/年。Termind 还可在 iOS 创建 ECDSA-SK 密钥，Pro 提供 AI 助手与内置 Tailscale。`, `Termind Pro は買い切り ${termindPricing.lifetime} または年額 ${termindPricing.annual}、Prompt 3 は買い切り $49.99 または年額 $9.99 です。Termind は iOS での ECDSA-SK 鍵の作成にも対応し、Pro では AI アシスタントと内蔵 Tailscale を利用できます。`),
    recommendationTitle: c("Mosh and Eternal Terminal.", "Mosh 与 Eternal Terminal。"),
    recommendation: c("A fit for changing networks, YubiKey PIV or Ed25519-SK authentication, and terminal access on Apple Vision Pro.", "适合网络频繁变化、使用 YubiKey PIV 或 Ed25519-SK 认证，或需要 Apple Vision Pro 终端的场景。"),
    features: {
      connections: {
        title: "SSH, Telnet, Mosh, Eternal Terminal",
        note: c("Mosh and Eternal Terminal help sessions survive unstable networks. Local shell sessions are available on macOS.", "Mosh 与 Eternal Terminal 可帮助会话应对不稳定网络；macOS 还提供本地 Shell。"),
      },
      "port-forwarding": {
        title: c("SSH port forwarding", "SSH 端口转发"),
        note: c("Set up SSH tunnels and use jump hosts to reach servers behind another host.", "可建立 SSH 隧道，并通过跳板主机访问内网服务器。"),
      },
      ai: {
        title: c("No built-in AI features", "无内置 AI 功能"),
        note: c("No AI command generator or conversational assistant.", "不提供 AI 命令生成或对话式助手。"),
      },
      "external-agents": {
        title: c("Not supported", "不支持"),
        note: c("No built-in MCP server for exposing hosts or SSH tools to external agents.", "未内置 MCP 服务器，无法向外部 Agent 开放主机及 SSH 工具。"),
      },
      tailscale: {
        title: c("No built-in Tailscale integration", "无内置 Tailscale 集成"),
        note: c("Use a separate Tailscale client before connecting. VPN on Demand activates a configured system VPN; it does not manage a Tailnet.", "需先通过独立的 Tailscale 客户端联网。VPN On Demand 只会启动已配置的系统 VPN，不管理 Tailnet。"),
      },
      workspaces: {
        title: c("Omniview and terminal tabs", "Omniview 与终端标签页"),
        note: c("On macOS, see multiple terminal tabs together and send commands to more than one session from Omniview.", "在 macOS 上，可通过 Omniview 同时查看多个终端标签页，并向多个会话发送命令。"),
      },
      "hardware-keys": {
        title: c("YubiKey PIV and FIDO2", "支持 YubiKey PIV 与 FIDO2"),
        note: c("Supports YubiKey PIV and FIDO2 ECDSA-SK / Ed25519-SK. FIDO2 key generation requires macOS. On iOS, FIDO2 works over NFC or Lightning, not USB-C.", "支持 YubiKey PIV 与 FIDO2 ECDSA-SK、Ed25519-SK。FIDO2 密钥生成仅支持 macOS；iOS 的 FIDO2 认证支持 NFC、Lightning，不支持 USB-C。"),
      },
      platforms: {
        title: "macOS, iOS, visionOS",
        note: c("One purchase covers Mac, iPhone, iPad, and Apple Vision Pro.", "一次购买覆盖 Mac、iPhone、iPad 与 Apple Vision Pro。"),
      },
      sync: {
        title: "Panic Sync",
        note: c("Sync saved servers, passwords, SSH keys, and Clips across your devices.", "在设备间同步已保存的服务器、密码、SSH 密钥与 Clips 命令片段。"),
      },
      plans: {
        title: c("$9.99/year or $49.99 one-time", "$9.99/年，或 $49.99 一次购买"),
        note: c("Includes a 7-day trial. An active annual subscription also covers future major versions.", "提供 7 天试用；有效年度订阅还包含后续主要版本。"),
      },
    },
  };
}
