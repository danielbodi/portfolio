import { ArrowDown } from 'lucide-react';
import { Hero } from '../ui/components/home/Hero';
import { PositioningPillars } from '../ui/components/home/PositioningPillars';
import { FeaturedCases } from '../ui/components/home/FeaturedCases';
import { Capabilities } from '../ui/components/home/Capabilities';
import { ArtefactGallery } from '../ui/components/home/ArtefactGallery';
import { ContactCta } from '../ui/components/contact/ContactCta';
import { useSeo } from '../hooks/useSeo';
import { positioning } from '../content/site';

export function Home() {
  useSeo({
    title: positioning.seoTitle,
    description: positioning.seoDescription,
    path: '/'
  });

  return (
    <>
      <div className="home-hero-viewport">
        <Hero />
        <PositioningPillars />
        <a href="#selected-work" className="home-hero__scroll-cue">
          <span>See my work</span>
          <ArrowDown
            size={16}
            strokeWidth={1.8}
            aria-hidden="true"
            className="home-hero__scroll-icon"
          />
        </a>
      </div>
      <FeaturedCases />
      <Capabilities />
      <ArtefactGallery />
      <ContactCta from="/" />

      {/* Bottom spacing for mobile navigation */}
      <div className="h-16 md:h-0"></div>
    </>
  );
}
