import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostComponent } from './post.component';
import { Post } from '../../../domain/models/post.interface';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  const mockPost: Post = {
    userId: 1,
    id: 1,
    title: 'Título de prueba',
    body: 'Cuerpo de prueba',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostComponent, CardModule, ButtonModule, CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    component.post = mockPost;
    fixture.detectChanges();
  });

  it('debe crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar el título y el cuerpo del post', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain(mockPost.title);
    expect(compiled.textContent).toContain(mockPost.body);
  });

  it('debe mostrar el botón "Ver más"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button')).toBeTruthy();
    expect(compiled.querySelector('button')?.textContent).toContain('Ver más');
  });
});
