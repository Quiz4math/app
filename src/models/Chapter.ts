import { Entity } from './Entity';

export interface Chapter extends Entity {
  name: string;
  imageUrl?: string | null;
}
