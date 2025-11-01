"use client";

import { Marquee } from "@/components/ui/marquee";
import ProjectCard from "@/components/ui/project-card";
import { Briefcase, Gavel } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState, useRef, useLayoutEffect, useEffect } from "react";

const TEXTS = ["fullstack dev", "design engineer", "gamer", "student"];
const SIDE_PADDING = 35;
const SKILLS = [
  "React",
  "Next.js",
  "TypeScript",
  "Express",
  "Prisma",
  "Docker",
  "Node.js",
  "Websocket",
  "PostgreSQL",
  "MongoDB",
  "Tanstack Query",
  "Rest APIs",
  "Tailwind CSS",
  "ShadCN",
  "Framer Motion",
];
const PROJECTS = [
  {
    title: "Excalidraw Clone",
    description:
      "A clone of Excalidraw, a whiteboard tool that allows you to create beautiful diagrams and sketches. with infinite canvas.",
    technologies: ["Next.js", "Tailwind CSS", "ShadCN", "Canvas API"],
    codeLink: "https://github.com/ishyverma/excalidraw",
    video: "/Excalidraw.mp4",
    date: "Apr 2025",
    website: "https://excalidraw-web-virid.vercel.app/",
  },
  {
    title: "Web Based Wallet",
    description:
      "A web-based cryptocurrency wallet that supports Solana and Ethereum, allowing users to create and manage wallets securely",
    technologies: ["Next.js", "Tailwind CSS", "ShadCN"],
    codeLink: "https://github.com/ishyverma/phantom",
    image: "/Phantom.png",
    date: "Mar 2025",
    website: "https://phantom-wallet-two.vercel.app/",
  },
  {
    title: "100xBlogs",
    description:
      "A blog website that allows users to write blogs and share them with others but in a better way. User can write blogs in markdown and preview it before publishing.",
    technologies: ["Next.js", "Prisma", "Clerk", "Tailwind CSS", "ShadCN"],
    codeLink: "https://github.com/ishyverma/medium",
    image: "/100xBlogs.png",
    date: "Mar 2025",
    website: "https://medium-theta-peach.vercel.app/",
  },
  {
    title: "Savvy.ai",
    description:
      "A second brain for your ideas, projects, and thoughts. A place to store your ideas and thoughts in a structured way. User can create notes, projects, and thoughts and store them in a structured way.",
    technologies: ["Next.js", "Prisma", "NextAuth", "Tailwind CSS", "ShadCN"],
    codeLink: "https://github.com/ishyverma/savvy.ai",
    video: "/Savvy.mp4",
    date: "Mar 2025",
    website: "https://savvy-ai.vercel.app/",
  },
  {
    title: "Git Brief - Summarizing GitHub Repos Instantly",
    description:
      "No more scrolling through endless commits & READMEs! Git Brief fetches repo insights & generates quick summaries from recent commits.",
    technologies: [
      "Next.js",
      "tRPC",
      "Prisma",
      "Tailwind CSS",
      "ShadCN",
      "Gemini",
      "Clerk",
    ],
    codeLink: "https://github.com/ishyverma/git-brief",
    video: "/GitBrief.mp4",
    date: "Mar 2025",
  },
  {
    title: "Great Frontend Clone",
    description: "A clone of Great Frontend, that was very frontend focused.",
    technologies: ["Next.js", "Tailwind CSS"],
    codeLink: "https://github.com/ishyverma/greatfrontend",
    image: "/GreatFrontend.png",
    date: "Feb 2025",
    website: "https://greatfrontend-five.vercel.app/",
  },
  {
    title: "Thinkr",
    description:
      "An AI-powered learning assistant that makes learning more engaging and interactive!",
    technologies: [
      "Next.js",
      "Prisma",
      "NextAuth",
      "Tailwind CSS",
      "ShadCN",
      "Pinecone",
      "Gemini",
      "Vercel AI SDK",
    ],
    codeLink: "https://github.com/ishyverma/thinkr",
    image: "/Thinkr.png",
    date: "Feb 2025",
    website: "https://thinkr-omega.vercel.app/",
  },
  {
    title: "Gather",
    description:
      "A website where users can create their own rooms and share them with others. User can move around the room and interact with others. User can also add their own custom objects to the room.",
    technologies: [
      "Next.js",
      "Prisma",
      "Express",
      "WebSockets",
      "Tailwind CSS",
      "Turborepo",
    ],
    codeLink: "https://github.com/ishyverma/zep",
    image: "/Gather.png",
    date: "Jan 2025",
    videoDemo: "https://www.loom.com/share/5b631caf5f434a959153ae284fb5ce3b",
  },
];

