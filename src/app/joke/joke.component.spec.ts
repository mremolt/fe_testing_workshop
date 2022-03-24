import { ActivatedRoute } from '@angular/router';
import { fireEvent, render, screen } from '@testing-library/angular';
import { mock } from 'jest-mock-extended';
import { lastValueFrom, of } from 'rxjs';

import { Joke } from '../models/joke.interface';
import { JokesService } from '../services/jokes.service';
import { JokeComponent } from './joke.component';

const jokeMock: Joke = {
  categories: [],
  created_at: '2020-01-05 13:42:25.352697',
  icon_url: 'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
  id: '4XpBg1qRRuyKopwmUsVxrg',
  updated_at: '2020-01-05 13:42:25.352697',
  url: 'https://api.chucknorris.io/jokes/4XpBg1qRRuyKopwmUsVxrg',
  value:
    'Chuck Norris was once paralyzed by the pressure of his awesomeness. He then roundhouse kicked his awesomeness to Mars, where it eradicated all life, he then made more awesome.',
};

const jokeMock2: Joke = {
  categories: [],
  created_at: '2020-01-05 13:42:26.766831',
  updated_at: '2020-01-05 13:42:26.766831',
  icon_url: 'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
  id: 'MNV6pEQ9Q3CVG9G2EWbc_Q',
  url: 'https://api.chucknorris.io/jokes/MNV6pEQ9Q3CVG9G2EWbc_Q',
  value: 'Chuck Norris knows what you did last winter.',
};

describe('JokeComponent', () => {
  describe('JokeComponent API', () => {
    const jokesServiceMock = mock<JokesService>();
    const activatedRouteMock = mock<ActivatedRoute>();

    let subject: JokeComponent;

    activatedRouteMock.params = of({ category: 'science' });

    beforeEach(() => {
      jokesServiceMock.getRandomJoke.mockReturnValue(of(jokeMock));
    });

    beforeEach(() => {
      subject = new JokeComponent(activatedRouteMock, jokesServiceMock);
    });

    it('should create', () => {
      expect(subject).toBeTruthy();
    });

    describe('ngOnInit', () => {
      it('should set the given category', () => {
        subject.ngOnInit();

        expect(subject.category).toBe('science');
      });

      it('should provide joke$', async () => {
        subject.ngOnInit();

        const result = await lastValueFrom(subject.joke$!);

        expect(result).toBe(jokeMock);
      });

      it('should load from given category', async () => {
        subject.ngOnInit();

        expect(jokesServiceMock.getRandomJoke).toHaveBeenCalledWith('science');
      });

      it('should not load a joke without a category', () => {
        activatedRouteMock.params = of({ category: null });

        subject.ngOnInit();

        expect(jokesServiceMock.getRandomJoke).not.toHaveBeenCalled();
      });
    });

    describe('reload', () => {
      it('should load a new joke', () => {
        subject.category = 'music';

        subject.reload();

        expect(jokesServiceMock.getRandomJoke).toHaveBeenCalledWith('music');
      });
    });
  });

  describe('JokeComponent UI', () => {
    const jokesServiceMock = mock<JokesService>();
    const activatedRouteMock = mock<ActivatedRoute>();

    activatedRouteMock.params = of({ category: 'science' });

    beforeEach(() => {
      jokesServiceMock.getRandomJoke.mockReset();
      jokesServiceMock.getRandomJoke.mockReturnValueOnce(of(jokeMock));
      jokesServiceMock.getRandomJoke.mockReturnValueOnce(of(jokeMock2));
    });

    it('should render the random Joke by given category', async () => {
      await render(JokeComponent, {
        providers: [
          { provide: ActivatedRoute, useFactory: () => activatedRouteMock },
          { provide: JokesService, useFactory: () => jokesServiceMock },
        ],
      });

      expect(screen.getByText(jokeMock.value)).toBeInTheDocument();
    });

    it('should reload the joke when clicking on the reload button', async () => {
      await render(JokeComponent, {
        providers: [
          { provide: ActivatedRoute, useFactory: () => activatedRouteMock },
          { provide: JokesService, useFactory: () => jokesServiceMock },
        ],
      });

      fireEvent.click(screen.getByText('load new random joke'));

      expect(screen.getByText(jokeMock2.value)).toBeInTheDocument();
    });
  });
});
