import { Resolver, Query, ResolveField, Args, Parent } from '@nestjs/graphql';
import { mockAuthors, mockPosts } from 'src/mock-data/mock-data';
import { Author } from 'src/models/author';

@Resolver('Author')
export class AuthorsResolver {
  constructor(
  ) {}
    
  @Query()
  async author(@Args('id') id: number) {
    console.log(`Entering :: Query :: author :: id = ${id}`);
    const data = await new Promise((resolve) => {
      const author = mockAuthors.find(author => author.id === id);
      setTimeout(() => {
        resolve(author)
      }, 5000);
    }); 
    console.log(`Exiting :: Query :: author :: id = ${id}`);
    return data;
  }

  @Query()
  async authors() {
    console.log(`Entering :: Query :: authors`);
    const data = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockAuthors)
      }, 5000);
    }); 
    console.log(`Exiting :: Query :: authors`);
    return data;
  }

  /* NOTE: RESOLVER CHAIN TAKEAWAY
   * The field - `firstName` and `posts` are siblings to each other.
   * @ResolveField() for both of the fields are initiated simultaneously by separate task threads.
   * The async/await inside the @ResolveField() method is scoped within the method
   * i.e., async/await inside the firstName() method does not impact posts() method 
   * and vice versa as they are executed by separate task threads.
   */
  @ResolveField()
  async firstName(@Parent() author: Author) {
    console.log(`Entering :: Resolve :: firstName :: author id = ${author.id}`);
    const data = await new Promise((resolve, reject) => {
      const firstName: string = 'Prefix_' + author.firstName + '_Suffix';
      setTimeout(() => {
        resolve(firstName);
      }, 1000)
    });
    console.log(`Exiting :: Resolve :: firstName :: author id = ${author.id}`);
    return data;
  }

  @ResolveField()
  async posts(@Parent() author: Author) {
    console.log(`Entering :: Resolve :: posts :: author id = ${author.id}`);
    const data = await new Promise((resolve) => {
      const filteredPosts =  mockPosts.filter(post => author.posts.find(postId => postId == post.id));
      setTimeout(() => {
        resolve(filteredPosts);
      }, 1000);
    });
    console.log(`Exiting :: Resolve :: posts :: author id = ${author.id}`);
    return data;
  }

}
