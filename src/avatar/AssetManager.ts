import type { AvatarAssetId, LoadedAsset } from './types';
import { ALL_ASSET_IDS } from './types';

const bundledUrls = import.meta.glob<string>('../assets/avatar/*.png', {
  eager: true,
  query: '?url',
  import: 'default',
});

function assetFileName(id: AvatarAssetId): string {
  return `${id}.png`;
}

function resolveBundledUrl(id: AvatarAssetId): string | null {
  const key = `../assets/avatar/${assetFileName(id)}`;
  return bundledUrls[key] ?? null;
}

function drawPlaceholder(
  ctx: CanvasRenderingContext2D,
  id: AvatarAssetId,
  accent: string,
  eyeColor: string,
): void {
  const w = 200;
  const h = 240;
  ctx.clearRect(0, 0, w, h);

  const fill = (color: string, alpha = 1) => {
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
  };

  switch (id) {
    case 'hair_back':
      fill(accent, 0.5);
      ctx.beginPath();
      ctx.ellipse(100, 70, 58, 50, 0, 0, Math.PI * 2);
      ctx.fill();
      break;
    case 'tail':
      fill(accent, 0.65);
      ctx.beginPath();
      ctx.moveTo(100, 175);
      ctx.quadraticCurveTo(130, 200, 115, 225);
      ctx.quadraticCurveTo(100, 215, 85, 225);
      ctx.quadraticCurveTo(70, 200, 100, 175);
      ctx.fill();
      break;
    case 'body':
      fill(accent, 0.85);
      ctx.beginPath();
      ctx.ellipse(100, 155, 52, 62, 0, 0, Math.PI * 2);
      ctx.fill();
      break;
    case 'ears':
      fill(accent, 0.9);
      ctx.beginPath();
      ctx.moveTo(58, 55);
      ctx.lineTo(48, 22);
      ctx.lineTo(72, 45);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(142, 55);
      ctx.lineTo(152, 22);
      ctx.lineTo(128, 45);
      ctx.closePath();
      ctx.fill();
      break;
    case 'eyes_open':
      fill('#1a1a2e');
      ctx.beginPath();
      ctx.ellipse(82, 82, 11, 13, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(118, 82, 11, 13, 0, 0, Math.PI * 2);
      ctx.fill();
      fill(eyeColor);
      ctx.beginPath();
      ctx.arc(84, 83, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(120, 83, 5, 0, Math.PI * 2);
      ctx.fill();
      fill('#ffffff', 0.8);
      ctx.beginPath();
      ctx.arc(86, 81, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(122, 81, 2, 0, Math.PI * 2);
      ctx.fill();
      break;
    case 'eyes_closed':
      fill(accent, 0.95);
      ctx.lineWidth = 3;
      ctx.strokeStyle = accent;
      ctx.beginPath();
      ctx.moveTo(70, 82);
      ctx.quadraticCurveTo(82, 88, 94, 82);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(106, 82);
      ctx.quadraticCurveTo(118, 88, 130, 82);
      ctx.stroke();
      break;
    case 'mouth_neutral':
      fill('#1a1a2e', 0.5);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(26,26,46,0.5)';
      ctx.beginPath();
      ctx.moveTo(92, 102);
      ctx.quadraticCurveTo(100, 108, 108, 102);
      ctx.stroke();
      break;
    case 'hair_front':
      fill(accent, 0.75);
      ctx.beginPath();
      ctx.ellipse(100, 62, 50, 28, 0, 0, Math.PI * 2);
      ctx.fill();
      break;
    case 'glasses':
      fill('rgba(100,255,218,0.3)');
      ctx.strokeStyle = '#64ffda';
      ctx.lineWidth = 2;
      ctx.strokeRect(68, 72, 30, 22);
      ctx.strokeRect(102, 72, 30, 22);
      ctx.beginPath();
      ctx.moveTo(98, 83);
      ctx.lineTo(102, 83);
      ctx.stroke();
      break;
    case 'hoodie':
      fill('#3949ab', 0.55);
      ctx.beginPath();
      ctx.moveTo(45, 120);
      ctx.lineTo(55, 85);
      ctx.lineTo(145, 85);
      ctx.lineTo(155, 120);
      ctx.lineTo(155, 200);
      ctx.lineTo(45, 200);
      ctx.closePath();
      ctx.fill();
      break;
    case 'raincoat':
      fill('#1565c0', 0.45);
      ctx.fillRect(42, 95, 116, 130);
      fill('#1565c0', 0.6);
      ctx.beginPath();
      ctx.moveTo(42, 95);
      ctx.lineTo(100, 75);
      ctx.lineTo(158, 95);
      ctx.fill();
      break;
    case 'bowtie':
      fill('#90caf9');
      ctx.beginPath();
      ctx.moveTo(100, 112);
      ctx.lineTo(88, 105);
      ctx.lineTo(88, 119);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(100, 112);
      ctx.lineTo(112, 105);
      ctx.lineTo(112, 119);
      ctx.closePath();
      ctx.fill();
      ctx.fillRect(97, 110, 6, 6);
      break;
    case 'headphones':
      fill('#9c27b0', 0.7);
      ctx.beginPath();
      ctx.arc(100, 80, 52, Math.PI, 0);
      ctx.lineWidth = 6;
      ctx.strokeStyle = '#ce93d8';
      ctx.stroke();
      ctx.fillRect(38, 75, 14, 28);
      ctx.fillRect(148, 75, 14, 28);
      break;
    case 'helmet':
      fill('#e64a19', 0.65);
      ctx.beginPath();
      ctx.arc(100, 78, 52, Math.PI, 0);
      ctx.fill();
      ctx.fillRect(48, 78, 104, 18);
      break;
    default:
      fill(accent, 0.5);
      ctx.fillRect(60, 60, 80, 80);
  }

  ctx.globalAlpha = 1;
}

function createPlaceholderDataUrl(
  id: AvatarAssetId,
  accent: string,
  eyeColor: string,
): string {
  const canvas = document.createElement('canvas');
  canvas.width = 200;
  canvas.height = 240;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  drawPlaceholder(ctx, id, accent, eyeColor);
  return canvas.toDataURL('image/png');
}

function loadImage(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load ${url}`));
    img.src = url;
  });
}

export class AssetManager {
  private cache = new Map<string, LoadedAsset>();
  private inflight = new Map<string, Promise<LoadedAsset>>();
  private defaultAccent = '#4a90a4';
  private defaultEyeColor = '#7ec8e3';
  private preloaded = false;

  setThemeColors(accent: string, eyeColor: string): void {
    this.defaultAccent = accent;
    this.defaultEyeColor = eyeColor;
  }

  async load(id: AvatarAssetId): Promise<LoadedAsset> {
    const cacheKey = id;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    const pending = this.inflight.get(cacheKey);
    if (pending) return pending;

    const promise = this.loadInternal(id);
    this.inflight.set(cacheKey, promise);

    try {
      const asset = await promise;
      this.cache.set(cacheKey, asset);
      return asset;
    } finally {
      this.inflight.delete(cacheKey);
    }
  }

  private async loadInternal(id: AvatarAssetId): Promise<LoadedAsset> {
    const bundled = resolveBundledUrl(id);

    if (bundled) {
      try {
        await loadImage(bundled);
        return { id, src: bundled, isPlaceholder: false };
      } catch {
        // fall through to placeholder
      }
    }

    const src = createPlaceholderDataUrl(id, this.defaultAccent, this.defaultEyeColor);
    return { id, src, isPlaceholder: true };
  }

  async preload(accent?: string, eyeColor?: string): Promise<void> {
    if (accent) this.defaultAccent = accent;
    if (eyeColor) this.defaultEyeColor = eyeColor;

    await Promise.all(ALL_ASSET_IDS.map((id) => this.load(id)));
    this.preloaded = true;
  }

  isPreloaded(): boolean {
    return this.preloaded;
  }

  getCached(id: AvatarAssetId): LoadedAsset | null {
    return this.cache.get(id) ?? null;
  }

  clearCache(): void {
    this.cache.clear();
    this.inflight.clear();
    this.preloaded = false;
  }
}

export const assetManager = new AssetManager();