const AnimatedText = ({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) => {
  const letterParent = {
    hidden: {},
    show: {
      transition: {
        delayChildren: delay - 0.1,
      },
    },
  } as const;

  const letterChild = {
    hidden: { opacity: 0.2, filter: "blur(10px)" },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      transition: { ease: [0.48, 0.23, 0.32, 0.98] },
    },
  } as const;

  return (
    <motion.span
      variants={letterParent}
      initial="hidden"
      animate="show"
      className={className}
      style={{ display: "inline-block" }}
    >
      {text.split("").map((char, i) =>
        char === " " ? (
          <span key={i}>&nbsp;</span>
        ) : (
          <motion.span
            key={i}
            variants={letterChild}
            style={{ display: "inline-block" }}
          >
            {char}
          </motion.span>
        )
      )}
    </motion.span>
  );
};

export default function Home() {
  const [index, setIndex] = useState(0);
  const [textWidth, setTextWidth] = useState(0);
  const measureRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    if (measureRef.current) {
      setTextWidth(measureRef.current.offsetWidth);
    }
  }, [index]);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % TEXTS.length),
      3000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 15%, black 100%)",
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 15%, black 100%)",
      }}
      className="px-1 z-100 overflow-auto scrollbar-hide border-dashed py-[10%] h-[100vh] relative"
    >
      <motion.div
        className="text-[60px] leading-[63px] tracking-[-4.8px] font-medium"
      >
        I'm{" "}
        <span className="text-[#727272]">
          Shyam{" "}
        </span>
        (shy)
        <br />
        <div className="flex items-center">
          <span className="mr-4">
            a
          </span>
          <div>
            <motion.button
              className="italic font-[geist-unique]"
              style={{
                marginTop: 10,
                marginBottom: 10,
                cursor: "default",
                fontSize: "1.4rem",
                borderRadius: 14,
                border: "none",
                fontWeight: 700,
                color: "#fff",
                position: "relative",
                background:
                  "linear-gradient(207deg, rgb(64, 0, 255) 0%, rgb(114, 71, 255) 37.07%, rgb(91, 36, 255) 61.97%, rgb(83, 25, 255) 86.13%, rgb(64, 0, 255) 100%)",
                boxShadow: `rgba(255, 255, 255, 0.29) -4px -6px 17px 0px inset,
                            rgba(30, 0, 255, 0.06) 0.301094px 0.240875px 0.385588px 0px inset,
                            rgba(30, 0, 255, 0.23) 1.14427px 0.915413px 1.46538px 0px inset,
                            rgb(30, 0, 255) 5px 4px 6.40312px 0px inset,
                            rgba(30, 0, 255, 0.11) 0px 0.923783px 0.923783px -0.46875px,
                            rgba(30, 0, 255, 0.11) 0px 2.18953px 2.18953px -0.9375px,
                            rgba(30, 0, 255, 0.11) 0px 3.99392px 3.99392px -1.40625px,
                            rgba(30, 0, 255, 0.1) 0px 6.63989px 6.63989px -1.875px,
                            rgba(30, 0, 255, 0.1) 0px 10.7229px 10.7229px -2.34375px,
                            rgba(30, 0, 255, 0.09) 0px 17.5523px 17.5523px -2.8125px,
                            rgba(30, 0, 255, 0.07) 0px 30.2239px 30.2239px -3.28125px,
                            rgba(30, 0, 255, 0.04) 0px 55px 55px -3.75px`,
                opacity: 1,
                willChange: "auto",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                whiteSpace: "nowrap",
                minHeight: "70px",
                padding: `0 ${SIDE_PADDING}px`,
              }}
              animate={{ width: textWidth + SIDE_PADDING * 2 }}
              transition={{
                type: "spring",
                stiffness: 340,
                damping: 38,
                mass: 1,
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0.2 }}
                  exit={{ opacity: 0.2 }}
                  className="text-[60px] pb-1 tracking-[-4.8px] font-medium"
                  style={{ whiteSpace: "nowrap" }}
                  ref={measureRef}
                >
                  {TEXTS[index]}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
        based in{" "}
        <span className="text-[#727272]">
          delhi{" "}
        </span>
        (india).
      </motion.div>
      <p className="mt-20 flex items-center text-[30px] gap-2 leading-[63px] tracking-[-2px] font-[550] text-[#727272]">
        Skills <Briefcase className="w-9 h-9" />
      </p>
      <div
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12..5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)",
          maskImage:
            "linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)",
        }}
        className="absolute left-0 right-0 w-full"
      >
        <Marquee className="[--duration:40s]">
          {SKILLS.map((skill, index) => (
            <button
              key={index}
              className="text-white tracking-[-0.9px] flex items-center justify-center"
              style={{
                padding: "4px 20px",
                backgroundColor:
                  "var(--token-2759885a-0605-4b0d-ae5f-9a938c3766f2, rgb(0, 0, 0))",
                borderRadius: "24px",
                boxShadow: "inset 0px 2px 4px 0px rgba(255, 255, 255, 0.4)",
                willChange: "auto",
                transform: "none",
                transformOrigin: "50% 50% 0px",
              }}
            >
              {skill}
            </button>
          ))}
        </Marquee>
        <Marquee reverse className="[--duration:40s]">
          {SKILLS.map((skill, index) => (
            <button
              key={index}
              className="text-white tracking-[-0.9px] flex items-center justify-center"
              style={{
                padding: "4px 20px",
                backgroundColor:
                  "var(--token-2759885a-0605-4b0d-ae5f-9a938c3766f2, rgb(0, 0, 0))",
                borderRadius: "24px",
                boxShadow: "inset 0px 2px 4px 0px rgba(255, 255, 255, 0.4)",
                willChange: "auto",
                transform: "none",
                transformOrigin: "50% 50% 0px",
              }}
            >
              {skill}
            </button>
          ))}
        </Marquee>
      </div>
      <p className="mt-50 -mb-4 flex items-center text-[30px] gap-2 leading-[63px] tracking-[-2px] font-[550] text-[#727272]">
        Built <Gavel className="w-8 h-8" />
      </p>
      <div>
        {PROJECTS.map((proj, idx) => (
          <ProjectCard
            idx={idx}
            key={proj.title}
            title={proj.title}
            type={proj.description}
            href={proj.website || proj.videoDemo || "#"}
          />
        ))}
      </div>
      <div className="lg:text-[60px] md:text-[50px] md:tracking-[-3.8px] text-[40px] tracking-[-2.8px] flex flex-col sm:flex-row sm:items-center gap-2 leading-[63px] lg:tracking-[-4.8px] font-medium mt-20">
        You can reach me on
        <a
          href="https://x.com/ishyverma"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
          className="sm:inline-block hidden"
        >
          <img
            src="/twitter.webp"
            alt="Twitter"
            className="w-15 h-15 rounded-xl border-4 border-white"
          />
        </a>
        ,
        <a
          href="https://www.linkedin.com/in/ishyverma/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="sm:inline-block hidden"
        >
          <img
            className="aspect-square rounded-xl border-4 border-white h-15 w-15"
            src="https://media.licdn.com/dms/image/v2/C560BAQHaVYd13rRz3A/company-logo_100_100/company-logo_100_100/0/1638831590218/linkedin_logo?e=1763596800&v=beta&t=CvRJL4eoCVeUNgVZ-ZJUIDQGOU7bgfxpdnyUSG53LMQ"
            alt=""
          />
        </a>
        <div className="flex sm:hidden items-center gap-2">
          <a
            href="https://x.com/ishyverma"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <img
              src="/twitter.webp"
              alt="Twitter"
              className="w-15 h-15 rounded-xl border-4 border-white"
            />
          </a>
          ,
          <a
            href="https://www.linkedin.com/in/ishyverma/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <img
              className="aspect-square rounded-xl border-4 border-white h-15 w-15"
              src="https://media.licdn.com/dms/image/v2/C560BAQHaVYd13rRz3A/company-logo_100_100/company-logo_100_100/0/1638831590218/linkedin_logo?e=1763596800&v=beta&t=CvRJL4eoCVeUNgVZ-ZJUIDQGOU7bgfxpdnyUSG53LMQ"
              alt=""
            />
          </a>
        </div>
      </div>
      <div className="lg:text-[60px] md:text-[50px] md:tracking-[-3.8px] text-[40px] tracking-[-2.8px] flex items-center gap-2 leading-[63px] lg:tracking-[-4.8px] font-medium">
        or
        <a
          href="mailto:ishyamver@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Email"
        >
          <p
            className="bg-[linear-gradient(207deg,#4000ff_0%,#7247ff_37%,#5b24ff_61%,#5319ff_86%,#4000ff_100%)]
      bg-clip-text
      text-transparent pr-3"
          >
            by email
          </p>
        </a>
      </div>
    </div>
  );
}
