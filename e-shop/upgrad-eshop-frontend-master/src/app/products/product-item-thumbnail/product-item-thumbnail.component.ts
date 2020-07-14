import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../models/product.models';

@Component({
  selector: 'app-product-item-thumbnail',
  templateUrl: './product-item-thumbnail.component.html',
  styleUrls: ['./product-item-thumbnail.component.scss']
})
export class ProductItemThumbnailComponent implements OnInit {

  @Input()
  product: Product;

  constructor() {
  }

  ngOnInit(): void {
  }

}
