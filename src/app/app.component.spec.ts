import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
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

  describe('testing the rendered application', () => {
    beforeEach(async () => {
      await render(AppComponent, {
        imports: [RouterTestingModule, MatToolbarModule, MatIconModule, MatButtonModule],
      });
    });

    it('should render title', () => {
      expect(screen.getByText('FE Testing Workshop')).toBeInTheDocument();
    });
  });
});
