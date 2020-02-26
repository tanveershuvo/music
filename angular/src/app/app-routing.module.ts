import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './comps/home/home.component';
import { LoginComponent } from './comps/auth/login/login.component';
import { RegisterComponent } from './comps/auth/register/register.component';
import { SearchComponent } from './comps/search/search.component';
import { ProfileComponent } from './comps/users/profile/profile.component';
import { UploadComponent } from './comps/upload/upload.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';


const routes: Routes = [
  {path: "", component: HomeComponent, children: [
    {path: "login", component: LoginComponent},
    {path: "register", component: RegisterComponent}
  ]},
  {path: "search/:query", component: SearchComponent},
  {path: "user/:query", component: ProfileComponent},
  {path: "upload", component: UploadComponent, canActivate: [AuthGuardGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
