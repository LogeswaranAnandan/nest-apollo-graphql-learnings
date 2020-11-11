import { Post } from './post';
import { AuthorInput } from '../graphql'
import { MaxLength, MinLength } from 'class-validator';

export class Author {
    id: number;
    firstName?: string;
    lastName?: string;
    posts?: number[];
}

export class AuthorInputModel extends AuthorInput {
    @MinLength(3)
    @MaxLength(5)
    title: string;
}