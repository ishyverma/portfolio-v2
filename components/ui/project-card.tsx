import { ArrowUpRight } from "lucide-react";
import React from "react";

type ProjectCardProps = {
    title: string;
    type?: string;
    href: string;
    idx: number;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ idx, title, type, href }) => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group"
        tabIndex={0}
        aria-label={`View project: ${title}`}
      >
        <div>
            <span className="text-[20px] font-medium tracking-[-1px] flex items-center gap-1 mt-6">
                {idx + 1}. {title}
                <div>
                    <ArrowUpRight className="w-5 h-5 self-center hidden group-hover:block transition-all" />
                </div>
            </span>
            <p className="text-[14px] font-medium text-[#727272] mt-1 tracking-tighter">{type}</p>
        </div>
      </a>
    );
  };

export default ProjectCard;