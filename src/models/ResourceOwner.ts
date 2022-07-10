import { Entity } from './Entity';

export interface ResourceOwner extends Entity {
  name: string;
  url?: string;
}
