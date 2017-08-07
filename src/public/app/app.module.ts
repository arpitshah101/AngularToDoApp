import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import {
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdInputModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list.component';
import { LoginComponent } from './login/login.component';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    LoginComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    MdButtonModule,
    MdCardModule,
    MdCheckboxModule,
    MdInputModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
