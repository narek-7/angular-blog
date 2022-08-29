import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../shared/interfaces';
import { PostsService } from '../shared/posts.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  posts: any;
  postSub: Subscription = new Subscription();
  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postSub = this.postsService.getAll().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }
  ngOnDestroy(): void {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }
  }
}
