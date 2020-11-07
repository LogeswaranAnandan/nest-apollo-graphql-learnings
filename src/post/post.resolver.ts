import { Parent, ResolveField, Resolver, Query } from '@nestjs/graphql';
import { mockAuthors, mockPosts } from 'src/mock-data/mock-data';
import { Post } from 'src/models/post';

@Resolver('Post')
export class PostResolver {

  @Query()
  async posts() {
    console.log('Entering :: Query :: posts');
    const data = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockPosts)
      }, 5000);
    }); 
    console.log('Exiting :: Query :: posts');
    return data;
  }

  @ResolveField()
  async commenters(@Parent() post: Post) {
    console.log(`Entering :: Resolve :: commenters :: post id = ${post.id}`);
    const data = await new Promise((resolve) => {
      const filteredAuthors =  mockAuthors.filter(author => post.commenters.find(authorId => authorId == author.id));
      setTimeout(() => {
        resolve(filteredAuthors);
      }, 1000);
    });
    console.log(`Exiting :: Resolve :: commenters :: post id = ${post.id}`);
    return data;
  }
}
