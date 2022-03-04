import { ActivatedRoute } from '@angular/router';
import { mock } from 'jest-mock-extended';
import { of } from 'rxjs';
import { JokesService } from '../services/jokes.service';

import { JokeComponent } from './joke.component';

describe('JokeComponent', () => {
  const jokesServiceMock = mock<JokesService>();
  const activatedRouteMock = mock<ActivatedRoute>();

  let subject: JokeComponent;

  activatedRouteMock.params = of({ category: 'science' });

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
  });
});
