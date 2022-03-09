import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { CounterComponent } from './counter.component';

@NgModule({
  declarations: [CounterComponent],
  imports: [CommonModule, MatButtonModule],
})
export class CounterModule {}
