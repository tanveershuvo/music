import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadComponent } from '../comps/upload/upload.component';
import { AuthGuardGuard } from '../guards/auth-guard.guard';
import { SettingsComponent } from '../comps/settings/settings.component';
import { ChangePasswordComponent } from '../comps/change-password/change-password.component';




const userRoutes: Routes = [
    {path: "upload", component: UploadComponent, canActivate: [AuthGuardGuard]},
    {path: "settings", component: SettingsComponent, canActivate: [AuthGuardGuard]},
    {path: "change-password", component: ChangePasswordComponent, canActivate: [AuthGuardGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
