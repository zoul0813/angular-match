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

.btn.btn-success .icon, .btn.btn-primary .icon, .btn.btn-danger .icon {
  visibility: visible;
}
`
  ]
})
export class CardComponent implements OnInit {
  @Input()
  card: Card;

  @Output('select')
  selectEvent: EventEmitter<CardComponent> = new EventEmitter();

  public selected: boolean = false;

  private _failed: boolean = false;
  get failed(): boolean {
    return this._failed;
  }

  set failed(v: boolean) {
    this._failed = v;
    // fail or not, change selected
    this.selected = false;
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer) { 
  }

  ngOnInit() {
  }

  onSelect() {
    if(this.card.matched) return false;
    this.selected = true;
    this.selectEvent.emit(this);
  }
}