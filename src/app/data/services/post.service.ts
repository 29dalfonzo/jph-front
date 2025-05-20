import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../../domain/models/post.interface';
import { PostComment } from '../../domain/models/comment.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  url = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.url}posts`);
  }

  getComments(postId: number): Observable<PostComment[]> {
    return this.http.get<PostComment[]>(`${this.url}posts/${postId}/comments`);
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.url}posts`, post);
  }

  deletePost(postId: number): Observable<Post> {
    return this.http.delete<Post>(`${this.url}posts/${postId}`);
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.url}posts/${post.id}`, post);
  }
}
