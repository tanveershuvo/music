import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './comps/home/home.component';
import { LoginComponent } from './comps/auth/login/login.component';
import { RegisterComponent } from './comps/auth/register/register.component';
import { SearchComponent } from './comps/search/search.component';
import { ProfileComponent } from './comps/users/profile/profile.component';


const routes: Routes = [
  {path: "", component: HomeComponent, children: [
    {path: "login", component: LoginComponent},
    {path: "register", component: RegisterComponent}
  ]},
  {path: "search/:query", component: SearchComponent},
  {path: "user/:query", component: ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
