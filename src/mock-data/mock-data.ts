import { Author } from 'src/models/author';
import { Post } from 'src/models/post';

const mockAuthors: Author[] = [
    {
        id: 1,
        firstName: 'first 1',
        lastName: 'last 1',
        posts: [
            1, 3
        ]
    },
    {
        id: 2,
        firstName: 'first 2',
        lastName: 'last 2',
        posts: [
            2, 4
        ]
    },
    {
        id:3,
        firstName: 'first3',
        lastName: 'last3',
        posts: [
            1, 2
        ]
    },
    {
        id: 4,
        firstName: 'first 4',
        lastName: 'last 4',
        posts: [
            3, 4
        ]
    },
];

const mockPosts: Post[] = [
    {
        id: 1,
        title: 'title 1',
        votes: 10
    },
    {
        id: 2,
        title: 'title 2',
        votes: 20
    },
    {
        id: 3,
        title: 'title 3',
        votes: 30
    },
    {
        id: 4,
        title: 'title 4',
        votes: 40
    },
    {
        id: 5,
        title: 'title 5',
        votes: 50
    },
    {
        id: 6,
        title: 'title 6',
        votes: 60
    },
];

export {
    mockAuthors,
    mockPosts
}