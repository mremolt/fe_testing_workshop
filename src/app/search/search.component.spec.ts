import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { fireEvent, render, RenderResult, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { mock } from 'jest-mock-extended';
import { lastValueFrom, of } from 'rxjs';
import { JokesService } from '../services/jokes.service';

import { SearchComponent, validateSearch } from './search.component';

describe('SearchComponent', () => {
  const jokesServiceMock = mock<JokesService>();

  const jokesMock = [
    {
      categories: [],
      created_at: '2020-01-05 13:42:30.480041',
      icon_url: 'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
      id: 'Rjq1W2u8S3uYKDMqfIqVlQ',
      updated_at: '2020-01-05 13:42:30.480041',
      url: 'https://api.chucknorris.io/jokes/Rjq1W2u8S3uYKDMqfIqVlQ',
      value: 'Chuck Norris once nearly drowned an ocean in a fit of rage.',
    },
    {
      categories: [],
      created_at: '2020-01-05 13:42:28.143137',
      icon_url: 'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
      id: 'wYElYsATTVWzI-3__zGwPw',
      updated_at: '2020-01-05 13:42:28.143137',
      url: 'https://api.chucknorris.io/jokes/wYElYsATTVWzI-3__zGwPw',
      value: 'Chuck Norris died 20 years ago but death just hasnt built up the courage to tell him yet',
    },
  ];

  jokesServiceMock.search.mockReturnValue(of(jokesMock));

  describe('validateSearch', () => {
    it('should report invalid for an empty value', () => {
      expect(validateSearch(<FormControl>{ value: '' })).toEqual({ actual: 0, required: 3, tooSmall: true });
    });

    it('should report invalid for a 2 character value', () => {
      expect(validateSearch(<FormControl>{ value: 'fo' })).toEqual({ actual: 2, required: 3, tooSmall: true });
    });

    it('should report valid for a 3 character value', () => {
      expect(validateSearch(<FormControl>{ value: 'foo' })).toBeNull();
    });

    it('should report valid for a 6 character value', () => {
      expect(validateSearch(<FormControl>{ value: 'foobar' })).toBeNull();
    });

    it('should report valid for a 8 character value', () => {
      expect(validateSearch(<FormControl>{ value: 'testtest' })).toBeNull();
    });

    it('should report invalid for a 9 character value', () => {
      expect(validateSearch(<FormControl>{ value: 'foobarbaz' })).toEqual({ actual: 9, required: 8, tooLarge: true });
    });

    it('should report invalid for a very long character value', () => {
      expect(validateSearch(<FormControl>{ value: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr' })).toEqual(
        { actual: 55, required: 8, tooLarge: true }
      );
    });
  });

  describe('SearchComponent API', () => {
    let subject: SearchComponent;

    beforeEach(() => {
      subject = new SearchComponent(jokesServiceMock, new FormBuilder());
    });

    it('should create', () => {
      expect(subject).toBeTruthy();
    });

    describe('form', () => {
      it('should publish form property', () => {
        expect(subject.form.value).toMatchSnapshot();
      });

      it('should validate the form', () => {
        expect(subject.form.valid).toBeFalsy();

        subject.form.setValue({ query: 'secret' });

        expect(subject.form.valid).toBeTruthy();
      });
    });

    describe('search()', () => {
      it('should fill the jokes$ property', async () => {
        subject.search('rage');

        const result = await lastValueFrom(subject.jokes$!);

        expect(result).toMatchSnapshot();
      });
    });
  });

  describe('SearchComponent', () => {
    let subject: RenderResult<SearchComponent>;
    let component: SearchComponent;

    beforeEach(async () => {
      subject = await render(SearchComponent, {
        imports: [ReactiveFormsModule],
        providers: [{ provide: JokesService, useFactory: () => jokesServiceMock }],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      });
      component = subject.fixture.componentInstance;
    });

    it('should render', () => {
      expect(screen.getByText('Search for Jokes')).toBeInTheDocument();
    });

    describe('search form', () => {
      it('should connect the form to the template', () => {
        const searchField = screen.getByPlaceholderText('e.g. pain, kick');

        userEvent.type(searchField, 'Sylvester');
        fireEvent.blur(searchField);

        expect(component.form.value).toMatchSnapshot();
      });

      it('should trigger the search on submit', () => {
        const searchField = screen.getByPlaceholderText('e.g. pain, kick');
        const searchButton = screen.getByText('Search');

        userEvent.type(searchField, 'kick');
        fireEvent.blur(searchField);
        fireEvent.click(searchButton);

        expect(jokesServiceMock.search).toHaveBeenCalledWith('kick');
      });

      it('should not trigger the search on submit for an invalid form', () => {
        const searchField = screen.getByPlaceholderText('e.g. pain, kick');
        const searchButton = screen.getByText('Search');

        userEvent.type(searchField, 'this is too long');
        fireEvent.blur(searchField);
        fireEvent.click(searchButton);
        console.log(searchButton.innerHTML);

        expect(jokesServiceMock.search).not.toHaveBeenCalled();
      });
    });
  });
});
