import { Resolver, Query, ResolveField, Args, Parent } from '@nestjs/graphql';
import { AuthorInput } from 'src/graphql';
import { mockAuthors, mockPosts } from 'src/mock-data/mock-data';
import { Author, AuthorInputModel } from 'src/models/author';

@Resolver('Author')
export class AuthorsResolver {
  constructor(
  ) {}
    
  @Query('author')
  async getAuthor(@Args('id') id: number) {
    console.log(`Entering\t :: Query :: author :: id = ${id}`);
    const data = await new Promise((resolve) => {
      const author = mockAuthors.find(author => author.id === id);
      setTimeout(() => {
        resolve(author)
      }, 2000);
    }); 
    console.log(`Exiting\t\t :: Query :: author :: id = ${id}`);
    return data;
  }

  @Query('authors')
  async getAuthors() {
    console.log(`Entering\t :: Query :: authors`);
    const data = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockAuthors)
      }, 2000);
    }); 
    console.log(`Exiting\t\t :: Query :: authors`);
    return data;
  }

  @Query('createAuthor')
  async createAuthor(@Args('authorInput') author: AuthorInputModel) {
    console.log(`Entering\t :: createAuthor :: author - ${author}`)
    const id: number = mockAuthors.length + 1;
    author.id = id;
    const createdAuthor: Author = {
      ...author,
      posts: []
    };
    mockAuthors.push(createdAuthor);
    return createdAuthor;
  }

  /* NOTE: RESOLVER CHAIN TAKEAWAY
   * The field - `firstName` and `posts` are siblings to each other.
   * @ResolveField() for both of the fields are initiated simultaneously by separate task threads.
   * The async/await inside the @ResolveField() method is scoped within the method
   * i.e., async/await inside the firstName() method does not impact posts() method 
   * and vice versa as they are executed by separate task threads.
   */
  @ResolveField('firstName')
  async resolveFirstName(@Parent() author: Author) {
    console.log(`Entering\t :: Resolve :: firstName :: author id = ${author.id}`);
    const data = await new Promise((resolve, reject) => {
      const firstName: string = 'Prefix_' + author.firstName + '_Suffix';
      setTimeout(() => {
        resolve(firstName);
      }, 1500)
    });
    console.log(`Exiting\t\t :: Resolve :: firstName :: author id = ${author.id}`);
    return data;
  }

  @ResolveField('posts')
  async resolvePosts(@Parent() author: Author) {
    console.log(`Entering\t :: Resolve :: posts :: author id = ${author.id}`);
    const data = await new Promise((resolve) => {
      const filteredPosts =  mockPosts.filter(post => author.posts.find(postId => postId == post.id));
      setTimeout(() => {
        resolve(filteredPosts);
      }, 2000);
    });
    console.log(`Exiting\t\t :: Resolve :: posts :: author id = ${author.id}`);
    return data;
  }

}
