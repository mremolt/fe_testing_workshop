import type { HttpClient } from '@angular/common/http';
import { mock } from 'jest-mock-extended';
import { lastValueFrom, of } from 'rxjs';
import { Joke } from '../models/joke.interface';

import { JokesService } from './jokes.service';

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

const categoriesMock = ['celebrity', 'dev', 'science', 'sport', 'travel'];

describe('JokesService', () => {
  const httpClientMock = mock<HttpClient>();

  let subject: JokesService;

  beforeEach(() => {
    subject = new JokesService(httpClientMock);
  });

  it('should be created', () => {
    expect(subject).toBeTruthy();
  });

  describe('getRandomJoke', () => {
    let result: Joke;

    describe('without category', () => {
      beforeEach(async () => {
        httpClientMock.get.mockReturnValue(of(jokeMock));
        result = await lastValueFrom(subject.getRandomJoke());
      });

      it('should return a random Joke', () => {
        expect(result).toEqual(jokeMock);
      });

      it('should call the API', () => {
        expect(httpClientMock.get).toHaveBeenCalledWith('https://api.chucknorris.io/jokes/random');
      });
    });

    describe('with category', () => {
      beforeEach(async () => {
        httpClientMock.get.mockReturnValue(of(jokeMock));
        result = await lastValueFrom(subject.getRandomJoke('science'));
      });

      it('should return a random Joke', () => {
        expect(result).toEqual(jokeMock);
      });

      it('should call the API', () => {
        expect(httpClientMock.get).toHaveBeenCalledWith('https://api.chucknorris.io/jokes/random?category=science');
      });
    });
  });

  describe('getCategories', () => {
    let result: Array<string>;

    beforeEach(async () => {
      httpClientMock.get.mockReturnValue(of(categoriesMock));
      result = await lastValueFrom(subject.getCategories());
    });

    it('should return a list of categories', () => {
      expect(result).toEqual(categoriesMock);
    });

    it('should call the API', () => {
      expect(httpClientMock.get).toHaveBeenCalledWith('https://api.chucknorris.io/jokes/categories');
    });
  });

  describe('search', () => {
    let result: Array<Joke>;

    beforeEach(async () => {
      httpClientMock.get.mockReturnValue(of({ result: [jokeMock] }));
      result = await lastValueFrom(subject.search('fear'));
    });

    it('should return a list of categories', () => {
      expect(result).toEqual([jokeMock]);
    });

    it('should call the API', () => {
      expect(httpClientMock.get).toHaveBeenCalledWith('https://api.chucknorris.io/jokes/search?query=fear');
    });
  });
});
