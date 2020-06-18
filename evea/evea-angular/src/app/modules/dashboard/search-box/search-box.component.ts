import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, tap, debounceTime, switchMap, finalize } from 'rxjs/operators';
import { SearchBoxApiService } from './search-box-api.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent implements OnInit {
  isLoading = false;
  searchFormControl = new FormControl();

  rnaList: Observable<any[]>;

  constructor(private searchBoxApiService: SearchBoxApiService) {}

  ngOnInit(): void {
    this.rnaList = this.searchFormControl.valueChanges.pipe(
      debounceTime(100),
      tap((value) => {
        console.log(value);
      }),
      switchMap((value) => this.searchBoxApiService.getRnaList(this._transformInput(value)))
    );
  }

  private _transformInput(value: string): string {
    return value.toLowerCase().replace(/[^a-z0-9]/g, '');
  }
}
