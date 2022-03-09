import { fireEvent, render } from '@testing-library/angular';
import { screen } from '@testing-library/dom';

import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  beforeEach(async () => {
    await render(CounterComponent, { componentProperties: { count: 4 } });
  });

  it('should render the initial number', () => {
    // use screen.getByText to check the text is in the document.
    expect(42).toBe(42);
  });

  it('should increment the initial number by on by clicking on "increment" button', () => {
    // use fireEvent.click to click the increment button, then use screen.getByText to check the changed text is in the document.
    expect(42).toBe(42);
  });

  it('should decrement the initial number by on by clicking on "decrement" button', () => {
    // use fireEvent.click to click the decrement button, then use screen.getByText to check the changed text is in the document.
    expect(42).toBe(42);
  });
});
