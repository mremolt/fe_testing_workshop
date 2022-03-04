import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';

import { Joke } from '../models/joke.interface';
import { JokesService } from '../services/jokes.service';

export const validateSearch: ValidatorFn = (control: AbstractControl) => {
  const value = String(control.value);

  if (value.length < 3) {
    return { tooSmall: true, actual: value.length, required: 3 };
  }

  if (value.length > 8) {
    return { tooLarge: true, actual: value.length, required: 8 };
  }

  return null;
};

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  public jokes$?: Observable<Array<Joke>>;
  public form: FormGroup;

  constructor(private readonly jokesService: JokesService, readonly fb: FormBuilder) {
    this.form = fb.group({
      query: ['', validateSearch],
    });
  }

  public search(query: string): void {
    this.jokes$ = this.jokesService.search(query);
  }
}
