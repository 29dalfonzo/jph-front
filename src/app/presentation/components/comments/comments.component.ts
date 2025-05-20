import { Component, Input } from '@angular/core';
import { PostComment } from '../../../domain/models/comment.interface';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CardModule],
  template: `
    <p-card class="comment-card">
      <p-header>
        <ng-template #title> {{ comment.name }} </ng-template>
        <ng-template #subtitle> {{ comment.email }} </ng-template>
      </p-header>
      <p>
        {{ comment.body }}
      </p>
    </p-card>
  `,
  styleUrl: './comments.component.scss',
})
export class CommentsComponent {
  @Input() comment: PostComment = {} as PostComment;
}
