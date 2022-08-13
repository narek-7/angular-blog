import { Pipe, PipeTransform } from '@angular/core';
import { Post } from 'src/app/shared/interfaces';

@Pipe({
  name: 'searchPosts',
})
export class SearchPipe implements PipeTransform {
  transform(posts: Post[], search: string = ''): Post[] {
    if (search.trim()) {
      return posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    return posts;
  }
}
