import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, tap, debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent implements OnInit {
  isLoading = false;
  searchFormControl = new FormControl();

  options: string[] = ['One', 'Two', 'Three'];
  rnaList: Observable<string[]>;

  constructor() {}

  ngOnInit(): void {
    this.rnaList = this.searchFormControl.valueChanges.pipe(
      debounceTime(100),
      tap((input) => console.log(input)),
      map((input) => this._filter(input))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) => option.toLowerCase().includes(filterValue));
  }
}
