import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { Joke } from '../models/joke.interface';
import { JokesService } from '../services/jokes.service';
import { validateSearch } from '../utils/validators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  public jokes$?: Observable<Array<Joke>>;
  public form = this.fb.group({
    query: ['', validateSearch],
  });

  constructor(private readonly jokesService: JokesService, private readonly fb: UntypedFormBuilder) {}

  public search(query: string): void {
    this.jokes$ = this.jokesService.search(query);
  }
}
