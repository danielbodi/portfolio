import type { VisualStory, VisualStoryMedia } from '../content/caseStudies/visualStories';

function mediaText(media: VisualStoryMedia): string[] {
  if (media.kind === 'system-evidence') return [];
  if (media.kind === 'live-demo') {
    return [media.label, media.title, media.description, media.provenance].filter((part): part is string => Boolean(part));
  }
  return [media.label, media.caption, media.myPart].filter((part): part is string => Boolean(part));
}

/** Consistent editorial estimate for the five visual case studies. */
export function storyReadingMinutes(story: VisualStory): number {
  const text = [
    story.title,
    story.statement,
    ...story.glance.flatMap(({ label, value }) => [label, value]),
    ...story.facts.flatMap(({ label, value }) => [label, value]),
    ...(story.jumpTo?.map(({ label }) => label) ?? []),
    ...mediaText(story.heroMedia),
    ...story.chapters.flatMap((chapter) => [
      chapter.eyebrow,
      chapter.title,
      ...chapter.paragraphs,
      ...Object.values(chapter.decision ?? {}),
      chapter.evidenceLine ?? '',
      ...(chapter.sequence?.flatMap(({ label, text: stepText }) => [label, stepText]) ?? []),
      ...chapter.media.flatMap(mediaText),
      ...(chapter.sources?.map(({ label }) => label) ?? []),
    ]),
    story.outcomesTitle,
    ...story.outcomes.flatMap(({ label, text: outcomeText }) => [label, outcomeText]),
    story.reflection.repeat,
    ...[story.reflection.change].flat(),
    story.reflection.next,
  ].join(' ').replace(/<[^>]*>/g, ' ');

  const wordCount = text.match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu)?.length ?? 0;
  return Math.max(1, Math.ceil(wordCount / 220));
}
