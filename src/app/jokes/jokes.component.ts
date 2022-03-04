import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { JokesService } from '../services/jokes.service';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.scss'],
})
export class JokesComponent implements OnInit {
  public categories$!: Observable<Array<string>>;

  constructor(private readonly jokesService: JokesService) {}

  public ngOnInit(): void {
    this.categories$ = this.jokesService.getCategories();
  }
}
