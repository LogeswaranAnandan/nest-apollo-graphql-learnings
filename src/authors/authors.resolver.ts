import { Resolver, Query, ResolveField, Args, Parent } from '@nestjs/graphql';
import { mockAuthors } from 'src/mock-data/mock-data';

@Resolver()
export class AuthorsResolver {
    constructor(
        // private authorsService: AuthorsService,
        // private postsService: PostsService,
      ) {}
    
      @Query()
      async author(@Args('id') id: number) {
        // return this.authorsService.findOneById(id);
        console.log('inside author');
        return mockAuthors.find(author => author.id === id);
      }
    
      // @ResolveField()
      // async posts(@Parent() author) {
      //   const { id } = author;
      //   return this.postsService.findAll({ authorId: id });
      // }

}
