import { Component, OnInit, Input, Output, EventEmitter, ElementRef, Renderer } from '@angular/core';
import { Card } from './card';

@Component({
  selector: 'card-component',
  templateUrl: './card.component.html',
  styles: [
`
:host {
  padding: 30px;
}

.btn 
  .icon {
    visibility: hidden;

}

.btn.btn-success .icon, .btn.btn-primary .icon {
  visibility: visible;
}
`
  ]
})
export class CardComponent implements OnInit {
  @Input()
  card: Card;

  @Output('select')
  selectEvent: EventEmitter<Card> = new EventEmitter();

  public selected: boolean = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer) { 
  }

  ngOnInit() {
  }

  onSelect() {
    this.selected = true;
    this.selectEvent.emit(this.card);
  }
}