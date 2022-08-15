import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from './interfaces';
import { FbCreateResponse } from './interfaces';

@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private http: HttpClient) {}

  create(post: Post): Observable<Post> {
    return this.http.post<any>(`${environment.fbDbUrl}/posts.json`, post).pipe(
      map((response: FbCreateResponse) => {
        return {
          ...post,
          id: response.name,
          date: new Date(post.date),
        };
      })
    );
  }

  getAll(): Observable<Post[]> {
    return this.http.get(`${environment.fbDbUrl}/posts.json`).pipe(
      map((res: { [key: string]: any }) => {
        return Object.keys(res).map((key: string) => {
          return {
            id: key,
            ...res[key],
            date: new Date(res[key].date),
          };
        });
      })
    );
  }

  getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.fbDbUrl}/posts/${id}.json`).pipe(
      map((post: Post) => {
        return {
          ...post,
          id,
          date: new Date(post.date),
        };
      })
    );
  }

  update(post: Post): Observable<Post> {
    return this.http.patch<Post>(`${environment.fbDbUrl}/posts/${post.id}.json`, post);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`);
  }
}
