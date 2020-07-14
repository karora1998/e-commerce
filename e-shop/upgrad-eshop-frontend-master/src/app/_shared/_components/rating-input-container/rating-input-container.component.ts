import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-rating-input-container',
  templateUrl: './rating-input-container.component.html',
  styleUrls: ['./rating-input-container.component.scss']
})
export class RatingInputContainerComponent implements OnInit {

  stars = 0;

  icons = [];

  @Output() onValueChange: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
    this.reloadStars();

  }

  private reloadStars() {
    this.icons = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= this.stars) {
        this.icons.push('star');
      } else {
        this.icons.push('star_outline');
      }

    }
  }

  getFrom(iconName) {
    const mycolors = {
      'star': 'primary',
      'star_outline': '',
    };
    return mycolors[iconName];

  }

  updateButtons(starCount: number) {
    this.stars = starCount;
    this.reloadStars();
    this.onValueChange.emit(starCount);
  }
}
