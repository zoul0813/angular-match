import { Component, ViewChild } from '@angular/core';
import { MatchComponent } from './match/match.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(MatchComponent) game: MatchComponent;
  guesses: number = 0;
  matches: number = 0;
  games: number = 0;
  completed: number = 0;
  deckSize: number = 8;

  onGuess($event: number) {
    this.guesses = $event;
  }

  onMatch($event: number) {
    this.matches = $event;
  }

  onComplete($event: MatchComponent) {
    this.completed++;
    setTimeout(() => {
      if(confirm('Play again?')) {
        this.onNewGame();
      }
    }, 250);
  }

  onNewGame() {
    this.matches = 0;
    this.guesses = 0;
    this.games++;
    this.game.newGame();
  }
}
