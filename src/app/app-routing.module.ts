import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './components/users/users.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { EventComponent } from './components/event/event.component';
import { BooksComponent } from './components/books/books.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {
      path: '',
      component: HomeComponent

  },
  {
      path: 'users',
      component: UsersComponent,
      // resolve: {
      //     csrf: CsrfResolver
      // }
  },
   {
      path: 'books',
      component: BooksComponent,
  },
   {
      path: 'event',
      component: EventComponent,
  },
  {
      path: 'calendar',
      component: CalendarComponent,
  },
  {
      path:'**',
      component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
