import { TestBed } from '@angular/core/testing';
import { PostStateService } from './postState.service';
import { Post } from '../../domain/models/post.interface';
import { PostComment } from '../../domain/models/comment.interface';

describe('PostStateService', () => {
  let service: PostStateService;

  const mockPost: Post = {
    userId: 1,
    id: 1,
    title: 'Título de prueba',
    body: 'Cuerpo de prueba',
  };

  const mockComments: PostComment[] = [
    {
      postId: 1,
      id: 1,
      name: 'Nombre',
      email: 'email@test.com',
      body: 'Comentario',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostStateService);
  });

  it('debe crearse', () => {
    expect(service).toBeTruthy();
  });

  it('debe establecer y obtener un post', () => {
    service.setPost(mockPost);
    expect(service.getPost()()).toEqual(mockPost);
  });

  it('debe establecer y obtener comentarios', () => {
    service.setComments(mockComments);
    expect(service.getComments()()).toEqual(mockComments);
  });

  it('debe limpiar el estado', () => {
    service.setPost(mockPost);
    service.setComments(mockComments);
    service.clear();
    expect(service.getPost()()).toEqual({} as Post);
    expect(service.getComments()()).toEqual([]);
  });
});
