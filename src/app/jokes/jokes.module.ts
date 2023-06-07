import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { RouterModule } from '@angular/router';

import { JokesComponent } from './jokes.component';

@NgModule({
  declarations: [JokesComponent],
  imports: [CommonModule, RouterModule, MatListModule],
})
export class JokesModule {}
