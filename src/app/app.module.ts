import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';

import { MaterialModule } from './material.module';
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersComponent } from './components/users/users.component';
import { NavComponent } from './components/nav/nav.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { HomeComponent } from './components/home/home.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { UserFormComponent } from './components/users/user-form/user-form.component';
import { environment } from 'src/environments/environment';
import { UserComponent } from './components/users/user/user.component';
import { MatConfirmDialogComponent } from './components/shared/dialogs/mat-confirm-dialog/mat-confirm-dialog.component';
import { BooksComponent } from './components/books/books.component';
import { BookCardComponent } from './components/books/book-card/book-card.component';
import { BookComponent } from './components/books/book/book.component';
import { EventsComponent } from './components/events/events.component';
import { EventComponent } from './components/events/event/event.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    NavComponent,
    CalendarComponent,
    HomeComponent,
    UserFormComponent,
    UserComponent,
    MatConfirmDialogComponent,
    BooksComponent,
    BookCardComponent,
    BookComponent,
    EventsComponent,
    EventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
