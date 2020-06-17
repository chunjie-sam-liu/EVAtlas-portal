import { Injectable } from '@angular/core';
import { BaseHttpService } from 'src/app/shared/base-http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchBoxApiService extends BaseHttpService {
  constructor(http: HttpClient) {
    super(http);
  }
  public getRnaList(str: string): Observable<any> {
    return this.getData('search/rna/' + str);
  }
}
