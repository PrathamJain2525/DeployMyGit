"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Clock,
  ExternalLink,
  FlaskConical,
  Moon,
  Rocket,
  Sun,
  Terminal,
} from "lucide-react";

const SAMPLE_LOGS: string[] = [
  "Cloning repository: https://github.com/PrathamJain2525/pratham-portfolio-website",
  "Checkout: branch → main",
  "Resolving dependencies...",
  "Installing dependencies (npm install)...",
  "added 247 packages in 4.83s",
  "Running build command: npm run build",
  "",
  "> portfolio-website@1.0.0 build",
  "> vite build",
  "",
  "vite v5.2.0 building for production...",
  "transforming (1/45):   index.html",
  "transforming (12/45):  src/components/Navbar.tsx",
  "transforming (27/45):  src/components/Hero.tsx",
  "transforming (38/45):  src/components/Projects.tsx",
  "transforming (45/45):  src/assets/icons.ts",
  "✓ 45 modules transformed.",
  "",
  "dist/index.html             1.32 kB │ gzip:  0.78 kB",
  "dist/assets/index.css      12.40 kB │ gzip:  3.82 kB",
  "dist/assets/index.js      154.22 kB │ gzip: 51.10 kB",
  "✓ built in 3.24s",
  "",
  "Uploading build artifacts to AWS S3...",
  "  → Uploading: dist/index.html",
  "  → Uploading: dist/assets/index.css",
  "  → Uploading: dist/assets/index.js",
  "Upload complete. 3 files uploaded successfully.",
  "",
  "Configuring reverse proxy routing...",
  "Reverse proxy route created: /pratham-portfolio/",
  "Health check passed ✓",
  "🚀 Deployment complete! Your site is live.",
];

const LOG_INTERVAL_MS = 280;

type DeploymentStatus = "building" | "live";

export default function DemoDeployingPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  const [status, setStatus] = useState<DeploymentStatus>("building");
  const [showRedirect, setShowRedirect] = useState(false);

  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let index = 0;

    let completionTimer: ReturnType<typeof setTimeout> | null = null;
    let redirectTimer: ReturnType<typeof setTimeout> | null = null;

    const logTimer = setInterval(() => {
      if (index < SAMPLE_LOGS.length) {
        /*
         * Capture the current value before incrementing index.
         * This prevents undefined from being added to visibleLogs.
         */
        const currentLog = SAMPLE_LOGS[index];

        if (typeof currentLog === "string") {
          setVisibleLogs((previousLogs) => [
            ...previousLogs,
            currentLog,
          ]);
        }

        index += 1;
        return;
      }

      clearInterval(logTimer);

      completionTimer = setTimeout(() => {
        setStatus("live");

        redirectTimer = setTimeout(() => {
          setShowRedirect(true);
        }, 800);
      }, 600);
    }, LOG_INTERVAL_MS);

    return () => {
      clearInterval(logTimer);

      if (completionTimer) {
        clearTimeout(completionTimer);
      }

      if (redirectTimer) {
        clearTimeout(redirectTimer);
      }
    };
  }, []);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [visibleLogs]);

  const getLogColor = (log: string) => {
    if (log.startsWith("🚀")) {
      return "text-green-300 font-bold";
    }

    if (log.startsWith("✓")) {
      return "text-green-400";
    }

    if (log.startsWith("  →")) {
      return "text-blue-400";
    }

    if (log.startsWith(">")) {
      return "text-purple-400";
    }

    if (log.startsWith("vite")) {
      return "text-yellow-400";
    }

    if (log.includes("dist/")) {
      return "text-cyan-400";
    }

    if (
      log.includes("Health check passed") ||
      log.includes("Upload complete")
    ) {
      return "text-emerald-400";
    }

    return "text-green-400";
  };

  const formatLog = (log: string) => {
    if (log.startsWith(">") || log.startsWith("  →")) {
      return log;
    }

    return `$ ${log}`;
  };

  const handleVisitSite = () => {
    window.open(
      "/demo/sample-deployment",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {/* Demo Banner */}
        <div className="sticky top-0 z-50 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2.5 text-center text-sm font-medium text-white">
          <FlaskConical className="h-4 w-4 shrink-0" />

          <span>
            <strong>Demo Mode</strong> — This is a sample walkthrough for
            demonstration purposes. No actual deployment will occur.
          </span>
        </div>

        {/* Header */}
        <header className="border-b border-gray-200 bg-white/80 backdrop-blur-xl dark:border-gray-700 dark:bg-gray-900/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                  <Rocket className="h-5 w-5 text-white" />
                </div>

                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
                  DeployerDock
                </span>
              </div>

              <button
                type="button"
                aria-label="Toggle theme"
                onClick={() => setIsDarkMode((previous) => !previous)}
                className="rounded-lg bg-gray-100 p-2 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                {isDarkMode ? (
                  <Sun className="h-4 w-4 text-white" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          {/* Deployment Information */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">
                Deploying{" "}
                <span className="font-mono text-purple-600 dark:text-purple-400">
                  pratham-portfolio
                </span>
              </h1>

              <p className="break-all text-sm text-gray-500 dark:text-gray-400">
                https://github.com/PrathamJain2525/pratham-portfolio-website
              </p>
            </div>

            <div className="flex items-center gap-2">
              {status === "building" ? (
                <span className="flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300">
                  <Clock className="h-4 w-4 animate-pulse" />
                  Building...
                </span>
              ) : (
                <span className="animate-in fade-in flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 duration-500 dark:bg-green-900/40 dark:text-green-300">
                  <CheckCircle className="h-4 w-4" />
                  Live
                </span>
              )}
            </div>
          </div>

          {/* Terminal */}
          <div className="overflow-hidden rounded-xl border border-gray-700 shadow-2xl">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 border-b border-gray-700 bg-gray-800 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />

              <div className="ml-3 flex items-center gap-2 text-xs text-gray-400">
                <Terminal className="h-3.5 w-3.5" />
                <span>deployment logs — pratham-portfolio</span>
              </div>
            </div>

            {/* Terminal Logs */}
            <div className="min-h-[420px] max-h-[520px] overflow-y-auto bg-gray-950 p-5 font-mono text-sm leading-relaxed text-green-400">
              {visibleLogs
                .filter(
                  (log): log is string =>
                    typeof log === "string"
                )
                .map((log, index) =>
                  log === "" ? (
                    <div
                      key={`empty-${index}`}
                      className="h-3"
                    />
                  ) : (
                    <div
                      key={`${index}-${log}`}
                      className={`animate-in fade-in slide-in-from-bottom-1 mb-0.5 duration-200 ${getLogColor(
                        log
                      )}`}
                    >
                      {formatLog(log)}
                    </div>
                  )
                )}

              {status === "building" && (
                <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-green-400 align-middle" />
              )}

              <div ref={logEndRef} />
            </div>
          </div>

          {/* Deployment Success */}
          {showRedirect && (
            <div className="animate-in fade-in slide-in-from-bottom-4 mt-8 flex flex-col items-center gap-3 duration-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                🎉 Your site has been deployed successfully!
              </p>

              <Button
                size="lg"
                onClick={handleVisitSite}
                className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-10 py-6 text-lg text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:from-green-600 hover:to-emerald-700 hover:shadow-green-500/30"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Visit Deployed Site
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}