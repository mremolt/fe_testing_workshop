import { render, screen } from '@testing-library/angular';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let subject: HomeComponent;

  describe('testing the Component class', () => {
    beforeEach(() => {
      subject = new HomeComponent();
    });

    it('should create', () => {
      expect(subject).toBeTruthy();
    });

    it('should provide the headline', () => {
      expect(subject.headline).toBe('Homepage');
    });
  });

  describe('testing the rendered Component', () => {
    beforeEach(async () => {
      await render(HomeComponent);
    });

    it('should render the greeting', () => {
      expect(screen.getByText('Welcome to our little Frontend Testing Workshop!')).toBeInTheDocument();
    });

    it('should render the headline', () => {
      // do this after adding a headline to the page - after fixing the a11y e2e spec
    });
  });
});
