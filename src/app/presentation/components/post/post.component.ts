import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Post } from '../../../domain/models/post.interface';
import { PostStateService } from '../../../data/states/postState.service';
@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CardModule, ButtonModule, CommonModule],
  template: `
    <p-card class="post-card">
      <p-header>
        <ng-template #title> {{ post.title }} </ng-template>
      </p-header>
      <p>
        {{ post.body }}
      </p>
      <ng-template #footer>
        <div class="flex gap-4 mt-1">
          <p-button
            label="Ver más"
            icon="pi pi-eye"
            styleClass="w-full"
            (click)="emitComments()"
          />
        </div>
      </ng-template>
    </p-card>
  `,
  styleUrl: './post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent {
  @Input() post: Post = {} as Post;

  constructor(private readonly postStateService: PostStateService) {}

  emitComments() {
    this.postStateService.setPost(this.post);
  }
}
