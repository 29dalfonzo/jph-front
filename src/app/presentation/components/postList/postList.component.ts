import { Component, effect, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PostComponent } from '../post/post.component';
import { CommonModule } from '@angular/common';
import { PostService } from '../../../data/services/post.service';
import { Post } from '../../../domain/models/post.interface';
import { PaginatorModule } from 'primeng/paginator';
import { DrawerModule } from 'primeng/drawer';
import { PostComment } from '../../../domain/models/comment.interface';
import { PostStateService } from '../../../data/states/postState.service';
import { CommentsComponent } from '../comments/comments.component';
import { CreatePostModalComponent } from '../../shared/create-post-modal/create-post-modal.component';
@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    PostComponent,
    CommonModule,
    PaginatorModule,
    DrawerModule,
    CommentsComponent,
    CreatePostModalComponent,
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
      <button
        pButton
        type="button"
        label="Nuevo"
        icon="pi pi-plus"
        class="new-post-button"
        (click)="onNewPost()"
      ></button>
    </div>

    <ng-container *ngFor="let post of pagedPosts">
      <app-post [post]="post" (delete)="deletePost(post.id)" />
    </ng-container>
    <p-paginator
      [rows]="rows"
      [totalRecords]="posts.length"
      (onPageChange)="onPageChange($event)"
      [rowsPerPageOptions]="[5, 10, 20]"
    ></p-paginator>
    <p-drawer
      [(visible)]="visible"
      header="Comentarios"
      position="right"
      [style]="{ width: '50%' }"
      (onHide)="onDrawerClose()"
    >
      <ng-container *ngFor="let comment of comments">
        <app-comments [comment]="comment" />
      </ng-container>
    </p-drawer>

    <app-create-post-modal
      [visible]="openNewPostModal"
      (onHide)="onNewPostClose($event)"
    ></app-create-post-modal>
  `,
  styleUrl: './postList.component.scss',
})
export class PostListComponent implements OnInit {
  visible = false;
  posts: Post[] = [];
  comments: PostComment[] = [];
  currentPage = 0;
  rows = 5;
  openNewPostModal = false;

  constructor(
    private readonly postService: PostService,
    private readonly postStateService: PostStateService
  ) {
    effect(() => {
      const post = this.postStateService.getPost();
      if (post().id) {
        this.visible = true;
        this.getComments(post().id);
      }
    });
  }

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

  getComments(postId: number) {
    this.postService.getComments(postId).subscribe((comments: any) => {
      this.comments = comments;
    });
  }

  onDrawerClose() {
    this.visible = false;
    this.postStateService.clear();
  }

  onNewPost() {
    this.openNewPostModal = true;
  }

  onNewPostClose(event: any) {
    console.log('onNewPostClose', event);
    if (event) {
      this.postService.createPost(event).subscribe(
        (post) => {
          //!se agrega de esta manera ya que el post no agrega dentro de la api, solo lo simula
          this.posts.unshift(post);
          //TODO: agregar un toast para indicar que el post se ha creado
        },
        (error) => {
          //TODO: agregar un toast para indicar que el post no se ha creado
        }
      );
    }

    this.openNewPostModal = false;
  }

  deletePost(postId: number) {
    this.postService.deletePost(postId).subscribe((post) => {
      this.posts = this.posts.filter((post) => post.id !== postId);
      //TODO: agregar un toast para indicar que el post se ha eliminado
    });
  }
}
