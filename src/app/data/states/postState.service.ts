import { Injectable, signal } from '@angular/core';
import { Post } from '../../domain/models/post.interface';
import { PostComment } from '../../domain/models/comment.interface';

@Injectable({
  providedIn: 'root',
})
export class PostStateService {
  private post = signal<Post>({} as Post);
  private comments = signal<PostComment[]>([]);

  constructor() {}

  getPost() {
    return this.post;
  }

  setPost(post: Post) {
    this.post.set(post);
  }

  setComments(comments: PostComment[]) {
    this.comments.set(comments);
  }

  getComments() {
    return this.comments;
  }

  clear() {
    this.post.set({} as Post);
    this.comments.set([]);
  }
}
