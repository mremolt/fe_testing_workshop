import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { JokeComponent } from './joke.component';

@NgModule({
  declarations: [JokeComponent],
  imports: [CommonModule, RouterModule, MatButtonModule],
})
export class JokeModule {}
