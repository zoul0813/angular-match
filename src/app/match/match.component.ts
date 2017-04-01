import { Component, OnInit, Input, ViewChildren, QueryList, ElementRef, Renderer } from '@angular/core';
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

  ngOnInit() {
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
    cards = this.shuffleCards(cards).slice(0, this.deckSize);

    let deck: Card[] = [];
    for(let index in cards) {
      deck.push(cards[index]);
      deck.push(cards[index]);
    }
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

  selected: Card = null;
  matches: number = 0;
  guesses: number = 0;
  canSelect: boolean = true;
  onSelect(card: Card) {
    if(!this.canSelect) return false;

    if(this.selected) {
      console.debug('MatchComponent:onSelect, selected', card, this.selected);
      if(card.icon == this.selected.icon) {
        card.matched = true;
        this.selected.matched = true;
        this.selected = null;
        this.matches++;
        if(this.matches == this.cards.length / 2) {
          console.warn('GAME OVER - YOU WON!');
        }
      } else {
        this.selected = null;
      }
      this.guesses++;
      this.canSelect = false;
      setTimeout(() => {
        this.cards.forEach((component) => {
          console.debug('MatchComponent, forEach', component);
          if(component.card != this.selected) {
            component.selected = false;
          }
        });
        this.canSelect = true;
      }, 750);
    } else {
      console.debug('MatchComponent:onSelect, selecting', card);
      this.selected = card;
    }
  }
}
