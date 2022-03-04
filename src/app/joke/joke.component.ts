import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Joke } from '../models/joke.interface';
import { JokesService } from '../services/jokes.service';

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.scss'],
})
export class JokeComponent implements OnInit {
  public joke$?: Observable<Joke>;
  public category?: string;

  constructor(private readonly route: ActivatedRoute, private readonly jokesService: JokesService) {}

  public ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.category = params['category'];

      if (this.category) {
        this.loadJoke();
      }
    });
  }

  public reload(): void {
    this.loadJoke();
  }

  private loadJoke(): void {
    this.joke$ = this.jokesService.getRandomJoke(this.category);
  }
}
