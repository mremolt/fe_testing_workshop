import { Component } from '@angular/core';
import { JokesService } from './services/jokes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'FE Testing Workshop';

  constructor(private readonly jokesService: JokesService) {
    this.jokesService.getRandomJoke('animal').subscribe((joke) => {
      console.log(joke);
    });
  }

  public foo(): string {
    return 'foo';
  }
}
