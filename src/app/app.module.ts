import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import {LoginPopupComponent} from './login-popup/login-popup.component';
import {LoginComponent} from './login/login.component';
import { CardComponent } from './card/card.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// Services
import { AuthService } from './services/solid.auth.service';
import { AuthGuard } from './services/auth.guard.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ContactComponent } from './contact/contact.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { ChatMessagesComponent } from './chatmessages/chatmessages.component';
import { ChatMessagesDisplayComponent } from './chatmessages/chatmessages-display/chatmessages-display.component';
import { ChatMessagesInputComponent } from './chatmessages/chatmessages-input/chatmessages-input.component';
import { NavigatorDisplayComponent } from './navigator/navigator-display/navigator-display.component';
import { NavigatorOptionsComponent } from './navigator/navigator-options/navigator-options.component';


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
    path: 'etc',
    component: CardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'card',
    component: ChatWindowComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginPopupComponent,
    DashboardComponent,
    CardComponent,
    RegisterComponent,
    ChatWindowComponent,
    ContactComponent,
    NavigatorComponent,
    NavigatorDisplayComponent,
    NavigatorOptionsComponent,
    ChatMessagesComponent,
    ChatMessagesDisplayComponent,
    ChatMessagesInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    NgSelectModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
