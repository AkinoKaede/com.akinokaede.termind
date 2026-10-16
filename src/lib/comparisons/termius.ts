import { copy, type SiteLocale } from "../i18n";
import { termindPricing } from "../pricing";
import type { CompetitorContent } from "./types";

// Checked 2026-10-03: https://termius.com/pricing, https://termius.com/,
// and https://docs.termius.com/keychain/ssh-keys-and-certificates.
// The maintainer confirmed the missing Tailscale, monitoring, terminal-upload and MCP features,
// plus Starter hardware-key availability and the iOS credential compatibility limitation.
// The maintainer confirmed on 2026-10-16 that Termius has no built-in Wake-on-LAN.
export function getTermius(locale: SiteLocale): CompetitorContent {
  const c = (english: string, simplified: string, japaneseText?: string) => copy(locale, english, simplified, japaneseText);
  return {
    name: "Termius",
    owner: "Termius Corporation",
    attribution: c("Termius is a trademark of Termius Corporation.", "Termius 是 Termius Corporation 的商标。"),
    description: c("Compare Termind and Termius across SSH and SFTP, parallel transfers, Tailscale integration, AI, server monitoring, sync, and pricing.", "对比 Termind 与 Termius 的 SSH 与 SFTP、并行传输、Tailscale 集成、AI、服务器监控、同步与价格。"),
    summary: c("Termind combines an AI Assistant with a personal workspace for Apple devices. Termius spans Windows, Linux, and Android too, with separate plans for shared team access.", "Termind 将 AI 助手融入 Apple 设备上的个人工作台。Termius 还覆盖 Windows、Linux 和 Android，并提供独立的团队共享方案。"),
    termindRecommendationTitle: c("Personal Apple workspace with AI.", "AI 驱动的个人 Apple 工作台。"),
    termindRecommendation: c("Choose Termind for your own Mac, iPhone, and iPad: AI and MCP are built in. Pro adds unlimited hosts, iCloud sync, built-in Tailscale, and multi-connection acceleration for {annual}/year or {lifetime} lifetime.", "如果主要在自己的 Mac、iPhone 和 iPad 间工作，Termind 集成 AI 与 MCP。Pro 为 {annual}/年或 {lifetime} 终身版，提供无限主机、iCloud 同步、内置 Tailscale 与多连接加速。").replaceAll("{annual}", termindPricing.annual).replaceAll("{lifetime}", termindPricing.lifetime),
    recommendationTitle: c("Cross-platform and team access.", "跨平台与团队协作。"),
    recommendation: c("A fit for Windows, Linux, or Android users, and teams that need shared vaults and live terminal collaboration.", "适合同时使用 Windows、Linux 或 Android，或需要共享保管库和终端实时协作的团队。"),
    features: {
      "sftp": {
        title: c("SFTP included in Starter", "Starter 包含 SFTP"),
        note: c("Browse remote files and transfer files over SFTP.", "通过 SFTP 浏览远程文件并传输文件。"),
      },
      "terminal-uploads": {
        title: c("Not supported", "不支持"),
        note: c("Files can be transferred through the SFTP file browser.", "可通过 SFTP 文件浏览器传输文件。"),
      },
      "port-forwarding": {
        title: c("Port forwarding included in Starter", "Starter 包含端口转发"),
        note: c("Access remote services through SSH tunnels.", "通过 SSH 隧道访问远程服务。"),
      },
      "tailscale": {
        title: c("No built-in Tailscale integration", "无内置 Tailscale 集成"),
        note: c("Connect through a separate Tailscale client before accessing Tailnet hosts.", "需先通过独立的 Tailscale 客户端接入 Tailnet，再连接主机。"),
      },
      "wake-on-lan": {
        title: c("Not supported", "不支持"),
        note: c("No built-in Wake-on-LAN. Wake the machine with another tool before connecting.", "不提供内置 Wake-on-LAN，需先通过其他工具唤醒主机，再进行连接。"),
      },
      "ai": {
        title: c("AI-powered autocomplete", "AI 自动补全"),
        note: c("Included in Starter. Get suggestions for commands, arguments, and file paths.", "Starter 方案包含，可提供命令、参数和文件路径建议。"),
      },
      "external-agents": {
        title: c("Not supported", "不支持"),
        note: c("No built-in MCP server for exposing hosts or SSH/SFTP tools to external agents.", "未内置 MCP 服务器，无法向外部 Agent 开放主机及 SSH/SFTP 工具。"),
      },
      "monitoring": {
        title: c("Not supported", "不支持"),
        note: c("No built-in dashboard for live server metrics.", "未内置服务器实时指标面板。"),
      },
      "hardware-keys": {
        title: c("Included in Starter", "Starter 支持"),
        note: c("Supports FIDO2 hardware keys, but credentials used on iOS are incompatible with Termius on other platforms.", "支持 FIDO2 硬件密钥，但 iOS 凭据与其他平台不兼容。"),
      },
      "platforms": {
        title: "macOS, Windows, Linux, iOS, Android",
        note: c("Desktop and mobile, across ecosystems.", "覆盖多种桌面与移动平台。"),
      },
      "sync": {
        title: c("Personal cloud vault · Pro", "个人云保管库 · Pro"),
        note: c("Sync across desktop and mobile through Termius’s encrypted vault.", "通过 Termius 的加密保管库在桌面与移动设备间同步。"),
      },
      "plans": {
        title: c("$10/month, billed annually", "$10/月（按年付费）"),
        note: c("Pro costs $120 per year. Team and business plans are available separately.", "Pro 合计每年 $120，另有团队与企业方案。"),
      },
      "teams": {
        title: c("Shared vaults & live collaboration", "共享保管库与实时协作"),
        note: c("Team includes a shared vault, live collaboration, shared session logs, and consolidated billing.", "Team 包含共享保管库、实时协作、共享会话日志与统一账单。"),
      },
    },
  };
}
