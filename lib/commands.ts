// Command mappings for AVENIR waitlist
export const COMMANDS: Record<string, string> = {
  // Main navigation - updated for new page structure
  "exec.about": "/about",
  "exec.waitlist": "/waitlist",
  "exec.billboard": "/billboard",
  "exec.secret": "/secret",

  // System commands
  clear: "CLEAR_TERMINAL",
  help: "SHOW_HELP",
  status: "SHOW_STATUS",
  hide: "HIDE_TERMINAL",
}

export function getCommandSuggestions(input: string): string[] {
  if (!input.trim()) return []

  const commands = Object.keys(COMMANDS)
  return commands.filter((cmd) => cmd.toLowerCase().includes(input.toLowerCase())).slice(0, 5)
}
