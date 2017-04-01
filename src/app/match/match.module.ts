import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatchComponent } from './match.component';
import { CardComponent } from './card.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    MatchComponent,
    CardComponent
  ],
  providers: [
  ],
  exports: [
    MatchComponent
  ]
})
export class MatchModule { }