import { copy, type SiteLocale } from "../i18n";
import { termindPricing } from "../pricing";

export function getTermindFeatures(locale: SiteLocale) {
  const c = (english: string, simplified: string) => copy(locale, english, simplified);
  return {
    "sftp": {
      id: "sftp",
      feature: c("SFTP transfers", "SFTP 传输"),
      benefit: c("Transfer several files at once.", "同时传输多个文件。"),
      termind: c("Free; multi-connection acceleration with Pro", "免费，Pro 支持多连接并行加速"),
      termindNote: c("Parallel uploads and downloads with adjustable global and per-host limits. Pro adds multiple SSH connections and smart scheduling based on file size.", "支持并行上传、下载，可调整全局和单主机并发数。Pro 增加多 SSH 连接与按文件大小智能调度。"),
    },
    "terminal-uploads": {
      id: "terminal-uploads",
      feature: c("Drag-and-drop terminal uploads", "终端拖放上传"),
      benefit: c("Drop a file into the terminal and keep working.", "把文件拖进终端，接着就能用。"),
      termind: c("Included for free", "免费支持"),
      termindNote: c("Drag local files into an SSH terminal to upload them without switching to the SFTP file browser.", "将本地文件拖入 SSH 终端即可上传，无需切换到 SFTP 文件浏览器。"),
    },
    "port-forwarding": {
      id: "port-forwarding",
      feature: c("Port forwarding", "端口转发"),
      benefit: c("Reach remote services through SSH tunnels.", "通过 SSH 隧道访问远程服务。"),
      termind: c("Free; multi-connection acceleration with Pro", "免费，Pro 支持多连接加速"),
      termindNote: c("Create multiple forwarding rules for free. On macOS, Pro spreads local and dynamic forwarding traffic across multiple SSH connections.", "免费配置多条转发规则。macOS 上的 Pro 可将本地与动态转发流量分摊至多个 SSH 连接。"),
    },
    "tailscale": {
      id: "tailscale",
      feature: c("Built-in Tailscale", "内置 Tailscale"),
      benefit: c("Connect to your private network from the app.", "在应用内接入私有网络。"),
      termind: c("In-app Tailnet access · Pro", "应用内连接 Tailnet · Pro"),
      termindNote: c("Sign in and sync Tailscale devices in host groups; each group can use a different Tailnet. No separate client or system VPN is needed. SSH and SFTP require Tailscale SSH on the server.", "在主机分组中登录并同步 Tailscale 设备，各分组可接入不同 Tailnet。无需另装客户端或配置系统 VPN；SSH 和 SFTP 连接需在服务器上启用 Tailscale SSH。"),
    },
    "ai": {
      id: "ai",
      feature: c("Built-in AI", "内置 AI"),
      benefit: c("Generate commands or hand off a multi-step task.", "生成命令，或交给助手处理多步任务。"),
      termind: c("Free command generation; Assistant with Pro", "命令生成免费，AI 助手需 Pro"),
      termindNote: c("Use your own model key. The Assistant runs commands and handles files within your chosen permissions, with skills, remote MCP tools, and optional local memory. Model usage is billed separately.", "使用自己的模型密钥。助手可按设定权限执行命令、处理文件，并使用技能、远程 MCP 工具与可选本地记忆。模型用量费用另计。"),
    },
    "external-agents": {
      id: "external-agents",
      feature: c("External agents", "外部 Agent"),
      benefit: c("Connect your preferred AI client.", "接入你常用的 AI 客户端。"),
      termind: c("Built-in MCP server · Pro", "内置 MCP 服务器 · Pro"),
      termindNote: c("On macOS, give clients such as Codex and Claude Code access to saved hosts, SSH commands, and SFTP files. Enable tools individually and review each call in the audit log.", "仅支持 macOS。让 Codex、Claude Code 等客户端访问主机、执行 SSH 命令和读写 SFTP 文件；可逐项开放工具，并查看调用审计记录。"),
    },
    "monitoring": {
      id: "monitoring",
      feature: c("Server monitoring", "服务器状态监控"),
      benefit: c("See server health at a glance.", "集中查看服务器运行状态。"),
      termind: c("Monitor 3 servers for free; more with Pro", "免费监控 3 台服务器，Pro 支持更多"),
      termindNote: c("View live CPU, memory, disk, and network metrics across your servers. No monitoring agent is required.", "集中查看 CPU、内存、磁盘与网络实时指标，无需在服务器上安装监控 Agent。"),
    },
    "hardware-keys": {
      id: "hardware-keys",
      feature: c("Hardware Keys", "硬件密钥"),
      benefit: c("Compare authentication methods and device compatibility.", "关注认证方式与设备兼容性。"),
      termind: c("Free; compatible across macOS and iOS", "免费支持，macOS 与 iOS 兼容"),
      termindNote: c("Supports FIDO2 ECDSA-SK P-256 with shared credentials across macOS and iOS. The private key stays on the hardware key.", "支持 FIDO2 ECDSA-SK P-256，macOS 与 iOS 可共用凭据；私钥始终留在硬件密钥上。"),
    },
    "platforms": {
      id: "platforms",
      feature: c("Platforms", "支持平台"),
      benefit: c("Check device support and system requirements.", "查看设备支持与系统要求。"),
      termind: c("macOS & iOS", "macOS 与 iOS"),
      termindNote: "macOS 15+ · iOS 18+",
    },
    "sync": {
      id: "sync",
      feature: c("Sync between devices", "跨设备同步"),
      benefit: c("Bring saved settings to your other devices.", "让连接配置随设备同行。"),
      termind: c("iCloud sync · Pro", "iCloud 同步 · Pro"),
      termindNote: c("Sync Vault, monitoring configuration, and settings. Credentials use iCloud Keychain; chats and memory stay on the device.", "同步保管库、监控配置与设置。凭据通过 iCloud 钥匙串同步；聊天和记忆留在本机。"),
    },
    "plans": {
      id: "plans",
      feature: c("Paid plans", "付费方案"),
      benefit: c("Compare recurring and one-time costs.", "比较订阅与一次购买的费用。"),
      termind: c(`${termindPricing.annual}/year or ${termindPricing.lifetime} lifetime`, `${termindPricing.annual}/年，或 ${termindPricing.lifetime} 永久版`),
      termindNote: c("Annual and lifetime plans unlock the same Pro features and include Family Sharing. AI model usage is billed separately.", "年度订阅与永久版解锁相同的 Pro 功能，均支持家庭共享。AI 模型用量费用另计。"),
    },
    "teams": {
      id: "teams",
      feature: c("Working with a team", "团队协作"),
      benefit: c("Share access and work together.", "共享主机访问，协同处理任务。"),
      termind: c("A personal remote workspace", "个人远程工作台"),
      termindNote: c("Private sync for your own devices. No shared team vault or live multiplayer sessions.", "在自己的设备间私密同步，不提供共享团队保管库或多人实时会话。"),
    },
    connections: {
      id: "connections",
      feature: c("Connection types", "连接类型"),
      benefit: c("Match protocols to your environment.", "按环境选择连接协议。"),
      termind: c("SSH, Telnet, SFTP, and serial", "SSH、Telnet、SFTP 与串口"),
      termindNote: c("Core connections are free. Serial sessions are available on macOS; combine terminals and file browsers in a multi-pane workspace.", "基础连接免费。串口会话仅支持 macOS，可将终端与文件浏览器组合为多窗格工作区。"),
    },
    workspaces: {
      id: "workspaces",
      feature: c("Multiple sessions", "多会话工作"),
      benefit: c("Keep related sessions together.", "把相关会话放在一起。"),
      termind: c("Multi-pane workspaces for free", "免费多窗格工作区"),
      termindNote: c("On macOS, combine SSH, Telnet, SFTP, and serial sessions in a workspace and broadcast input to multiple terminals.", "在 macOS 上，将 SSH、Telnet、SFTP 和串口会话组合到工作区，并向多个终端广播输入。"),
    },
    containers: {
      id: "containers",
      feature: c("Docker management", "Docker 管理"),
      benefit: c("Choose how you work with containers.", "选择适合你的容器管理方式。"),
      termind: c("Terminal commands and AI tools", "终端命令与 AI 工具"),
      termindNote: c("Run Docker commands through SSH, or let Pro’s Assistant investigate and act within your chosen permissions.", "通过 SSH 执行 Docker 命令，或让 Pro 助手按设定权限排查和操作。"),
    },
  };
}

export type ComparisonFeatureId = keyof ReturnType<typeof getTermindFeatures>;
