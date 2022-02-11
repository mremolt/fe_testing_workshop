import { RouterTestingModule } from '@angular/router/testing';
import { render, screen } from '@testing-library/angular';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let subject: AppComponent;

  beforeEach(() => {
    subject = new AppComponent();
  });

  it('should create the app', () => {
    expect(subject).toBeTruthy();
  });

  it(`should have as title 'FE Testing Workshop'`, () => {
    expect(subject.title).toEqual('FE Testing Workshop');
  });

  it('should foo ;)', () => {
    expect(subject.foo()).toBe('foo');
  });

  describe('testing the rendered application', () => {
    beforeEach(async () => {
      await render(AppComponent, { imports: [RouterTestingModule] });
    });

    it('should render title', async () => {
      // expect(screen.getByText('FE Testing Workshop app is running!')).toBeInTheDocument();
    });
  });
});
