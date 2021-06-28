import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EChartOption } from 'echarts';
import { MappingDist } from 'src/app/shared/model/mapping-dist';
import { sortBy as _sortBy, values as _values, sum as _sum } from 'lodash-es';
import exosomesStat from 'src/app/shared/constants/exosomes-stat-resu';
import microvesiclesStat from 'src/app/shared/constants/microvesicles-stat-resu';
import thanks from 'src/app/shared/constants/thanks';
import speciStat from 'src/app/shared/constants/speci-stat';

export interface PeriodicElement {
  EV_type: string;
  Source: string;
  Cancer_Source_type: string;
  Specific_miRNA_counts: string;
  Specific_piRNA_counts: string;
  Specific_others_counts: string;
}

export interface PeriodicElementData {
  gse_id: string;
  Organization: string;
  Contributor: string;
  Overall_design: string;
  Summary: string;
  pubmed_id: string;
  link: string;
  link_ref: string;
}

const ELEMENT_DATA: PeriodicElement[] = speciStat;

const ELEMENT_SAMPLE: PeriodicElementData[] = thanks;
@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css'],
})
export class DocumentComponent implements OnInit {
  displayedColumns: string[] = [
    'Source',
    'EV_type',
    'Cancer_Source_type',
    'Specific_miRNA_counts',
    'Specific_piRNA_counts',
    'Specific_others_counts',
  ];
  dataSource = ELEMENT_DATA;

  displayedSamples: string[] = ['gse_id', 'Organization', 'Contributor', 'pubmed_id'];
  sampleSource = ELEMENT_SAMPLE;

  public assets = environment.assets;

  exoMappingRateTitle = 'sEVs mapping rate';
  exoMappingRate: EChartOption;

  mvMappingRateTitle = 'lEVs mapping rate';
  mvMappingRate: EChartOption;

  constructor() {}

  ngOnInit(): void {
    // get exosome data
    this.exoMappingRate = this._mappingRate(exosomesStat, this.exoMappingRateTitle);

    // get microvesicle data
    this.mvMappingRate = this._mappingRate(microvesiclesStat, this.mvMappingRateTitle);
  }

  private _mappingRate(d: MappingDist[], title: string): EChartOption {
    let dRate = d.map((v) => ({
      srrID: v.srr_id,
      mappingRate: (v.srr_tag_info[1] / v.srr_tag_info[0]).toFixed(2),
    }));
    dRate = _sortBy(dRate, ['mappingRate']).reverse();
    return {
      title: {
        show: false,
        text: title,
      },
      grid: {
        top: '2%',
        left: '10%',
        right: '2%',
        bottom: '10%',
      },
      toolbox: {
        showTitle: true,
        feature: {
          dataView: { show: false },
          magicType: {
            type: ['bar', 'line'],
            title: {
              bar: 'For bar charts',
              line: 'For line charts',
            },
          },
          saveAsImage: {
            title: 'Save as image',
          },
        },
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        formatter: '<strong>Sample ID</strong>: {b}<br /><strong>Mapping rate</strong>: {c}',
      },
      xAxis: {
        type: 'category',
        show: true,
        name: 'Samples',
        nameLocation: 'center',
        nameTextStyle: { fontWeight: 'bolder' },
        axisTick: { show: false },
        axisLabel: { show: false },
        data: dRate.map((srr) => srr.srrID),
      },
      yAxis: {
        type: 'value',
        show: true,
        name: 'Mapping rate',
        nameLocation: 'center',
        nameTextStyle: { fontWeight: 'bolder' },
        nameGap: 30,
      },
      series: [
        {
          data: dRate.map((srr) => srr.mappingRate),
          type: 'bar',
        },
      ],
      // animationEasing: 'bounceOut',
      // animationDelay: (i) => i * 0.2,
    };
  }
}
