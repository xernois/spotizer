import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchResult } from '@src/app/models/search.model';
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
  public searchResults!: SearchResult;
  public showResults!: boolean;

  constructor(
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.showResults = false;
    this.searchControl = new FormControl();
    this.subscription = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      switchMap((query) => this.searchService.search(query)))
      .subscribe((results) => this.searchResults = results)
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }
}
