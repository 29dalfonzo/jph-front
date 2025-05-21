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
import { ToastService } from '../../../data/services/toast.service';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
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
    FormsModule,
  ],
  providers: [PostService, ToastService],
  template: `
    <div class="search-card">
      <div class="post-list-header">
        <input
          pInputText
          type="text"
          placeholder="Buscar..."
          class="search-input"
          [(ngModel)]="searchQuery"
          (ngModelChange)="onSearchInputChange($event)"
        />
      </div>
      <button
        pButton
        type="button"
        label="+ Nuevo"
        class="new-post-button"
        (click)="onNewPost()"
      ></button>
    </div>

    <ng-container *ngFor="let post of pagedPosts">
      <app-post
        [post]="post"
        (delete)="deletePost($event)"
        (edit)="editPost($event)"
        (view)="viewPost($event)"
      />
    </ng-container>
    <p-paginator
      *ngIf="this.searchResults.length > 0"
      [rows]="rows"
      [totalRecords]="searchResults.length"
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
  searchQuery = '';
  searchResults: Post[] = [];
  private searchSubject = new Subject<string>();

  constructor(
    private readonly postService: PostService,
    private readonly postStateService: PostStateService,
    private readonly toast: ToastService
  ) {}

  ngOnInit(): void {
    this.getPosts();
    this.searchSubject.pipe(debounceTime(500)).subscribe((query) => {
      this.onSearchChange(query);
    });
  }

  onSearchInputChange(value: string) {
    this.searchSubject.next(value);
  }

  onSearchChange(query: string) {
    this.searchQuery = query;
    if (this.searchQuery.length > 0) {
      this.searchResults = this.posts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.searchResults = this.posts;
    }
  }

  getPosts() {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
      this.searchResults = posts;
    });
  }

  get pagedPosts() {
    const start = this.currentPage * this.rows;
    return this.searchResults.slice(start, start + this.rows);
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
    this.postStateService.clear();
    this.openNewPostModal = true;
  }

  onNewPostClose(event: any) {
    if (!event) {
      return;
    }
    if (event?.id) {
      this.updatePost(event);
    } else {
      this.createPost(event);
    }

    this.openNewPostModal = false;
  }

  createPost(post: Post) {
    this.postService.createPost(post).subscribe(
      (post) => {
        this.posts.unshift(post);
        this.searchResults = [...this.posts];
        this.toast.Success('Post creado correctamente');
      },
      (error) => {
        this.toast.Error('Error al crear el post');
      }
    );
  }

  updatePost(post: Post) {
    this.postService.updatePost(post).subscribe(
      (post) => {
        this.posts = this.posts.map((p) => (p.id === post.id ? post : p));
        this.searchResults = [...this.posts];
        this.toast.Success('Post actualizado correctamente');
      },
      (error) => {
        this.toast.Error('Error al actualizar el post');
      }
    );
  }

  deletePost(postId: number) {
    this.postService.deletePost(postId).subscribe(
      (post) => {
        this.posts = this.posts.filter((post) => post.id !== postId);
        this.searchResults = [...this.posts];
        this.toast.Success('Post eliminado correctamente');
      },
      (error) => {
        this.toast.Error('Error al eliminar el post');
      }
    );
  }

  editPost(post: Post) {
    if (post) {
      this.postStateService.setPost(post);
      this.openNewPostModal = true;
    }
  }

  viewPost(postId: number) {
    this.visible = true;
    this.getComments(postId);
  }
}
