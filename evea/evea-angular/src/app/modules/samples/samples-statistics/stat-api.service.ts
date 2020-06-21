import { Injectable } from '@angular/core';
import { BaseHttpService } from 'src/app/shared/base-http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MappingDist } from 'src/app/shared/model/mapping-dist';

@Injectable({
  providedIn: 'root',
})
export class StatApiService extends BaseHttpService {
  constructor(http: HttpClient) {
    super(http);
  }

  public getDist(exType: string): Observable<MappingDist[]> {
    return this.getData('stat/oa_dist', {
      ex_type: exType,
    });
  }
}
