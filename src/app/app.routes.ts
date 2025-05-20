import { Routes } from '@angular/router';
import { LayoutComponent } from './presentation/layout/layout.component';
import { PostListComponent } from './presentation/components/postList/postList.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: PostListComponent,
      },
    ],
  },
];
