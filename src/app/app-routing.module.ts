import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './components/users/users.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { EventComponent } from './components/event/event.component';
import { BookComponent } from './components/book/book.component';
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
      path: 'book',
      component: BookComponent,
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
