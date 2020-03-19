import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from 'ngx-toastr';


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
import { SongCardComponent } from './comps/song-card/song-card.component';
import { ProfileComponent } from './comps/users/profile/profile.component';
import { BottomDirective } from './directives/bottom.directive';
import { FetchingComponent } from './comps/fetching/fetching.component';
import { UploadComponent } from './comps/upload/upload.component';
import { SettingsComponent } from './comps/settings/settings.component';
import { ChangePasswordComponent } from './comps/change-password/change-password.component';
import { MusicPlayerComponent } from './comps/music-player/music-player.component';
import { MusicPlayerService } from './services/music-player.service';
import { BarDirective } from './directives/bar.directive';
import { NotFoundComponent } from './comps/not-found/not-found.component';
import { MessagesService } from './services/messages.service';

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
    FetchingComponent,
    UploadComponent,
    SettingsComponent,
    ChangePasswordComponent,
    MusicPlayerComponent,
    BarDirective,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }) // ToastrModule added
  ],
  providers: [
    AuthService,
    MusicPlayerService,
    MessagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
