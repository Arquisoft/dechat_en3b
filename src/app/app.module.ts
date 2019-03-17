// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// solid components
import { AppComponent } from './app.component';
import {LoginPopupComponent} from './login-popup/login-popup.component';
import {LoginComponent} from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';

// my components
import { NavigatorComponent } from './navigator/navigator.component';
import { NavigatorOptionsComponent } from './navigator/navigator-options/navigator-options.component';
import { ChatViewComponent } from './chatview/chatview.component';
import { NavigatorDisplayComponent } from './navigator/navigator-display/navigator-display.component';
import { ChatMessagesComponent } from './chatmessages/chatmessages.component';
import { ChatMessagesDisplayComponent } from './chatmessages/chatmessages-display/chatmessages-display.component';
import { ChatMessagesInputComponent } from './chatmessages/chatmessages-input/chatmessages-input.component';
import { ChatMessagesOptionsComponent } from './chatmessages/chatmessages-options/chatmessages-options.component';
import { ChatRoomComponent } from './chatroom/chatroom.component';

// Services
import { AuthService } from './services/solid.auth.service';
import { AuthGuard } from './services/auth.guard.service';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'login-popup',
    component: LoginPopupComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'chatview',
    component: ChatViewComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginPopupComponent,
    DashboardComponent,
    RegisterComponent,
    NavigatorComponent,
    NavigatorOptionsComponent,
    ChatViewComponent,
    NavigatorDisplayComponent,
    ChatMessagesComponent,
    ChatMessagesDisplayComponent,
    ChatMessagesInputComponent,
    ChatMessagesOptionsComponent,
    ChatRoomComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    NgSelectModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule //required for toastr
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
