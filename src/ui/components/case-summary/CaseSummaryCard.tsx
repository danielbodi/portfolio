import React from 'react';
import { Card } from '../cards/Card';
import { ThumbsUp } from 'lucide-react';

interface CaseSummaryCardProps {
  challenge: {
    title: string;
    description: string[];
  };
  solution: {
    title: string;
    description: string[];
  };
  index: number;
}

export function CaseSummaryCard({ challenge, solution, index }: CaseSummaryCardProps) {
  const getTargetId = (title: string) => {
    const idMap: Record<string, string> = {
      'Missing Design Structure': 'lack-of-design-system',
      'Technical Uncertainty': 'custom-development-challenges',
      'Limited Resources': 'limited-research-time',
      'Systematic Foundation': 'addressing-design-system',
      'Knowledge Transfer': 'addressing-development',
      'Process Adaption': 'addressing-research'
    };
    return idMap[title] || '';
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 140;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row">
      {/* Challenge Card */}
      <Card className="flex flex-1" variant="nested" showShadow>
        <div className="grid grid-rows-[auto_1fr] h-full gap-6">
          {/* Header row */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                <path d="M5.02244 18.6562C5.02244 19.0711 5.35759 19.4062 5.77244 19.4062H19.2256C19.6404 19.4062 19.9756 19.0711 19.9756 18.6562V13.1953C19.9756 9.06563 16.6287 5.71875 12.499 5.71875C8.36931 5.71875 5.02244 9.06563 5.02244 13.1953V18.6562ZM6.70994 13.1953C6.70994 9.99844 9.30213 7.40625 12.499 7.40625C15.6959 7.40625 18.2881 9.99844 18.2881 13.1953V17.7188H9.96775V13.7109C9.96775 13.582 9.86228 13.4766 9.73338 13.4766H8.70213C8.57322 13.4766 8.46775 13.582 8.46775 13.7109V17.7188H6.70994V13.1953ZM5.58259 7.27734L6.51072 6.34922C6.58338 6.27656 6.58338 6.15703 6.51072 6.08438L4.91931 4.49297C4.88407 4.45807 4.83648 4.4385 4.78689 4.4385C4.7373 4.4385 4.68971 4.45807 4.65447 4.49297L3.72634 5.42109C3.69145 5.45633 3.67188 5.50392 3.67188 5.55352C3.67188 5.60311 3.69145 5.6507 3.72634 5.68594L5.31775 7.27734C5.39041 7.35 5.50759 7.35 5.58259 7.27734ZM21.2763 5.42109L20.3482 4.49297C20.313 4.45807 20.2654 4.4385 20.2158 4.4385C20.1662 4.4385 20.1186 4.45807 20.0834 4.49297L18.492 6.08438C18.4571 6.11962 18.4375 6.1672 18.4375 6.2168C18.4375 6.26639 18.4571 6.31398 18.492 6.34922L19.4201 7.27734C19.4928 7.35 19.6123 7.35 19.6849 7.27734L21.2763 5.68594C21.349 5.61094 21.349 5.49375 21.2763 5.42109ZM19.999 20.9062H4.999C4.58416 20.9062 4.249 21.2414 4.249 21.6562V22.2188C4.249 22.3219 4.33338 22.4062 4.4365 22.4062H20.5615C20.6646 22.4062 20.749 22.3219 20.749 22.2188V21.6562C20.749 21.2414 20.4138 20.9062 19.999 20.9062ZM11.8428 4.21875H13.1553C13.2584 4.21875 13.3428 4.13438 13.3428 4.03125V1.78125C13.3428 1.67812 13.2584 1.59375 13.1553 1.59375H11.8428C11.7396 1.59375 11.6553 1.67812 11.6553 1.78125V4.03125C11.6553 4.13438 11.7396 4.21875 11.8428 4.21875Z" fill="#B490FF"/>
              </svg>
            </div>
            <h4 className="text-xl font-semibold">{challenge.title}</h4>
          </div>

          {/* Content row */}
          <div className="grid grid-rows-[1fr_auto] gap-6">
            <ul className="list-disc pl-4 space-y-2 text-gray-400">
              {challenge.description.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <a 
              href={`#${getTargetId(challenge.title)}`}
              className="c-button c-button--secondary w-fit"
            >
              Read more
            </a>
          </div>
        </div>
      </Card>

      {/* Triangles connector */}
      <div className="hidden sm:flex items-center">
        <div className="flex flex-col items-center gap-1">
          {/* Left triangle */}
          <svg xmlns="http://www.w3.org/2000/svg" width="27" height="32" viewBox="0 0 27 32" fill="none" className="w-7 h-8">
            <path d="M0.571904 31.0981L0.571901 0.217283L26.3355 15.5063L0.571904 31.0981Z" fill="#37373E"/>
          </svg>

          {/* Right triangle */}
          <svg xmlns="http://www.w3.org/2000/svg" width="27" height="32" viewBox="0 0 27 32" fill="none" className="w-7 h-8">
            <path d="M26.3353 0.336426L26.3353 31.2173L0.571777 15.9282L26.3353 0.336426Z" fill="#37373E"/>
          </svg>
        </div>
      </div>

      {/* Mobile triangles (vertical) */}
      <div className="flex sm:hidden h-7 items-center justify-center">
        <div className="flex flex-row items-center gap-1">
          {/* Down triangle */}
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="27" viewBox="0 0 32 27" fill="none" className="w-8 h-7">
            <path d="M0.217283 0.571904L31.0981 0.571901L15.8091 26.3355L0.217283 0.571904Z" fill="#37373E"/>
          </svg>

          {/* Up triangle */}
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="27" viewBox="0 0 32 27" fill="none" className="w-8 h-7">
            <path d="M31.2173 26.3353L0.336426 26.3353L15.6255 0.571777L31.2173 26.3353Z" fill="#37373E"/>
          </svg>
        </div>
      </div>

      {/* Solution Card */}
      <Card className="flex-1" variant="nested" showShadow>
        <div className="grid grid-rows-[auto_1fr] h-full gap-6">
          {/* Header row */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0">
              <ThumbsUp className="w-5 h-5 text-purple-400" />
            </div>
            <h4 className="text-xl font-semibold">{solution.title}</h4>
          </div>

          {/* Content row */}
          <div className="grid grid-rows-[1fr_auto] gap-6">
            <ul className="list-disc pl-4 space-y-2 text-gray-400">
              {solution.description.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <a 
              href={`#${getTargetId(solution.title)}`}
              className="c-button c-button--secondary w-fit"
            >
              Read more
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
}