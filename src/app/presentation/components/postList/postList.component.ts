import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PostComponent } from '../post/post.component';
import { CommonModule } from '@angular/common';
import { PostService } from '../../../data/services/post.service';
import { Post } from '../../../domain/models/post.interface';
import { PaginatorModule } from 'primeng/paginator';
@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    PostComponent,
    CommonModule,
    PaginatorModule,
  ],
  providers: [PostService],
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

      <!-- TODO: Add new post button -->
      <!-- <button
        pButton
        type="button"
        label="Nuevo"
        icon="pi pi-plus"
        class="new-post-button"
      ></button> -->
    </div>

    <ng-container *ngFor="let post of pagedPosts">
      <app-post [post]="post" />
    </ng-container>
    <p-paginator
      [rows]="rows"
      [totalRecords]="posts.length"
      (onPageChange)="onPageChange($event)"
      [rowsPerPageOptions]="[5, 10, 20]"
    ></p-paginator>
  `,
  styleUrl: './postList.component.scss',
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  currentPage = 0;
  rows = 5;

  constructor(private readonly postService: PostService) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

  get pagedPosts() {
    const start = this.currentPage * this.rows;
    return this.posts.slice(start, start + this.rows);
  }

  onPageChange(event: any) {
    this.currentPage = event.page;
    this.rows = event.rows;

    window.scrollTo(0, 0);
  }
}
