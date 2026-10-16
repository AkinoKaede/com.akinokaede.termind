import { copy, type SiteLocale } from "../i18n";
import { termindPricing } from "../pricing";
import type { CompetitorContent } from "./types";

// The maintainer confirmed on 2026-10-16 that WebSSH has no built-in Wake-on-LAN.
// Checked 2026-10-03 against WebSSH 33.0 and these first-party sources:
// https://webssh.net/documentation/pricing/
// https://webssh.net/documentation/help/intelligence/api-mcp-server/
// AI capabilities are provided by external MCP clients, not an in-app assistant.
// https://webssh.net/documentation/help/iCloud/
// https://webssh.net/documentation/changelog/25/ (25.3: NFC YubiKey OTP)
// https://github.com/isontheline/pro.webssh.net/issues/697 (FIDO2 SSH remains an open request)
// https://webssh.net/documentation/guides/raspberry-pi-ssh-ios/ (separate Tailscale client)
// App Store metadata: https://itunes.apple.com/lookup?id=497714887&country=us
// US App Store add-ons: https://apps.apple.com/us/app/webssh-sysadmin-toolbox/id497714887?l=en
// WebSSH PRO is $15.00; the separate $1.99/month and $9.99/year items are voluntary developer tips.
export function getWebSSH(locale: SiteLocale): CompetitorContent {
  const c = (english: string, simplified: string, japaneseText?: string) => copy(locale, english, simplified, japaneseText);
  return {
    name: "WebSSH",
    owner: "Arnaud Mengus",
    description: c("Compare Termind and WebSSH: SFTP, port forwarding, Tailscale, external AI clients, hardware keys, monitoring, and paid plans.", "对比 Termind 与 WebSSH 的 SFTP、端口转发、Tailscale、外部 AI 客户端、硬件密钥、监控与付费方案。"),
    summary: c("Termind combines an in-app AI Assistant, SFTP, and FIDO2 authentication. WebSSH includes network diagnostics and Proxmox workflows.", "Termind 将应用内 AI 助手、SFTP 与 FIDO2 认证结合在一起。WebSSH 提供网络诊断与 Proxmox 工作流。"),
    termindRecommendationTitle: c("AI in the app. MCP on Mac.", "应用内 AI，Mac 上的 MCP。"),
    termindRecommendation: c("Pick Termind for AI inside your SSH and SFTP workflow, or connect an external AI client through the Mac MCP server. Pro adds unlimited hosts and built-in Tailscale; its lifetime option costs {lifetime}.", "在 SSH 与 SFTP 工作中直接使用 AI，或通过 Mac MCP 服务器接入外部 AI 客户端，都可以选择 Termind。Pro 解锁无限主机与内置 Tailscale，永久版为 {lifetime}。").replaceAll("{lifetime}", termindPricing.lifetime),
    recommendationTitle: c("Network tools and Proxmox.", "网络工具与 Proxmox 管理。"),
    recommendation: c("A fit for Mosh, network diagnostics, VPN-over-SSH, and Proxmox workflows, with a one-time Pro purchase.", "适合常用 Mosh、网络诊断、VPN-over-SSH 或 Proxmox 的工作流，Pro 支持一次购买。"),
    features: {
      sftp: {
        title: c("One connection in the base plan", "基础方案包含 1 个连接"),
        note: c("Browse, transfer, and edit remote files. Pro lets you save unlimited connections.", "支持浏览、传输和编辑远程文件；Pro 可保存不限数量的连接。"),
      },
      "port-forwarding": {
        title: c("Local and dynamic forwarding", "本地与动态端口转发"),
        note: c("Use SSH tunnels to access remote services. VPN-over-SSH can route traffic from other iOS apps through a tunnel.", "通过 SSH 隧道访问远程服务；VPN-over-SSH 可让其他 iOS 应用的流量经过隧道。"),
      },
      tailscale: {
        title: c("No built-in Tailscale integration", "无内置 Tailscale 集成"),
        note: c("Use a separate Tailscale client to reach Tailnet hosts. VPN-over-SSH is an SSH tunnel feature, not Tailnet integration.", "需通过独立的 Tailscale 客户端访问 Tailnet 主机。VPN-over-SSH 属于 SSH 隧道功能，不提供 Tailnet 集成。"),
      },
      "wake-on-lan": {
        title: c("Not supported", "不支持"),
        note: c("No built-in Wake-on-LAN. Wake the machine with another tool before connecting.", "不提供内置 Wake-on-LAN，需先通过其他工具唤醒主机，再进行连接。"),
      },
      ai: {
        title: c("No built-in AI features", "无内置 AI 功能"),
        note: c("No AI command generator or conversational assistant. AI workflows require an external client connected through MCP.", "不提供 AI 命令生成或对话式助手；AI 工作流需通过 MCP 接入外部客户端。"),
      },
      "external-agents": {
        title: c("Built-in API / MCP server", "内置 API / MCP 服务器"),
        note: c("On macOS, external clients can read terminal output, send commands, and query IP addresses, DNS, Whois, and documentation.", "仅支持 macOS。外部客户端可读取终端输出、发送命令，以及查询 IP、DNS、Whois 和文档。"),
      },
      monitoring: {
        title: c("Proxmox monitoring and a terminal state bar", "Proxmox 监控与终端状态栏"),
        note: c("Monitor Proxmox node CPU, memory, and storage, and view VM or LXC state. The terminal state bar can show custom status information.", "可监控 Proxmox 节点的 CPU、内存与存储，查看虚拟机或 LXC 状态；终端状态栏也可显示自定义状态信息。"),
      },
      connections: {
        title: "SSH, Mosh, Telnet, SFTP",
        note: c("Also offers a local shell and serial connections on macOS, plus Ping, Traceroute, DNS, and Whois utilities.", "另外提供本地 Shell、macOS 串口连接，以及 Ping、Traceroute、DNS 和 Whois 工具。"),
      },
      "hardware-keys": {
        title: c("YubiKey OTP", "YubiKey OTP"),
        note: c("Reads one-time passwords from a YubiKey over NFC. FIDO2 SSH signing with ECDSA-SK or Ed25519-SK is not supported.", "可通过 NFC 读取 YubiKey 一次性密码；不支持 ECDSA-SK 或 Ed25519-SK 的 FIDO2 SSH 签名。"),
      },
      platforms: {
        title: c("macOS & iOS", "macOS 与 iOS"),
        note: c("Use the same app on Mac, iPhone, and iPad.", "可在 Mac、iPhone 和 iPad 上使用。"),
      },
      sync: {
        title: c("iCloud sync", "iCloud 同步"),
        note: c("Sync saved connections and the WebSSH database through iCloud.", "通过 iCloud 同步已保存连接和 WebSSH 数据库。"),
      },
      plans: {
        title: c("$15.00 lifetime Pro", "$15.00 永久版 Pro"),
        note: c("The base plan saves one connection. Pro removes this limit on devices using the same Apple ID.", "基础方案可保存 1 个连接。Pro 解锁数量限制，同一 Apple ID 的设备通用。"),
      },
    },
  };
}
