import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from 'src/app/shared/base-http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RnaDetailApiService extends BaseHttpService {
  constructor(http: HttpClient) {
    super(http);
  }

  public findRnaBasicInfo(s: string): Observable<any[]> {
    return this.getData('anno/one/' + s);
  }
}
