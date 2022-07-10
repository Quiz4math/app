import { Curriculum } from './Curriculum';
import { Entity } from './Entity';

export interface User extends Entity {
    name: string;
    password: string;
    curriculum: Curriculum;
}