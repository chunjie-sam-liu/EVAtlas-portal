import { Injectable } from '@angular/core';
import { BaseHttpService } from 'src/app/shared/base-http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TissueTable } from 'src/app/shared/model/tissue-table';
import { ProjectStat } from 'src/app/shared/model/project-stat';

@Injectable({
  providedIn: 'root',
})
export class ContentApiService extends BaseHttpService {
  constructor(http: HttpClient) {
    super(http);
  }
  public getTissueContent(exType: string, tissue: string): Observable<any> {
    return this.getData('stat/samstats', {
      ex_type: exType,
      tissues: tissue,
    }).pipe(map((res) => res.sample_stats));
  }

  public getTissueTable(tissue: string): Observable<TissueTable[]> {
    return this.getData('stat/Srplst', {
      tissues: tissue,
    }).pipe(map((res) => res.srp_lst));
  }

  public getProjectStat(id: string): Observable<ProjectStat> {
    return this.getData('stat/srpratiostat', {
      srp: id,
    }).pipe(map((res) => res.srp_ratio_stats[0]));
  }
}
