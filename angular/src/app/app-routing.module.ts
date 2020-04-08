import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './comps/home/home.component';
import { LoginComponent } from './comps/auth/login/login.component';
import { RegisterComponent } from './comps/auth/register/register.component';
import { SearchComponent } from './comps/search/search.component';
import { ProfileComponent } from './comps/users/profile/profile.component';
import { UploadComponent } from './comps/upload/upload.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { SettingsComponent } from './comps/settings/settings.component';
import { ChangePasswordComponent } from './comps/change-password/change-password.component';
import { NotFoundComponent } from './comps/not-found/not-found.component';
import { NotAuthGuard } from './guards/not-auth.guard';


export const routes: Routes = [
  {path: "", component: HomeComponent, children: [
    {path: "login", component: LoginComponent, canActivate: [NotAuthGuard]},
    {path: "register", component: RegisterComponent, canActivate: [NotAuthGuard]}
  ]},
  {path: "settings", loadChildren: "./user/user.module#UserModule"},
  {path: "search/:query", component: SearchComponent},
  {path: "user/:query", component: ProfileComponent},
  {path: "**", redirectTo: "404"},
  {path: "404", component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
