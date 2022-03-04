import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { render, RenderResult, screen } from '@testing-library/angular';
import { mock } from 'jest-mock-extended';
import { lastValueFrom, of } from 'rxjs';

import { JokesService } from '../services/jokes.service';
import { JokesComponent } from './jokes.component';

describe('JokesComponent', () => {
  const jokesServiceMock = mock<JokesService>();
  const categoriesMock = ['movies', 'food', 'science'];

  jokesServiceMock.getCategories.mockReturnValue(of(categoriesMock));

  describe('JokesComponent API', () => {
    let subject: JokesComponent;

    beforeEach(() => {
      subject = new JokesComponent(jokesServiceMock);
    });

    it('should create', () => {
      expect(subject).toBeTruthy();
    });

    describe('ngOnInit', () => {
      it('should provide categories$', async () => {
        subject.ngOnInit();

        const result = await lastValueFrom(subject.categories$);
        expect(result).toEqual(categoriesMock);
      });
    });
  });

  describe('JokesComponent', () => {
    let subject: RenderResult<JokesComponent>;
    let component: JokesComponent;

    beforeEach(async () => {
      subject = await render(JokesComponent, {
        imports: [ReactiveFormsModule],
        providers: [{ provide: JokesService, useFactory: () => jokesServiceMock }],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      });
      component = subject.fixture.componentInstance;
    });

    it('should render', () => {
      expect(screen.getByText('Joke Categories')).toBeInTheDocument();
    });

    it('should render the given categories', () => {
      expect(screen.getByText('movies')).toHaveClass('category');
      expect(screen.getByText('food')).toHaveClass('category');
      expect(screen.getByText('science')).toHaveClass('category');
    });

    it('should link to the correct category page', () => {
      const link = subject.getByText('movies') as HTMLAnchorElement;
      expect(link.getAttribute('href')).toEqual('/jokes/movies');
    });
  });
});
