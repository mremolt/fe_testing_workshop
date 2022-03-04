import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { JokesService } from '../services/jokes.service';

export const validateCategory: ValidatorFn = (control: AbstractControl) => {
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
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.scss'],
})
export class JokesComponent implements OnInit {
  public categories$: Observable<Array<string>>;
  public readonly form: FormGroup;

  constructor(private readonly jokesService: JokesService, private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      category: ['', [validateCategory]],
    });

    this.categories$ = this.jokesService.getCategories();
  }

  public ngOnInit(): void {}
}
