import fs from "node:fs";
import path from "node:path";
import { load } from "js-yaml";
import { imageSize } from "image-size";

const contentDir = path.join(process.cwd(), "src/content");

function readYaml<T>(relPath: string): T {
  const file = path.join(contentDir, relPath);
  const raw = fs.readFileSync(file, "utf-8");
  return load(raw) as T;
}

export interface Social {
  platform: "linkedin" | "instagram" | "tiktok" | "youtube";
  url: string;
}

export interface Home {
  name: string;
  tagline: string;
  ctaLabel: string;
  heroVideo: string;
  socials: Social[];
}

export interface SectionItem {
  slug: string;
  title: string;
  year: string;
  cover: string;
  intro: string;
}

export interface Sections {
  workTitle: string;
  workSubtitle: string;
  items: SectionItem[];
}

export interface VideoItem {
  title: string;
  description?: string;
  // Either an embed URL (YouTube, Vimeo, Adobe) ...
  embed?: string;
  // ... or a video file hosted on this site, with its cover image.
  video?: string;
  poster?: string;
  // Optional heading: items sharing the same text are listed together.
  section?: string;
}

export interface VideoWithSize extends VideoItem {
  posterWidth?: number;
  posterHeight?: number;
}

export interface VideoList {
  items: VideoItem[];
}

export interface PhotoItem {
  image: string;
  category: "u20-world-cup" | "portrait" | "sport" | "travel";
  group?: string;
  caption?: string;
}

export interface PhotoWithSize extends PhotoItem {
  width?: number;
  height?: number;
}

export interface PhotoList {
  items: PhotoItem[];
}

export function getHome(): Home {
  return readYaml<Home>("home/home.yaml");
}

export function getSections(): Sections {
  return readYaml<Sections>("sections/sections.yaml");
}

export function getSection(slug: string): SectionItem | undefined {
  return getSections().items.find((item) => item.slug === slug);
}

// For hosted video files, reads the cover image size so the player can use
// the right aspect ratio (vertical or horizontal).
function withPosterSize(items: VideoItem[]): VideoWithSize[] {
  return items.map((item) => {
    if (!item.poster) return item;
    try {
      const { width, height } = imageSize(fs.readFileSync(path.join(process.cwd(), "public", item.poster)));
      return { ...item, posterWidth: width, posterHeight: height };
    } catch {
      return item;
    }
  });
}

export function getVideoItems(): VideoWithSize[] {
  return withPosterSize(readYaml<VideoList>("video/video.yaml").items);
}

export function getShortFormItems(): VideoWithSize[] {
  return withPosterSize(readYaml<VideoList>("short-form/short-form.yaml").items);
}

export function getVideoEditingItems(): VideoWithSize[] {
  return withPosterSize(readYaml<VideoList>("video-editing/video-editing.yaml").items);
}

// Reads each photo's real dimensions from /public so the gallery can lay
// photos out by their true aspect ratio (landscape and portrait mixed).
export function getPhotoItems(): PhotoWithSize[] {
  return readYaml<PhotoList>("photos/photos.yaml").items.map((item) => {
    try {
      const file = path.join(process.cwd(), "public", item.image);
      const { width, height } = imageSize(fs.readFileSync(file));
      return { ...item, width, height };
    } catch {
      return item;
    }
  });
}
