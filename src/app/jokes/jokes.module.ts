import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

import { JokesComponent } from './jokes.component';

@NgModule({
  declarations: [JokesComponent],
  imports: [CommonModule, RouterModule, MatListModule],
})
export class JokesModule {}
