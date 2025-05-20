import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentsComponent } from './comments.component';
import { PostComment } from '../../../domain/models/comment.interface';
import { CardModule } from 'primeng/card';

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;

  const mockComment: PostComment = {
    postId: 1,
    id: 1,
    name: 'Nombre de comentario',
    email: 'correo@prueba.com',
    body: 'Texto del comentario',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentsComponent, CardModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    component.comment = mockComment;
    fixture.detectChanges();
  });

  it('debe crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar el nombre, email y cuerpo del comentario', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain(mockComment.name);
    expect(compiled.textContent).toContain(mockComment.email);
    expect(compiled.textContent).toContain(mockComment.body);
  });
});
