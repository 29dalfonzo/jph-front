import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PostService } from './post.service';
import { Post } from '../../domain/models/post.interface';
import { PostComment } from '../../domain/models/comment.interface';
import { environment } from '../../../environments/environment';

describe('PostService', () => {
  let service: PostService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService],
    });
    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe obtener los posts', () => {
    const mockPosts: Post[] = [
      { userId: 1, id: 1, title: 'Post 1', body: 'Contenido 1' },
      { userId: 2, id: 2, title: 'Post 2', body: 'Contenido 2' },
    ];

    service.getPosts().subscribe((posts) => {
      expect(posts.length).toBe(2);
      expect(posts).toEqual(mockPosts);
    });

    const req = httpMock.expectOne(`${apiUrl}/posts`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  });

  it('debe obtener los comentarios de un post', () => {
    const mockComments: PostComment[] = [
      {
        postId: 1,
        id: 1,
        name: 'Nombre',
        email: 'email@test.com',
        body: 'Comentario',
      },
    ];

    service.getComments(1).subscribe((comments) => {
      expect(comments.length).toBe(1);
      expect(comments).toEqual(mockComments);
    });

    const req = httpMock.expectOne(`${apiUrl}/posts/1/comments`);
    expect(req.request.method).toBe('GET');
    req.flush(mockComments);
  });
});
