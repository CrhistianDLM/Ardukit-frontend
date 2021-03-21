import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-detalles-producto',
  templateUrl: './detalles-producto.component.html',
  styleUrls: ['./detalles-producto.component.scss']
})
export class DetallesProductoComponent implements OnInit {

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    //const id = this.route.snapshot.paramMap.get('id');
    //console.log("producto id: "+ id)
  }

}
