import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent {
  @Input() public count = 0;

  public increment(): void {
    this.count += 1;
  }

  public decrement(): void {
    this.count -= 1;
  }
}
