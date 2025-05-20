import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [InputTextModule, ButtonModule],
  template: `
    <div class="container">
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

      <button
        pButton
        type="button"
        label="Nuevo"
        class="new-post-button"
      ></button>
    </div>
  `,
  styleUrl: './postList.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent {}
