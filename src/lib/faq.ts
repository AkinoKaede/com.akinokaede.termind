export const englishFAQ: Array<[string, string | string[], string?]> = [
  ["What can I do with Termind?", "Termind is an AI-driven remote workspace. Describe a command, ask the AI Assistant to investigate an issue or act on a server, then keep working with SSH, Telnet, SFTP, and live metrics in the same app. AI helps with the work; you choose the model, permissions, and workflow."],
  ["How is the AI Assistant different from Command Generator?", [
    "Command Generator is for “write me a command”: describe what you need, review the result, and decide whether to run it. It stays free and never presses Return for you.",
    "The AI Assistant is free too. It handles multi-step tasks under your chosen permissions, with skills, Web Search, remote MCP tools, and optional Hermes Memory. Bring your own model key; provider usage is billed separately.",
  ]],
  ["What is Hermes Memory? Do I have to repeat myself in every chat?", [
    "Hermes Memory lets the AI Assistant carry useful context and preferences across conversations, such as how you work or details about your environment. The Assistant searches saved memory when it is relevant and can search past chats, so you can spend less time explaining the same background.",
    "It is off by default. The memory store stays on this device and does not sync through iCloud. You can review, edit, export, or destroy it at any time, and turn off Automatic Learning. Automatic Learning may incur additional API charges.",
  ]],
  ["Can the AI run commands without asking me?", "That depends on the permissions you choose. Command Generator never runs commands. The AI Assistant follows tool policies and your permission mode: actions requiring approval can come to you for confirmation or go to a security-review model. Full Access allows those actions without asking each time. Review the scope of access before you use it, especially on production servers."],
  ["Do I need my own API key to use AI?", "Yes. Termind uses bring-your-own-key (BYOK): configure your model endpoint, model, and API key. It supports Chat Completions, Responses, Messages, and generateContent protocols. No Termind account is needed. Pro does not include third-party model usage; your AI provider bills that separately."],
  ["Can I use Termind without AI?", "Absolutely. SSH and Telnet terminals, SFTP file management, snippets, and port forwarding work without an AI key. The AI Assistant, Hermes Memory, Web Search, and MCP connections are optional—turn on only what you need."],
  ["Are the features the same on Mac, iPhone, and iPad?", "Termind supports macOS 15, iOS 18, and iPadOS 18 or later. All three include SSH, Mosh, Eternal Terminal, Telnet, SFTP, server monitoring, AI, MCP clients, and Wake-on-LAN. iCloud sync and built-in Tailscale require Pro. Mac also includes serial sessions, multi-pane workspaces, input broadcasting, and a built-in MCP server. Each iPhone or iPad workspace contains one terminal or SFTP session."],
  ["Do I need to install anything on my server?", "No Termind agent or daemon is required. Standard connections need a working SSH or Telnet service, plus SFTP support for file management. To connect through built-in Tailscale, the server must run Tailscale with Tailscale SSH enabled. Optional SSH Shell Integration runs only in the current shell session: it leaves no background process after disconnecting and does not change shell configuration files."],
  ["How do connection recovery and Session Persistence work?", [
    "Mosh and Eternal Terminal help terminal connections recover from network interruptions. Enable the transport for a host and install the matching server software. Mosh also needs reachable UDP ports and is not available for hosts managed by built-in Tailscale.",
    "Session Persistence keeps remote processes running with Herdr, tmux, Zellij, or zmx when you disconnect. Enable it for a host, choose a tool, and create or select a remote session to reattach later. Install your chosen tool on the server first. These features are available on Mac, iPhone, and iPad.",
  ], "session-tools"],
  ["How does Wake-on-LAN work?", "Manual and automatic Wake-on-LAN are free. Save the target’s MAC address and enable WoL on that machine. Requests stay on your local network, not through SSH, proxies, or Tailscale. Sending a request does not guarantee the machine has woken up.", "wake-on-lan"],
  ["How do I connect my Tailnet? Do I need the Tailscale app?", [
    "Built-in Tailscale is a Termind Pro feature. No separate Tailscale app or system VPN setup is needed on this device; Termind establishes the connection within the app.",
    "Create or edit a group in Vault, enable Tailscale, sign in through your browser or use an Auth Key, then save the group. Discovered Tailnet devices appear in that group. You can connect different groups to different tailnets.",
    "The target server must have Tailscale SSH enabled, and your Tailnet’s access policies must allow the username you connect with. You can then open an SSH terminal or use SFTP. Device details also show online status, MagicDNS names, and Ping latency. Tailnet sign-in stays on the current device, so sign in again when you switch devices.",
  ], "tailscale"],
  ["What is free, and what does Pro add?", [
    "Free includes 3 hosts, SSH, Telnet, SFTP, terminal uploads, snippets, port forwarding, AI Assistant and Command Generator, all MCP features, server monitoring, and Wake-on-LAN. Mac also includes serial sessions, multi-pane workspaces, and input broadcasting. AI provider usage is billed separately.",
    "Pro adds unlimited hosts, iCloud sync, built-in Tailscale, multi-connection SFTP, and multi-connection port forwarding on Mac. Choose an annual plan or a one-time lifetime purchase; both support Family Sharing.",
  ]],
  ["Where are my passwords and SSH private keys stored?", "In Apple’s Data Protection Keychain, separate from your host information. Passwords and software SSH private keys can stay on this device or sync through iCloud Keychain. Secure Enclave private keys cannot be exported and do not sync. SSH private keys are not sent to the AI model as chat context."],
  ["What carries over when I switch devices?", [
    "With Pro’s iCloud sync, choose whether to sync Vault, connection history and device information, server monitoring settings, and preferences, including AI models, MCP clients, skills, and Web Search.",
    "With Settings sync enabled, AI API keys and remote MCP client tokens sync through iCloud Keychain. Chats, Hermes Memory, live metric samples, and connection state do not sync. The Mac’s built-in MCP server settings and token also stay on that device.",
  ]],
  ["What goes to the model when I use AI or Memory?", [
    "Termind connects directly to your selected AI provider, with no hosted Termind AI service in between. Requests may include your messages, attachments, session context, and command output or file contents you authorize it to read. The provider’s own policies govern how it handles and retains that data.",
    "Local memory storage does not mean memory never leaves your device. When enabled, retrieved memory entries or chat excerpts may be sent to the model as context. Automatic Learning also sends relevant conversation content and selected existing memory to your configured learning model. Keep only information you are comfortable sharing with that provider.",
    "Web Search can be turned off in settings. When enabled, queries and selected page content are sent to search services and your AI provider. See the Privacy Policy for the complete data flow.",
  ]],
  ["Where can I get help?", "Visit Support or email support-termind@akinokaede.com. Tell us what you were trying to do, what happened, and which device and OS version you use. Before sharing screenshots or logs, remove passwords, keys, host addresses, and other sensitive details."],
];
