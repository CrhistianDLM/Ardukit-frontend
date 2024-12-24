import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {
  @Input() valor1: boolean = false;
  @Input() name: string = "";
  @Input() price: string = "";
  @Input() image: string = "";
  constructor() { }

  ngOnInit(): void {
  }

}
