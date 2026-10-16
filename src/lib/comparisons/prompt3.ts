import { copy, type SiteLocale } from "../i18n";
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
// Connection and workflow details rechecked 2026-10-16:
// https://panic.com/prompt/ (Mosh/ET, local shell, visionOS, tmux terminal compatibility)
// https://help.panic.com/prompt/prompt-startup-command/ (tmux via SSH startup command)
// https://help.panic.com/prompt/ (no documented graphical SFTP browser or metrics dashboard)
// The maintainer confirmed on 2026-10-16 that Prompt 3 has no built-in Wake-on-LAN.
// Undocumented capabilities are not treated as confirmed unsupported.
export function getPrompt3(locale: SiteLocale): CompetitorContent {
  const c = (english: string, simplified: string, japaneseText?: string) => copy(locale, english, simplified, japaneseText);
  return {
    name: "Prompt 3",
    owner: "Panic Inc.",
    attribution: c("Prompt is a registered trademark of Panic Inc.", "Prompt 是 Panic Inc. 的注册商标。"),
    description: c("Compare Termind and Prompt 3: connection types, Session Persistence, Wake-on-LAN, SFTP, AI, Tailscale, hardware keys, and pricing.", "对比 Termind 与 Prompt 3 的连接类型、会话持久化、Wake-on-LAN、SFTP、AI、Tailscale、硬件密钥与价格。"),
    summary: c("Both support Mosh and Eternal Terminal. Termind combines SFTP, server monitoring, and an AI Assistant. Prompt 3 offers visionOS, a local Mac shell, and additional hardware-key types.", "两款都支持 Mosh 与 Eternal Terminal。Termind 将 SFTP、服务器监控与 AI 助手集于一体。Prompt 3 提供 visionOS 支持、Mac 本地 Shell 与其他硬件密钥类型。"),
    termindRecommendationTitle: c("Terminal, files, and AI in one workspace.", "终端、文件与 AI，同一个工作台。"),
    termindRecommendation: c("Choose Termind to work with terminals, files, and server health together. Its AI Assistant and Mac MCP server work with your own model. Pro adds unlimited hosts, built-in Tailscale, and multi-connection acceleration.", "如果希望把终端、文件和服务器状态放在一起处理，可以选择 Termind。AI 助手与 Mac MCP 服务器使用你自己的模型。Pro 解锁无限主机、内置 Tailscale 与多连接加速。"),
    recommendationTitle: c("visionOS, local shell, and more key types.", "visionOS、本地 Shell 与更多密钥类型。"),
    recommendation: c("Consider Prompt 3 for Apple Vision Pro, a local shell on Mac, or YubiKey PIV and Ed25519-SK authentication. Mosh and Eternal Terminal are available in both apps, not a reason to choose Prompt alone.", "如果需要 Apple Vision Pro、Mac 本地 Shell，或 YubiKey PIV 与 Ed25519-SK 认证，可以考虑 Prompt 3。Mosh 与 Eternal Terminal 两款都有，不再是只能选择 Prompt 的理由。"),
    features: {
      connections: {
        title: "SSH, Telnet, Mosh, Eternal Terminal",
        note: c("Mosh and Eternal Terminal help sessions survive unstable networks. Local shell sessions are available on macOS.", "Mosh 与 Eternal Terminal 可帮助会话应对不稳定网络；macOS 还提供本地 Shell。"),
      },
      tmux: {
        title: c("tmux through terminal commands", "通过终端命令使用 tmux"),
        note: c("Prompt documents launching tmux with an SSH startup command. This is different from Termind’s built-in remote-session picker and managed-session controls.", "Prompt 文档介绍了通过 SSH 启动命令运行 tmux，这不同于 Termind 内置的远程会话选择与托管会话控制。"),
        sourceURL: "https://help.panic.com/prompt/prompt-startup-command/",
      },
      "wake-on-lan": {
        title: c("Not supported", "不支持"),
        note: c("No built-in Wake-on-LAN. Wake the machine with another tool before connecting.", "不提供内置 Wake-on-LAN，需先通过其他工具唤醒主机，再进行连接。"),
      },
      sftp: {
        title: c("No graphical SFTP browser documented", "未见图形化 SFTP 浏览器说明"),
        note: c("Prompt focuses on terminal access. Its published features do not describe a graphical file browser like Termind’s SFTP workspace.", "Prompt 专注于终端访问，公开功能中未介绍类似 Termind SFTP 工作区的图形化文件浏览器。"),
        sourceURL: "https://panic.com/prompt/",
      },
      monitoring: {
        title: c("Terminal-based monitoring", "通过终端监控"),
        note: c("Use server-side tools in a terminal. A dedicated dashboard for live CPU, memory, disk, and network metrics is not documented.", "可在终端运行服务器端监控工具；未见专门用于 CPU、内存、磁盘与网络实时指标的监控面板说明。"),
        sourceURL: "https://panic.com/prompt/",
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
