import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-rating-display',
  templateUrl: './rating-display.component.html',
  styleUrls: ['./rating-display.component.scss']
})
export class RatingDisplayComponent implements OnInit {

  @Input() stars: number;

  icons = [];
  @Input() defaultValue: any;

  constructor() {
  }

  ngOnInit(): void {

    if(this.stars < 1) {
      return;
    }

    for (let i = 1; i <= 5; i++) {
      if (i <= this.stars) {
        this.icons.push('star');
      } else {
        this.icons.push('star_outline');
      }

    }

  }

}
