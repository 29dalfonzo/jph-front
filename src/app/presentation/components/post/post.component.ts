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
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CardModule, ButtonModule, CommonModule, ConfirmDialogModule],
  providers: [ConfirmationService, MessageService],
  template: `
    <p-card class="post-card">
      <p-header>
        <ng-template #title>
          {{ post.title }}
        </ng-template>
      </p-header>
      <p>
        {{ post.body }}
      </p>
      <ng-template #footer>
        <div class="flex gap-4 mt-1 button-container">
          <p-button
            label="Ver más"
            icon="pi pi-eye"
            styleClass="w-full"
            (click)="emitComments()"
          />

          <p-button icon="pi pi-trash" (click)="confirmDelete($event)" />
        </div>
      </ng-template>
    </p-card>
    <p-confirmdialog />
  `,
  styleUrl: './post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent {
  @Input() post: Post = {} as Post;
  @Output() delete = new EventEmitter<number>();

  constructor(
    private readonly postStateService: PostStateService,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService
  ) {}

  emitComments() {
    this.postStateService.setPost(this.post);
  }

  confirmDelete(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Estás seguro de querer eliminar este post?',
      header: 'Eliminar Post',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancelar',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Eliminar',
        severity: 'danger',
      },
      accept: () => {
        this.deletePost();
      },
    });
  }

  deletePost() {
    this.delete.emit(this.post.id);
  }
}
