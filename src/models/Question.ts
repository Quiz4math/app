import { Entity } from './Entity';
import { Course } from './Course';
import { Chapter } from './Chapter';
import { ResourceOwner } from './ResourceOwner';
import { Subchapter } from './Subchapter';

export interface Question extends Entity {
  sessionId?: number;
  course: Course;
  chapter: Chapter;
  subchapter: Subchapter;
  resourceOwner: ResourceOwner;
  detailsType: string;
  details: TrueFalseQuestion | MultipleChoiceQuestion;
}

export interface TrueFalseQuestion {
  body?: string;
}

export interface MultipleChoiceQuestion {
  body?: string;
  answers?: MultipleChoiceAnswer[];
}

export interface MultipleChoiceAnswer extends Entity {
  body?: string;
}
