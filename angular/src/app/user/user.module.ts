import { NgModule } from '@angular/core';
import { UploadComponent } from '../comps/upload/upload.component';
import { SettingsComponent } from '../comps/settings/settings.component';
import { ChangePasswordComponent } from '../comps/change-password/change-password.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/modules/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { LoadingButtonComponent } from '../comps/loading-button/loading-button.component';
import { AuthService } from '../shared/services/auth.service';
import { MessagesService } from '../shared/services/messages.service';


@NgModule({
    declarations: [
        UploadComponent,
        SettingsComponent,
        ChangePasswordComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        UserRoutingModule
    ],
    providers: [
        AuthService,
        MessagesService,
    ]
})
export class UserModule{

}