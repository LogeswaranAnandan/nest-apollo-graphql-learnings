import { Post } from './post';

export class Author {
    id: number;
    firstName: string;
    lastName?: string;
    posts?: number[];
}