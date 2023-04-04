import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from '@src/app/services/api/search.service';
import { debounceTime, startWith, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnDestroy {

  private subscription!: Subscription;
  public searchControl!: FormControl;
  public searchResults!: any[];
  public showResults!: boolean;

  constructor(
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.showResults = false;
    this.searchResults = [];
    this.searchControl = new FormControl();
    this.subscription = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      switchMap(this.searchService.search))
      .subscribe((results) => this.searchResults = [...results])
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }
}
