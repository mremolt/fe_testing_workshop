import { RouterTestingModule } from '@angular/router/testing';
import { render, screen } from '@testing-library/angular';
import { mock } from 'jest-mock-extended';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { Joke } from './models/joke.interface';
import { JokesService } from './services/jokes.service';

const mockJoke: Joke = {
  categories: [],
  created_at: '2020-01-05 13:42:25.352697',
  icon_url: 'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
  id: '4XpBg1qRRuyKopwmUsVxrg',
  updated_at: '2020-01-05 13:42:25.352697',
  url: 'https://api.chucknorris.io/jokes/4XpBg1qRRuyKopwmUsVxrg',
  value:
    'Chuck Norris was once paralyzed by the pressure of his awesomeness. He then roundhouse kicked his awesomeness to Mars, where it eradicated all life, he then made more awesome.',
};

describe('AppComponent', () => {
  const jokesServiceMock = mock<JokesService>();
  let subject: AppComponent;

  beforeEach(() => {
    jokesServiceMock.getRandomJoke.mockReturnValue(of(mockJoke));
    subject = new AppComponent(jokesServiceMock);
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
      await render(AppComponent, {
        imports: [RouterTestingModule],
        providers: [{ provide: JokesService, useFactory: () => jokesServiceMock }],
      });
    });

    it('should render title', async () => {
      expect(screen.getByText('FE Testing Workshop app is running!')).toBeInTheDocument();
    });
  });
});
