import { Injectable } from '@angular/core';
import { BaseHttpService } from 'src/app/shared/base-http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpeTissue } from 'src/app/shared/model/spe-tissue';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpeApiService extends BaseHttpService {
  constructor(http: HttpClient) {
    super(http);
  }

  public getSpeTissue(type: string, exType: string, filter: string): Observable<SpeTissue> {
    return this.getData('spe/spetype', {
      type,
      ex_type: exType,
      filter,
    }).pipe(map((res) => res.data[0]));
  }
}
