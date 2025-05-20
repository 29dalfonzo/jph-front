import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PostComponent } from '../post/post.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [InputTextModule, ButtonModule, PostComponent, CommonModule],
  template: `
    <div class="container post-list-container">
      <div class="post-list-header">
        <input
          pInputText
          type="text"
          placeholder="Buscar..."
          class="search-input"
        />
        <button
          pButton
          type="button"
          label="Buscar"
          icon="pi pi-search"
          class="search-post-button"
        ></button>
      </div>

      <div>
        <button
          pButton
          type="button"
          label="Nuevo"
          icon="pi pi-plus"
          class="new-post-button"
        ></button>
      </div>
    </div>
    <ng-container *ngFor="let post of posts">
      <app-post [post]="post" />
    </ng-container>
  `,
  styleUrl: './postList.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent {
  posts = [
    { title: 'Post 1', subtitle: 'Subtitle 1', body: 'Body 1' },
    { title: 'Post 2', subtitle: 'Subtitle 2', body: 'Body 2' },
  ];
}
