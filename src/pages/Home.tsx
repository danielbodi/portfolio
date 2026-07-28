import React from 'react';
import { Hero } from '../ui/components/home/Hero';
import { ProofBar } from '../ui/components/home/ProofBar';
import { FeaturedCases } from '../ui/components/home/FeaturedCases';
import { Capabilities } from '../ui/components/home/Capabilities';
import { ArtefactGallery } from '../ui/components/home/ArtefactGallery';
import { CareerStrip } from '../ui/components/home/CareerStrip';
import { ContactCta } from '../ui/components/home/ContactCta';
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
      <Hero />
      <ProofBar />
      <FeaturedCases />
      <Capabilities />
      <ArtefactGallery />
      <CareerStrip />
      <ContactCta />

      {/* Bottom spacing for mobile navigation */}
      <div className="h-16 md:h-0"></div>
    </>
  );
}
