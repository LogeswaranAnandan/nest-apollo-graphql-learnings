import { Resolver, Query, ResolveField, Args, Parent } from '@nestjs/graphql';
import { mockAuthors, mockPosts } from 'src/mock-data/mock-data';
import { Author } from 'src/models/author';

@Resolver('Author')
export class AuthorsResolver {
  constructor(
    // private authorsService: AuthorsService,
    // private postsService: PostsService,
  ) {}
    
  @Query()
  async author(@Args('id') id: number) {
    console.log('inside author');
    const author = mockAuthors.find(author => author.id === id);
    return author
  }

  @ResolveField()
  async posts(@Parent() author: Author) {
    // return this.postsService.findAll({ authorId: id });
    console.log('inside resolve posts');
    return new Promise((resolve) => {
      const filteredPosts =  mockPosts.filter(post => author.posts.find(postId => postId == post.id));
      setTimeout(() => {
        console.log('resolving posts');
        resolve(filteredPosts);
      }, 1500);
    })
  }

  @ResolveField()
  async firstName(@Parent() author: Author) {
    console.log('inside firstName');
    // return firstName;
    return new Promise((resolve, reject) => {
      const firstName: string = 'Prefix_' + author.firstName + '_Suffix';
      setTimeout(() => {
        console.log('resolving firstname');
        resolve(firstName);
      }, 1000)
    });
  }

  
}
