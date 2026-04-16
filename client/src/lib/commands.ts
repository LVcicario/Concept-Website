export interface CommandResult {
  output: string[];
  action?: "navigate" | "clear" | "exit" | "easter-egg-terminal" | "easter-egg-console";
  target?: string;
}

const HELP_TEXT = [
  "Available commands:",
  "",
  "  help        — Show this message",
  "  about       — Navigate to About section",
  "  experience  — Navigate to Experience section",
  "  skills      — Navigate to Skills section",
  "  projects    — Navigate to Projects section",
  "  contact     — Navigate to Contact section",
  "  clear       — Clear terminal",
  "  exit        — Close terminal overlay",
  "  whoami      — Display user info",
  "",
  "Type a command and press Enter.",
];

export function executeCommand(input: string): CommandResult {
  const cmd = input.trim().toLowerCase();

  if (cmd === "help" || cmd === "?") {
    return { output: HELP_TEXT };
  }

  if (cmd === "about") return { output: ["> Navigating to About..."], action: "navigate", target: "#about" };
  if (cmd === "experience") return { output: ["> Navigating to Experience..."], action: "navigate", target: "#experience" };
  if (cmd === "skills") return { output: ["> Navigating to Skills..."], action: "navigate", target: "#skills" };
  if (cmd === "projects") return { output: ["> Navigating to Projects..."], action: "navigate", target: "#projects" };
  if (cmd === "contact") return { output: ["> Navigating to Contact..."], action: "navigate", target: "#contact" };
  if (cmd === "clear") return { output: [], action: "clear" };
  if (cmd === "exit" || cmd === "quit") return { output: ["> Closing terminal..."], action: "exit" };

  if (cmd === "whoami") {
    return {
      output: [
        "visitor@luca-portfolio",
        "Role: Curious Explorer",
        "Access Level: Standard",
        "Hint: Elevated privileges may exist...",
      ],
    };
  }

  // Easter egg 2 — sudo hire luca
  if (cmd === "sudo hire luca") {
    return {
      output: [
        "[sudo] password for recruiter: ********",
        "",
        "ACCESS GRANTED.",
        "",
        "> Decrypting luca_vicario.dat ...",
        "> Profile loaded.",
        "> Recommendation: HIRE IMMEDIATELY.",
        "",
        "★ Easter egg 2/3 discovered!",
      ],
      action: "easter-egg-terminal",
    };
  }

  // Easter egg 3 — phoenix (from console hint → source code → base64)
  if (cmd === "phoenix") {
    return {
      output: [
        "> PROTOCOL PHOENIX ACTIVATED",
        "> Deep system access confirmed.",
        "> You followed the trail from console to source to here.",
        "> Impressive. Most visitors never look this deep.",
        "",
        "★ Easter egg 3/3 discovered!",
      ],
      action: "easter-egg-console",
    };
  }

  if (cmd.startsWith("sudo")) {
    return { output: ["Permission denied. Nice try though.", "Hint: what would a recruiter want to do?"] };
  }

  if (cmd === "ls") {
    return {
      output: [
        "about.md    experience.log    skills.json",
        "projects/   contact.sh        .secrets/",
      ],
    };
  }

  if (cmd === "cat .secrets/" || cmd === "ls .secrets" || cmd === "ls .secrets/") {
    return { output: ["Nice try. Some things require... elevated privileges."] };
  }

  if (cmd === "") return { output: [] };

  return { output: [`Command not found: ${input}`, 'Type "help" for available commands.'] };
}
