import { Author } from './author';

export class Post {
    id: number;
    title: string;
    votes?: number;
    commenters?: number[];
  }