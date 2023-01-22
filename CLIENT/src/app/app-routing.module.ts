import { UsersComponent } from './pages/users/users.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserDetailsComponent } from './pages/users/components/user-details/user-details.component';
import { UserListComponent } from './pages/users/components/user-list/user-list.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { AuthGuard } from './Core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'users/:id', component: UserDetailsComponent,canActivate: [AuthGuard] },
  { path: 'list', component: UserListComponent ,canActivate: [AuthGuard]},
  { path: 'messages', component: MessagesComponent ,canActivate: [AuthGuard]},
  { path: '**', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
