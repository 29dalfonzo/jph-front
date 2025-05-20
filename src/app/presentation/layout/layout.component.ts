import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidebarModule, RouterOutlet],
  template: `
    <div class="container-layout">
      <h1>Posts App</h1>

      <router-outlet />
    </div>
  `,
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {}
