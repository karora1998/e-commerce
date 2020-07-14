import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-product-list-header',
  templateUrl: './product-list-header.component.html',
  styleUrls: ['./product-list-header.component.scss']
})
export class ProductListHeaderComponent implements OnInit {


  sortTypes = [
    {label: 'Price Highest', sortBy: 'price', direction: 'DESC'},
    {label: 'Price Lowest', sortBy: 'price', direction: 'ASC'},
    {label: 'Newest', sortBy: 'created', direction: 'DESC'},
    {label: 'Default', sortBy: '', direction: 'DESC'},

  ];

  ratingTypes = [
    {label: '4 Stars', value: '4'},
    {label: '3 Stars', value: '3'},
    {label: '2 Stars', value: '2'},
    {label: 'All', value: ''}

  ];


  selectedSort: any = this.sortTypes[3];
  selectedRating: any = this.ratingTypes[3];

  @Output() onSortChange: EventEmitter<any> = new EventEmitter();
 @Output() onRatingChange: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }



  changeSorting(sort: any) {

    this.selectedSort = sort;
    this.onSortChange.emit(sort);
  }

  changeRating(selectedRating: any) {
    this.selectedRating = selectedRating;
    this.onRatingChange.emit(selectedRating.value);
  }


}
