import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-categoria',
  templateUrl: './item-categoria.component.html',
  styleUrls: ['./item-categoria.component.scss']
})
export class ItemCategoriaComponent implements OnInit {
  letraGrande=false;
  constructor() { }

  ngOnInit(): void {
  }
  showOptions(){
    this.letraGrande = !this.letraGrande;
  }
  optionsVisible(){
    let classes = {
      active: this.letraGrande
      };
    return classes;
  }
}
