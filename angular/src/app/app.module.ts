import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './comps/home/home.component';
import { LoginComponent } from './comps/auth/login/login.component';
import { RegisterComponent } from './comps/auth/register/register.component';
import { NavbarComponent } from './comps/navbar/navbar.component';
import { FooterComponent } from './comps/footer/footer.component';
import { SearchFormComponent } from './comps/forms/search-form/search-form.component';
import { AuthService } from './services/auth.service';
import { UsersComponent } from './comps/users/users.component';
import { UserCardComponent } from './comps/users/user-card/user-card.component';
import { SearchComponent } from './comps/search/search.component';
import { SongCardComponent } from './song-card/song-card.component';
import { ProfileComponent } from './comps/users/profile/profile.component';
import { BottomDirective } from './directives/bottom.directive';
import { FetchingComponent } from './comps/fetching/fetching.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    FooterComponent,
    SearchFormComponent,
    UsersComponent,
    UserCardComponent,
    SearchComponent,
    SongCardComponent,
    ProfileComponent,
    BottomDirective,
    FetchingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
