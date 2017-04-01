import { Component, OnInit, Input, Output, EventEmitter, ViewChildren, QueryList, ElementRef, Renderer } from '@angular/core';
import { CardComponent } from './card.component';
import { Card } from './card';

@Component({
  selector: 'match-component',
  templateUrl: './match.component.html'
})
export class MatchComponent implements OnInit {

  deck: Card[];
  @ViewChildren(CardComponent) cards: QueryList<CardComponent>;;

  constructor(private elementRef: ElementRef, private renderer: Renderer) { }

  @Input()
  deckSize: number = 6;

  @Output('guess')
  guessEvent: EventEmitter<any> = new EventEmitter();

  @Output('match')
  matchEvent: EventEmitter<any> = new EventEmitter();

  @Output('complete')
  completeEvent: EventEmitter<MatchComponent> = new EventEmitter();

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    console.log('MatchComponent:newGame', this.deckSize);
    let cards = [
      new Card("fa fa-ambulance"),
      new Card("fa fa-bicycle"),
      new Card("fa fa-bus"),
      new Card("fa fa-car"),
      new Card("fa fa-fighter-jet"),
      new Card("fa fa-motorcycle"),
      new Card("fa fa-plane"),
      new Card("fa fa-rocket"),
      new Card("fa fa-ship"),
      new Card("fa fa-space-shuttle"),
      new Card("fa fa-subway"),
      new Card("fa fa-train"),
      new Card("fa fa-truck"),
      new Card("fa fa-wheelchair"),
    ]
    if(this.deckSize > cards.length) this.deckSize = cards.length;
    cards = this.shuffleCards(cards).slice(0, this.deckSize);

    let deck: Card[] = [];
    for(let index in cards) {
      deck.push(cards[index]);
      deck.push(cards[index]);
    }
    this.matches = 0;
    this.guesses = 0;
    this.selected = null;
    this.canSelect = true;
    this.deck = this.shuffleCards(deck);
  }

  shuffleCards(cards: Card[]) {
    for (var i = cards.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    }
    return cards;
  }

  selected: CardComponent = null;
  matches: number = 0;
  guesses: number = 0;
  canSelect: boolean = true;
  onSelect(component: CardComponent) {
    if(!this.canSelect) return false;

    if(this.selected) {
      console.debug('MatchComponent:onSelect, selected', component.card, this.selected);
      if(component == this.selected) {
        // clicked the same thing, deselecting?
        component.selected = false;
        component.failed = false;
        this.selected = null;
        return false;
      }
      if(component.card.icon == this.selected.card.icon) {
        component.card.matched = true;
        this.selected.card.matched = true;
        this.selected = null;
        this.matches++;
        this.matchEvent.emit(this.matches);
        if(this.matches == this.cards.length / 2) {
          this.completeEvent.emit(this);
        }
      } else {
        this.selected.failed = true;
        component.failed = true;
      }
      this.guesses++;
      this.guessEvent.emit(this.guesses);
      this.canSelect = false;
      setTimeout(() => {
        component.failed = false;
        this.cards.forEach((component) => {
          console.debug('MatchComponent, forEach', component);
          if(!this.selected || component.card != this.selected.card) {
            component.selected = false;
          }
        });
        if(this.selected) {
          this.selected.failed = false;
          this.selected = null;
        }
        this.canSelect = true;
      }, 650);
    } else {
      console.debug('MatchComponent:onSelect, selecting', component);
      this.selected = component;
    }
  }
}
