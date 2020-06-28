import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from 'src/app/shared/base-http.service';
import { Observable } from 'rxjs';
import { RnaBasicInfo } from 'src/app/shared/model/rna-basic-info';

@Injectable({
  providedIn: 'root',
})
export class RnaDetailApiService extends BaseHttpService {
  constructor(http: HttpClient) {
    super(http);
  }

  public findRnaBasicInfo(s: string): Observable<RnaBasicInfo> {
    return this.getData('anno', {
      ncrna: s,
    });
  }
}
