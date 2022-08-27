import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PostsService } from 'src/app/shared/posts.service';
import { Post } from 'src/app/shared/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css'],
})
export class EditPageComponent implements OnInit, OnDestroy {
  form: any;
  post: any;
  submitted = false;
  updateSub: Subscription = new Subscription();

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.postsService.getById(params['id']).subscribe((post: Post) => {
        this.post = post;
        this.form = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          text: new FormControl(post.text),
        });
      });
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    const post = {
      ...this.post,
      title: this.form.value.title,
      text: this.form.value.text,
    };
    this.updateSub = this.postsService.update(post).subscribe(() => {
      this.router.navigate(['/admin', 'dashboard']);
      this.submitted = false;
      this.alertService.warning('Post has been edited!');
    });
  }

  ngOnDestroy() {
    if (this.updateSub) {
      this.updateSub.unsubscribe();
    }
  }
}
