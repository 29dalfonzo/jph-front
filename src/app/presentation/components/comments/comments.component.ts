import { Component, Input } from '@angular/core';
import { PostComment } from '../../../domain/models/comment.interface';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [],
  template: `
    <div class="comment-card">
      <div class="comment-title">{{ comment.name }}</div>
      <div class="comment-email">{{ comment.email }}</div>
      <div class="comment-body">{{ comment.body }}</div>
    </div>
  `,
  styleUrl: './comments.component.scss',
})
export class CommentsComponent {
  @Input() comment: PostComment = {} as PostComment;
}
