import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
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
  isLegalInput = true;
  hasInput = true;
  hasRequest = false;
  isSelected = false;
  searchFormControl = new FormControl();
  rnaList: any[];

  constructor(private searchBoxApiService: SearchBoxApiService) {}

  ngOnInit(): void {
    this.searchFormControl.valueChanges
      .pipe(
        debounceTime(500),
        tap((val) => {
          // http is requesting, isLoading true
          this.isLegalInput = this._checkInput(val);
          this.isLoading = this.isLegalInput;
          this.hasRequest = false;
        }),
        switchMap((val) => {
          val = this._transformInput(val);
          this.isLoading = val === '' ? false : this.isLoading;
          return !this.isLegalInput || val === ''
            ? of([])
            : this.searchBoxApiService.getRnaList(val).pipe(
                tap(() => {
                  this.hasRequest = true;
                }),
                catchError(() => {
                  // if !err.ok nothing input
                  this.isLoading = true;
                  return of([]);
                }),
                finalize(() => {
                  // http requesting is done, isLoading false
                  this.isLoading = false;
                })
              );
        })
      )
      .subscribe((res) => {
        this.rnaList = res;
        this.hasInput = this.rnaList.length > 0 && this.hasRequest ? true : false;
      });
  }

  public rnaSelected(s: string): void {
    // redirect to mirna
    console.log(s);
  }

  private _transformInput(s: string): string {
    return s.toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  private _checkInput(s: string): boolean {
    const regex = /[!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]/g;
    return !regex.test(s);
  }
}
