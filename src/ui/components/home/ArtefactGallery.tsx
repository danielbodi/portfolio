import React from 'react';
import { homeArtefacts } from '../../../content/site';
import { ArtefactFigure } from '../evidence';

/** Compact gallery of concrete system and product artefacts (brief section 6.5). */
export function ArtefactGallery() {
  return (
    <section aria-labelledby="artefacts-heading" className="px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 id="artefacts-heading" className="mb-3 text-3xl font-bold text-purple-300 md:text-4xl">
          Artefacts, not adjectives
        </h2>
        <p className="mb-10 max-w-2xl text-gray-400">
          Concrete pieces of the work: production UI, tokens, documentation and validated models.
          Every item is labeled with its delivery state.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homeArtefacts.map((artefact) => (
            <ArtefactFigure key={artefact.src} artefact={artefact} compact />
          ))}
        </div>
      </div>
    </section>
  );
}
