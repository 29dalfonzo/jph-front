import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../../domain/models/post.interface';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { TextareaModule } from 'primeng/textarea';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PostService } from '../../../data/services/post.service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { PostStateService } from '../../../data/states/postState.service';
@Component({
  selector: 'app-create-post-modal',
  standalone: true,
  imports: [
    DialogModule,
    InputTextModule,
    TextareaModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    FloatLabelModule,
    CardModule,
    CommonModule,
  ],
  template: `
    <div class="card flex justify-center">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <p-dialog
          header="Nuevo Post"
          [modal]="true"
          [(visible)]="visible"
          (onHide)="onHide.emit()"
          [style]="{ width: '30rem' }"
        >
          <div class="flex flex-col gap-4 mb-4">
            <label for="title" class="font-semibold">Título</label>
            <input
              pInputText
              id="title"
              class="w-full"
              formControlName="title"
              autocomplete="off"
              [class.p-error-input]="
                form.controls.title.invalid && form.controls.title.touched
              "
            />
            <small
              *ngIf="form.controls.title.invalid && form.controls.title.touched"
              class="p-error"
            >
              El título es requerido
            </small>
          </div>

          <div class="flex flex-col gap-4 mb-8">
            <label for="body" class="font-semibold">Contenido</label>
            <textarea
              pTextarea
              id="body"
              class="w-full"
              formControlName="body"
              rows="5"
              autocomplete="off"
            ></textarea>
            <small
              *ngIf="form.controls.body.invalid && form.controls.body.touched"
              class="p-error"
            >
              El contenido es requerido
            </small>
          </div>
          <div class="footer-buttons">
            <p-button
              label="Cancelar"
              severity="secondary"
              (click)="visible = false"
            ></p-button>

            <p-button
              label="Guardar"
              type="submit"
              [disabled]="form.invalid"
            ></p-button>
          </div>
        </p-dialog>
      </form>
    </div>
  `,
  styleUrl: './create-post-modal.component.scss',
})
export class CreatePostModalComponent {
  @Input() visible = false;
  @Output() onHide = new EventEmitter<Post>();
  form = this.formBuilder.group({
    title: ['', Validators.required],
    body: ['', Validators.required],
  });

  newPost: Post = { title: '', body: '', id: 0, userId: 0 };

  constructor(
    private readonly postService: PostService,
    private readonly formBuilder: FormBuilder,
    private readonly postStateService: PostStateService
  ) {}

  onSubmit() {
    this.newPost = {
      title: this.form.value.title ?? '',
      body: this.form.value.body ?? '',
      id: this.postStateService.getPost()().id,
      userId: this.postStateService.getPost()().userId ?? 99,
    };
    this.onHide.emit(this.newPost);
  }
}
