import React from 'react';
import { homeArtefacts } from '../../../content/site';
import { Artefact } from '../../../content/types';
import { ArtefactFigure } from '../evidence';

function MarqueeSlides({ artefacts, clone = false }: { artefacts: Artefact[]; clone?: boolean }) {
  return (
    <>
      {artefacts.map((artefact) => (
        <div
          key={`${artefact.src}${clone ? '-clone' : ''}`}
          className={`artefact-marquee__slide${clone ? ' artefact-marquee__slide--clone' : ''}`}
          aria-hidden={clone ? true : undefined}
        >
          <ArtefactFigure artefact={artefact} compact linkTabbable={!clone} />
        </div>
      ))}
    </>
  );
}

function MarqueeRow({
  artefacts,
  reverse = false,
}: {
  artefacts: Artefact[];
  reverse?: boolean;
}) {
  return (
    <div className={`artefact-marquee__row${reverse ? ' artefact-marquee__row--reverse' : ''}`}>
      <div className="artefact-marquee__track">
        <MarqueeSlides artefacts={artefacts} />
        <MarqueeSlides artefacts={artefacts} clone />
      </div>
    </div>
  );
}

/** Compact gallery of concrete system and product artefacts (brief section 6.5). */
export function ArtefactGallery() {
  const topArtefacts = homeArtefacts.filter((_, index) => index % 2 === 0);
  const bottomArtefacts = homeArtefacts.filter((_, index) => index % 2 === 1);

  return (
    <section aria-labelledby="artefacts-heading" className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 id="artefacts-heading" className="mb-10 text-3xl font-bold text-purple-300 md:text-4xl">
          Artefacts, not adjectives
        </h2>
      </div>
      <div className="artefact-marquee">
        <MarqueeRow artefacts={topArtefacts} />
        <MarqueeRow artefacts={bottomArtefacts} reverse />
      </div>
    </section>
  );
}
