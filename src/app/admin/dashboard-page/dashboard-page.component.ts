import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/shared/posts.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: any;
  postSub: Subscription = new Subscription();

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postSub = this.postsService.getAll().subscribe((posts: any) => {
      this.posts = posts;
      console.log(posts);
    });
  }

  remove(id: string) {}

  ngOnDestroy() {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }
  }

}
