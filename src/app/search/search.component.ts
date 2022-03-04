import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Joke } from '../models/joke.interface';
import { JokesService } from '../services/jokes.service';

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
      query: [''],
    });
  }

  public search(): void {
    this.jokes$ = this.jokesService.search(this.form.value.query);
  }
}
