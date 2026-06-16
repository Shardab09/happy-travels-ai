import { useState, useEffect } from "react";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export function GitHubSyncIndicator() {
  const [lastSync, setLastSync] = useState<string>("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Show current time as last-sync reference point
    const now = new Date();
    setLastSync(
      now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  }, []);

  const repoUrl = import.meta.env.VITE_GITHUB_REPO_URL as string | undefined;

  const Wrapper = repoUrl ? "a" : "div";
  const wrapperProps = repoUrl
    ? { href: repoUrl, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <div className="fixed bottom-4 right-4 z-[100] sm:bottom-6 sm:right-6">
      <Wrapper
        {...wrapperProps}
        className="group flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-2 shadow-lg backdrop-blur-md transition-all hover:bg-background hover:shadow-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
        </span>
        <GitHubIcon className="h-4 w-4 text-foreground/80" />
        <span className="text-xs font-medium text-foreground/90">
          Synced to GitHub
        </span>
        {isHovered && (
          <div className="absolute bottom-full right-0 mb-2 w-56 rounded-lg border border-border bg-popover p-3 text-xs text-popover-foreground shadow-xl">
            <p className="font-semibold">GitHub Connected</p>
            <p className="mt-1 text-muted-foreground">
              Changes push automatically to your repo.
            </p>
            {lastSync && (
              <p className="mt-1 text-muted-foreground">
                Last update: {lastSync}
              </p>
            )}
            {repoUrl && (
              <p className="mt-1 text-emerald-500">Click to open repo →</p>
            )}
            <div className="absolute -bottom-1 right-4 h-2 w-2 rotate-45 border-b border-r border-border bg-popover" />
          </div>
        )}
      </Wrapper>
    </div>
  );
}
