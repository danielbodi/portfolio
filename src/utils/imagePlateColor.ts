const CORNER_SIZE = 8;

const cache = new Map<string, string>();

function bucketKey(r: number, g: number, b: number): number {
  return ((r >> 4) << 8) | ((g >> 4) << 4) | (b >> 4);
}

function addSample(
  buckets: Map<number, { n: number; r: number; g: number; b: number }>,
  r: number,
  g: number,
  b: number
) {
  const key = bucketKey(r, g, b);
  const bucket = buckets.get(key);
  if (bucket) {
    bucket.n += 1;
    bucket.r += r;
    bucket.g += g;
    bucket.b += b;
    return;
  }
  buckets.set(key, { n: 1, r, g, b });
}

function bestBucketColor(
  buckets: Map<number, { n: number; r: number; g: number; b: number }>
): string | null {
  let best: { n: number; r: number; g: number; b: number } | null = null;
  for (const bucket of buckets.values()) {
    if (!best || bucket.n > best.n) best = bucket;
  }
  if (!best) return null;
  return `rgb(${Math.round(best.r / best.n)}, ${Math.round(best.g / best.n)}, ${Math.round(best.b / best.n)})`;
}

/**
 * Colour for object-fit letterboxing. Reads the four corners of the original
 * bitmap so a thin Figma chrome strip is not diluted by the canvas when the
 * image is downscaled.
 */
export function sampleImagePlateColor(image: HTMLImageElement): string | null {
  const width = image.naturalWidth;
  const height = image.naturalHeight;
  if (!width || !height) return null;

  const size = Math.min(CORNER_SIZE, width, height);
  const canvas = document.createElement('canvas');
  canvas.width = size * 2;
  canvas.height = size * 2;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) return null;

  try {
    context.drawImage(image, 0, 0, size, size, 0, 0, size, size);
    context.drawImage(image, width - size, 0, size, size, size, 0, size, size);
    context.drawImage(image, 0, height - size, size, size, 0, size, size, size);
    context.drawImage(image, width - size, height - size, size, size, size, size, size, size);

    const { data } = context.getImageData(0, 0, size * 2, size * 2);
    const buckets = new Map<number, { n: number; r: number; g: number; b: number }>();

    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] < 128) continue;
      addSample(buckets, data[i], data[i + 1], data[i + 2]);
    }

    return bestBucketColor(buckets);
  } catch {
    return null;
  }
}

export function getCachedImagePlateColor(src: string): string | undefined {
  return cache.get(src);
}

export function setCachedImagePlateColor(src: string, color: string): void {
  cache.set(src, color);
}
