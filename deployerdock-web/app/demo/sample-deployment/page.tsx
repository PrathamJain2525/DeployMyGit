"use client";

import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";

export default function SampleDeploymentPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <nav className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <h1 className="text-xl font-bold">Pratham Jain</h1>

        <div className="flex items-center gap-6 text-sm text-gray-300">
          <a href="#about" className="hover:text-white">
            About
          </a>
          <a href="#projects" className="hover:text-white">
            Projects
          </a>
          <a href="#contact" className="hover:text-white">
            Contact
          </a>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 py-28 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <p className="text-purple-400 font-medium mb-4">
            Software Engineer
          </p>

          <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Building scalable
            <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              digital experiences
            </span>
          </h2>

          <p className="text-lg text-gray-400 max-w-xl mb-8">
            I build full-stack applications, deployment infrastructure and
            cloud-based systems using modern web technologies.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 font-medium"
            >
              View Projects
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="https://github.com/PrathamJain2525"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-700 hover:bg-gray-900"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-gray-900/70 p-8 shadow-2xl">
          <div className="font-mono text-sm space-y-3">
            <p className="text-gray-500">// deployed using DeployerDock</p>
            <p>
              <span className="text-purple-400">const</span>{" "}
              <span className="text-blue-400">developer</span> = {"{"}
            </p>
            <p className="pl-5">
              name: <span className="text-green-400">"Pratham Jain"</span>,
            </p>
            <p className="pl-5">
              university:{" "}
              <span className="text-green-400">
                "Delhi Technological University"
              </span>
              ,
            </p>
            <p className="pl-5">
              skills:{" "}
              <span className="text-green-400">
                ["Next.js", "Node.js", "AWS", "Docker"]
              </span>
              ,
            </p>
            <p className="pl-5">
              available: <span className="text-yellow-400">true</span>
            </p>
            <p>{"};"}</p>
          </div>
        </div>
      </section>

      <footer
        id="contact"
        className="border-t border-gray-800 py-8 text-center"
      >
        <div className="flex justify-center gap-5 mb-3">
          <Github className="w-5 h-5" />
          <Linkedin className="w-5 h-5" />
          <Mail className="w-5 h-5" />
        </div>

        <p className="text-sm text-gray-500">
          Demo website deployed through DeployerDock
        </p>
      </footer>
    </main>
  );
}