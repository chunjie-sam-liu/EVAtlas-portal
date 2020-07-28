import { Injectable } from '@angular/core';
import { BaseHttpService } from 'src/app/shared/base-http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TissueTable } from 'src/app/shared/model/tissue-table';
import { MappingDist } from 'src/app/shared/model/mapping-dist';
import { RnaHeatmap } from 'src/app/shared/model/rna-heatmap';
import { ISOMethod } from 'src/app/shared/model/iso-method';

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

  public getTissueTable(select: string, query: string): Observable<TissueTable[]> {
    return this.getData('stat/Srplst', {
      select: select,
      query: query,
      // tissues: tissue,
    }).pipe(map((res) => res.srp_lst));
  }

  public getProjectStat(id: string): Observable<MappingDist[]> {
    return this.getData('stat/srpratiostat', {
      srp: id,
    });
  }

  public getProjectHeatmap(id: string): Observable<RnaHeatmap[]> {
    return this.getData('ncrna/srpheatmap', {
      srp: id,
      ncrna: 'miRNA',
    }).pipe(map((res) => res.srp_heatmap_lst[0].miRNA));
  }

  public getRnaAvgRecords(id: string, rnaType: string, filter='', sortOrder='desc', pageIndex=0, pageSize=10): Observable<any> {
    return this.getData('ncrna/ncrnasrpexp', {
      srp: id,
      class: rnaType,
      filter: filter.toString(),
      sort: sortOrder,
      page: pageIndex.toString(),
      size: pageSize.toString(),
    });
  }

  public getIsoMethod(id: string): Observable<ISOMethod> {
    return this.getData('sample/project/'+id);
  }
}
