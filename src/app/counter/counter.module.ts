import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

import { CounterComponent } from './counter.component';

@NgModule({
  declarations: [CounterComponent],
  imports: [CommonModule, MatButtonModule],
})
export class CounterModule {}
