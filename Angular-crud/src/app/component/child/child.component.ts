import { Component, ElementRef, Input, input, Output, output, ViewChild, viewChild } from '@angular/core';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})
export class ChildComponent {

   @Input() product: any;
  @Output() onDelete = new EventEmitter()
 @ViewChild('myInput') inputElement!: ElementRef;

   Action()
   {
this.onDelete.emit;

   }

}
  