import { copy, type SiteLocale } from "../i18n";
import { termindPricing } from "../pricing";
import type { CompetitorContent } from "./types";

// Checked 2026-10-03 against ServerCat 26.9.2:
// https://servercat.app/, https://servercat.app/en/faq, https://servercat.app/en/docs/facts
// https://itunes.apple.com/lookup?id=1501532023&country=us (free monitoring, Premium terminal/sync)
// The maintainer explicitly tested and confirmed no external FIDO2 hardware-key support.
// The maintainer also confirmed that ServerCat has no built-in AI features or MCP server.
// No built-in Tailnet sign-in/device sync appears in the current app feature inventory or docs.
// US App Store: https://apps.apple.com/us/app/servercat-ssh-terminal/id1501532023?l=en
// Regular Premium: $5.99/year or $18.99 lifetime. The $5.99 upgrade discount is a separate product.
export function getServerCat(locale: SiteLocale): CompetitorContent {
  const c = (english: string, simplified: string, japaneseText?: string) => copy(locale, english, simplified, japaneseText);
  return {
    name: "ServerCat",
    owner: "Early Moon, LLC",
    description: c("Compare Termind and ServerCat: server monitoring, SSH, Docker management, AI, hardware keys, Tailscale, sync, and pricing.", "对比 Termind 与 ServerCat 的服务器监控、SSH、Docker 管理、AI、硬件密钥、Tailscale、同步及价格。"),
    summary: c(`Both offer free monitoring. Termind includes SSH and SFTP for free, with Pro at ${termindPricing.annual}/year; ServerCat’s terminal requires Premium at $5.99/year.`, `两款都有免费监控。Termind 的 SSH 与 SFTP 免费，Pro 年费 ${termindPricing.annual}；ServerCat 终端需要 Premium，年费 $5.99。`, `どちらも無料で監視できます。Termind は SSH と SFTP が無料で、Pro は年額 ${termindPricing.annual}。ServerCat のターミナルには年額 $5.99 の Premium が必要です。`),
    termindRecommendationTitle: c("Free terminal access, lower upgrade costs.", "终端免费，升级费用更低。"),
    termindRecommendation: c(`Termind Pro costs ${termindPricing.annual}/year or ${termindPricing.lifetime} lifetime; ServerCat Premium costs $5.99/year or $18.99 lifetime. Termind also includes SSH, SFTP, and FIDO2 authentication for free, with AI and Tailscale in Pro.`, `Termind Pro 为 ${termindPricing.annual}/年或 ${termindPricing.lifetime} 永久版；ServerCat Premium 为 $5.99/年或 $18.99 永久版。Termind 免费提供 SSH、SFTP 与 FIDO2 认证，Pro 另含 AI 和 Tailscale。`, `Termind Pro は年額 ${termindPricing.annual} または買い切り ${termindPricing.lifetime}、ServerCat Premium は年額 $5.99 または買い切り $18.99 です。Termind は SSH、SFTP、FIDO2 認証を無料で提供し、Pro では AI と Tailscale も利用できます。`),
    recommendationTitle: c("Linux monitoring and Docker.", "Linux 监控与 Docker 管理。"),
    recommendation: c("A fit for detailed resource charts and a dedicated container dashboard. Premium adds the SSH terminal, sync, and container management.", "适合集中查看资源图表与容器状态；Premium 增加 SSH 终端、同步和容器管理。"),
    features: {
      monitoring: {
        title: c("Linux and Docker monitoring for free", "免费 Linux 与 Docker 监控"),
        note: c("Read CPU, GPU, memory, network, disk I/O, and Docker metrics over SSH. No monitoring agent is needed.", "通过 SSH 采集 CPU、GPU、内存、网络、磁盘 I/O 与 Docker 指标，无需安装监控 Agent。"),
      },
      connections: {
        title: c("SSH terminal · Premium", "SSH 终端 · Premium"),
        note: c("Monitoring connects over SSH for free. Interactive terminal sessions and background SSH require Premium.", "免费通过 SSH 连接并监控服务器；交互式终端与后台 SSH 需要 Premium。"),
      },
      containers: {
        title: c("Dedicated Docker dashboard", "专门的 Docker 管理面板"),
        note: c("View container status and resource use for free. Premium adds container creation and management.", "免费查看容器状态与资源用量；Premium 增加容器创建与管理功能。"),
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
        note: c("Connect the device with a separate Tailscale client, then use the host’s Tailnet address. No in-app Tailnet login or device sync.", "需先通过独立的 Tailscale 客户端联网，再使用主机的 Tailnet 地址连接；不提供应用内登录或设备同步。"),
      },
      "hardware-keys": {
        title: c("No FIDO2 hardware-key support", "不支持 FIDO2 硬件密钥"),
        note: c("Supports software SSH keys, but not SSH signing with external FIDO2 keys.", "支持软件 SSH 密钥，不支持通过外接 FIDO2 硬件密钥签名。"),
      },
      platforms: {
        title: c("macOS & iOS", "macOS 与 iOS"),
        note: c("Monitoring targets Linux servers; some metrics are unavailable for other server operating systems.", "监控面向 Linux 服务器；其他服务器系统的部分指标不可用。"),
      },
      sync: {
        title: c("iCloud sync · Premium", "iCloud 同步 · Premium"),
        note: c("Sync encrypted connection data through iCloud across your devices.", "通过 iCloud 在设备间同步加密的连接数据。"),
      },
      plans: {
        title: c("$5.99/year or $18.99 lifetime", "$5.99/年，或 $18.99 永久版"),
        note: c("Monitoring is free. Both Premium plans include the terminal, background SSH, sync, and container management.", "监控免费。两种 Premium 方案均包含终端、后台 SSH、同步和容器管理。"),
      },
    },
  };
}
