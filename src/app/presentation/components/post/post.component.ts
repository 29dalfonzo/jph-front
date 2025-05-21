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
    <div class="app-post-card">
      <div class="app-post-title">{{ post.title }}</div>
      <div class="app-post-body">{{ post.body }}</div>
      <div class="app-post-actions">
        <button pButton class="p-button" (click)="emitView()">
          <i class="pi pi-eye"></i> Ver más
        </button>
        <button pButton class="p-button" (click)="emitEdit()">
          <i class="pi pi-pencil"></i> Editar
        </button>
        <button pButton class="p-button" (click)="confirmDelete($event)">
          <i class="pi pi-trash"></i>
        </button>
      </div>
    </div>
    <p-confirmdialog />
  `,
  styleUrl: './post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent {
  @Input() post: Post = {} as Post;
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<Post>();
  @Output() view = new EventEmitter<number>();
  constructor(
    private readonly postStateService: PostStateService,
    private readonly confirmationService: ConfirmationService
  ) {}

  confirmDelete(event: Event) {
    console.log('confirmDelete', this.post);
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

  emitEdit() {
    this.edit.emit(this.post);
  }

  emitView() {
    this.view.emit(this.post.id);
  }
}
