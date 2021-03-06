import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { CounterModule } from './counter/counter.module';

import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';
import { JokeComponent } from './joke/joke.component';
import { JokeModule } from './joke/joke.module';
import { JokesComponent } from './jokes/jokes.component';
import { JokesModule } from './jokes/jokes.module';
import { SearchComponent } from './search/search.component';
import { SearchModule } from './search/search.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'jokes',
    component: JokesComponent,
  },
  {
    path: 'jokes/:category',
    component: JokeComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'counter',
    component: CounterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HomeModule, JokesModule, JokeModule, SearchModule, CounterModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
