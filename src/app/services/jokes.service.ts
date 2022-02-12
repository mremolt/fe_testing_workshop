import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Joke } from '../models/joke.interface';

@Injectable({
  providedIn: 'root',
})
export class JokesService {
  constructor(private readonly http: HttpClient) {}

  public getRandomJoke(category?: string): Observable<Joke> {
    if (category) {
      return this.http.get<Joke>(this.getUrl(`random?category=${category}`));
    }

    return this.http.get<Joke>(this.getUrl('random'));
  }

  public getCategories(): Observable<Array<string>> {
    return this.http.get<Array<string>>(this.getUrl('categories'));
  }

  private getUrl(path: string): string {
    return `https://api.chucknorris.io/jokes/${path}`;
  }
}
