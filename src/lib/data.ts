import fs from "node:fs";
import path from "node:path";
import { load } from "js-yaml";

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
  embed: string;
}

export interface VideoList {
  items: VideoItem[];
}

export interface PhotoItem {
  image: string;
  category: "portrait" | "sport" | "travel";
  caption?: string;
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

export function getVideoItems(): VideoItem[] {
  return readYaml<VideoList>("video/video.yaml").items;
}

export function getShortFormItems(): VideoItem[] {
  return readYaml<VideoList>("short-form/short-form.yaml").items;
}

export function getVideoEditingItems(): VideoItem[] {
  return readYaml<VideoList>("video-editing/video-editing.yaml").items;
}

export function getPhotoItems(): PhotoItem[] {
  return readYaml<PhotoList>("photos/photos.yaml").items;
}
