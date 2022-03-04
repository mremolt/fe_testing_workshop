import { render, screen } from '@testing-library/angular';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let subject: HomeComponent;

  beforeEach(() => {
    subject = new HomeComponent();
  });

  it('should create', () => {
    expect(subject).toBeTruthy();
  });

  describe('testing the rendered Component', () => {
    beforeEach(async () => {
      await render(HomeComponent);
    });

    it('should render the greeting', () => {
      expect(screen.getByText('Welcome to our little Frontend Testing Workshop!')).toBeInTheDocument();
    });
  });
});
