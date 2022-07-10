import { Entity } from './Entity';

export interface Course extends Entity {
  name: string;
  description: string;
  imageUrl?: string;
  chapters?: Chapter[];
  subchapterCount?: number;
  questionCount?: number;
}

export interface Chapter extends Entity {
  name: string;
  description: string;
  imageUrl?: string;
  subchapters?: Subchapter[];
}

export interface Subchapter extends Entity {
  name: string;
  description: string;
  isTaught: boolean;
}
