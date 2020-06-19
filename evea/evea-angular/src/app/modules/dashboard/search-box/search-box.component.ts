import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, tap, debounceTime, switchMap, finalize, catchError } from 'rxjs/operators';

import { SearchBoxApiService } from './search-box-api.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent implements OnInit {
  isLoading = false;
  searchFormControl = new FormControl();

  rnaList: any[];

  constructor(private searchBoxApiService: SearchBoxApiService) {}

  ngOnInit(): void {
    this.searchFormControl.valueChanges
      .pipe(
        debounceTime(500),
        tap((val) => {
          // http is requesting, isLoading true
          this.isLoading = true;
        }),
        switchMap((val) => {
          val = this._transformInput(val);
          if (val !== '') {
            return this.searchBoxApiService.getRnaList(val).pipe(
              catchError((err) => {
                // if !err.ok nothing input
                this.isLoading = true;
                return of([]);
              }),
              finalize(() => {
                // http requesting is done, isLoading false
                this.isLoading = false;
              })
            );
          } else {
            // val is ' ', please input something
            this.isLoading = false;
            return of([]);
          }
        })
      )
      .subscribe((res) => {
        this.rnaList = res;
      });
  }

  private _transformInput(v: string): string {
    return v.toLowerCase().replace(/[^a-z0-9]/g, '');
  }
  private _illegalInput(i: string): boolean {
    return true;
  }
}
