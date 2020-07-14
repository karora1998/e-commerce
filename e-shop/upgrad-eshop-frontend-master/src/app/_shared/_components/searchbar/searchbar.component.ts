import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {AppDataService} from '../../_services/app-data.service';
import {Router} from '@angular/router';
import {isAdmin, isInventoryManager} from '../../_helpers/auth.utils';

interface Pokemon {
  value: string;
  viewValue: string;
}

interface PokemonGroup {
  disabled?: boolean;
  name: string;
  pokemon: Pokemon[];
}


@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  DEFAULT_CATEGORY = 'Choose Category';
  categories$: Observable<string[]>;
  selectedCategory: string = this.DEFAULT_CATEGORY;
  searchString = '';
  canShowSearch = true;

  constructor(private appDataService: AppDataService, private router: Router) {

    appDataService.authInfo$.subscribe(authInfo => {

      this.canShowSearch = !isInventoryManager(authInfo);


    });

  }

  ngOnInit(): void {
    this.categories$ = this.appDataService.categories$;
  }

  changeSelectedCategory(category: string) {
    this.selectedCategory = category;

  }

  search() {


    let category = this.selectedCategory;

    if (category === this.DEFAULT_CATEGORY) {
      category = '';
      if (this.searchString.trim().length == 0) {
        return;
      }
    }

    this.router.navigate(['/products/search', category, this.searchString]);


  }

  resetCategory() {
    this.selectedCategory = this.DEFAULT_CATEGORY;
  }
}
