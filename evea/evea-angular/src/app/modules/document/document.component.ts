import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
// import { StatApiService } from './stat-api.service';
import { EChartOption } from 'echarts';
import { MappingDist } from 'src/app/shared/model/mapping-dist';
import { sortBy as _sortBy, values as _values, sum as _sum } from 'lodash-es';
import rnaType from 'src/app/shared/constants/rna-types';
import statDistData from 'src/app/shared/constants/sample-stat-overview';
import exosomesStat from 'src/app/shared/constants/exosomes-stat-resu';
import microvesiclesStat from 'src/app/shared/constants/microvesicles-stat-resu';

export interface PeriodicElement {
  EV_type: string;
  Source: string;
  Cancer_Source_type: string;
  Specific_miRNA_counts: string;
  Specific_piRNA_counts: string;
  Specific_others_counts: string;
}

const ELEMENT_DATA: PeriodicElement[]=[
  {
    Source: '1',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Adipose',
    Specific_miRNA_counts: '4',
    Specific_piRNA_counts: '6',
    Specific_others_counts: '45',
  },
  {
    Source: '2',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Adrenal gland',
    Specific_miRNA_counts: '3',
    Specific_piRNA_counts: '6',
    Specific_others_counts: '18',
  },
  {
    Source: '3',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Blood',
    Specific_miRNA_counts: '34',
    Specific_piRNA_counts: '63',
    Specific_others_counts: '147',
  },
  {
    Source: '4',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Bone',
    Specific_miRNA_counts: '8',
    Specific_piRNA_counts: '30',
    Specific_others_counts: '89',
  },
  {
    Source: '5',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Bone marrow',
    Specific_miRNA_counts: '8',
    Specific_piRNA_counts: '7',
    Specific_others_counts: '248',
  },
  {
    Source: '6',
    EV_type: 'Microvesicle',
    Cancer_Source_type: 'Bone marrow',
    Specific_miRNA_counts: '4',
    Specific_piRNA_counts: '21',
    Specific_others_counts: '307',
  },
  {
    Source: '7',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Brain',
    Specific_miRNA_counts: '5',
    Specific_piRNA_counts: '79',
    Specific_others_counts: '71',
  },
  {
    Source: '8',
    EV_type: 'Microvesicle',
    Cancer_Source_type: 'Brain',
    Specific_miRNA_counts: '2',
    Specific_piRNA_counts: '25',
    Specific_others_counts: '48',
  },
  {
    Source: '9',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Breast',
    Specific_miRNA_counts: '4',
    Specific_piRNA_counts: '109',
    Specific_others_counts: '142',
  },
  {
    Source: '10',
    EV_type: 'Microvesicle',
    Cancer_Source_type: 'Breast',
    Specific_miRNA_counts: '1',
    Specific_piRNA_counts: '11',
    Specific_others_counts: '30',
  },
  {
    Source: '11',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Cervix',
    Specific_miRNA_counts: '16',
    Specific_piRNA_counts: '190',
    Specific_others_counts: '45',
  },
  {
    Source: '12',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Colorectum',
    Specific_miRNA_counts: '3',
    Specific_piRNA_counts: '4',
    Specific_others_counts: '13',
  },
  {
    Source: '13',
    EV_type: 'Microvesicle',
    Cancer_Source_type: 'Colorectum',
    Specific_miRNA_counts: '47',
    Specific_piRNA_counts: '12',
    Specific_others_counts: '18',
  },
  {
    Source: '14',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Epididymal',
    Specific_miRNA_counts: '3',
    Specific_piRNA_counts: '6',
    Specific_others_counts: '403',
  },
  {
    Source: '15',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Hypopharynx',
    Specific_miRNA_counts: '2',
    Specific_piRNA_counts: '11',
    Specific_others_counts: '75',
  },
  {
    Source: '16',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Kidney',
    Specific_miRNA_counts: '55',
    Specific_piRNA_counts: '26',
    Specific_others_counts: '16',
  },
  {
    Source: '17',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Lung',
    Specific_miRNA_counts: '0',
    Specific_piRNA_counts: '13',
    Specific_others_counts: '79',
  },
  {
    Source: '18',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Lymph',
    Specific_miRNA_counts: '7',
    Specific_piRNA_counts: '15',
    Specific_others_counts: '41',
  },
  {
    Source: '19',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Mouth',
    Specific_miRNA_counts: '0',
    Specific_piRNA_counts: '8',
    Specific_others_counts: '21',
  },
  {
    Source: '20',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Nerve',
    Specific_miRNA_counts: '5',
    Specific_piRNA_counts: '11',
    Specific_others_counts: '151',
  },
  {
    Source: '21',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Ovary',
    Specific_miRNA_counts: '17',
    Specific_piRNA_counts: '1',
    Specific_others_counts: '4',
  },
  {
    Source: '22',
    EV_type: 'Microvesicle',
    Cancer_Source_type: 'Pancreas',
    Specific_miRNA_counts: '48',
    Specific_piRNA_counts: '8',
    Specific_others_counts: '6',
  },
  {
    Source: '23',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Prostate',
    Specific_miRNA_counts: '77',
    Specific_piRNA_counts: '57',
    Specific_others_counts: 'xx',
  },
  {
    Source: '24',
    EV_type: 'Microvesicle',
    Cancer_Source_type: 'Prostate',
    Specific_miRNA_counts: '45',
    Specific_piRNA_counts: '7',
    Specific_others_counts: '28',
  },
  {
    Source: '25',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Skin',
    Specific_miRNA_counts: '12',
    Specific_piRNA_counts: '39',
    Specific_others_counts: '52',
  },
  {
    Source: '26',
    EV_type: 'Microvesicle',
    Cancer_Source_type: 'Skin',
    Specific_miRNA_counts: '6',
    Specific_piRNA_counts: '5',
    Specific_others_counts: '92',
  },
  {
    Source: '27',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Stomach',
    Specific_miRNA_counts: '0',
    Specific_piRNA_counts: '24',
    Specific_others_counts: '12',
  },
  {
    Source: '28',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Tongue',
    Specific_miRNA_counts: '3',
    Specific_piRNA_counts: '126',
    Specific_others_counts: '106',
  },
  {
    Source: '29',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Uterus',
    Specific_miRNA_counts: '0',
    Specific_piRNA_counts: '35',
    Specific_others_counts: '16',
  },
  {
    Source: '30',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Vessel',
    Specific_miRNA_counts: '5',
    Specific_piRNA_counts: '45',
    Specific_others_counts: '8',
  },
];

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css'],
})
export class DocumentComponent implements OnInit {
  displayedColumns: string[]=[
    'Source',
    'EV_type',
    'Cancer_Source_type',
    'Specific_miRNA_counts',
    'Specific_piRNA_counts',
    'Specific_others_counts',
  ];
  dataSource=ELEMENT_DATA;

  public assets=environment.assets;

  statTitle='Tissues and samples in EVatlas';
  statDist: EChartOption;

  exoMappingRateTitle='Exosomes mapping rate';
  exoMappingRate: EChartOption;
  exoMappingDistTitle='Exosomes RNA mapping distribution';
  exoMappingDist: EChartOption;

  mvMappingRateTitle='Microvesicles mapping rate';
  mvMappingRate: EChartOption;
  mvMappingDistTitle='Microvesicles RNA mapping distribution';
  mvMappingDist: EChartOption;

  constructor() { }

  ngOnInit(): void {
    // stat
    this.statDist=this._statDist(statDistData, this.statTitle);
    // get exosome data

    this.exoMappingRate=this._mappingRate(exosomesStat, this.exoMappingRateTitle);
    this.exoMappingDist=this._rnaMappingDist(exosomesStat, this.exoMappingDistTitle);

    // get microvesicle data
    this.mvMappingRate=this._mappingRate(microvesiclesStat, this.mvMappingRateTitle);
    this.mvMappingDist=this._rnaMappingDist(microvesiclesStat, this.mvMappingDistTitle);
  }
  private _statDist(d: any, title: string): EChartOption {
    return {
      title: {
        show: false,
        text: title,
      },
      grid: {
        top: '2%',
        left: '10%',
        right: '2%',
        bottom: '20%',
      },
      toolbox: {
        showTitle: true,
        feature: {
          data: { show: false },
          saveAsImage: {
            title: 'Save as image',
          },
        },
      },
      tooltip: {
        show: true,
        trigger: 'axis',
      },
      legend: {
        data: d.legend,
      },
      xAxis: {
        type: 'category',
        show: true,
        name: 'Tissues',
        nameLocation: 'center',
        nameGap: 60,
        nameTextStyle: { fontWeight: 'bolder' },
        axisTick: { show: false },
        axisLabel: { show: true, interval: 0, rotate: 45 },
        data: d.xAxis,
      },
      yAxis: {
        type: 'value',
        show: true,
        name: 'Number of samples',
        nameLocation: 'center',
        nameTextStyle: { fontWeight: 'bolder' },
        nameGap: 30,
      },
      series: [
        {
          name: d.legend[0],
          type: 'bar',
          stack: 'total',
          data: d.exo,
        },
        {
          name: d.legend[1],
          type: 'bar',
          stack: 'total',
          data: d.mv,
        },
      ],
    };
  }

  private _mappingRate(d: MappingDist[], title: string): EChartOption {
    let dRate=d.map((v) => ({
      srrID: v.srr_id,
      mappingRate: (v.srr_tag_info[1]/v.srr_tag_info[0]).toFixed(2),
    }));
    dRate=_sortBy(dRate, ['mappingRate']).reverse();
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

  private _rnaMappingDist(d: MappingDist[], title: string): EChartOption {
    const series=rnaType.map((v) => ({
      name: v.label,
      type: 'bar',
      stack: 'total',
      data: [],
    }));

    d.map((v) => {
      const tagSum=_sum(_values(v.tag_stat));
      series.map((s) => {
        s.data.push(v.tag_stat[s.name]/tagSum);
      });
    });

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
          data: { show: false },
          saveAsImage: {
            title: 'Save as image',
          },
        },
      },
      tooltip: {
        show: true,
        trigger: 'axis',
      },
      legend: {
        data: series.map((v) => v.name),
      },
      xAxis: {
        type: 'category',
        show: true,
        name: 'Samples',
        nameLocation: 'center',
        nameTextStyle: { fontWeight: 'bolder' },
        axisTick: { show: false },
        axisLabel: { show: false },
        data: d.map((v) => v.srr_id),
      },
      yAxis: {
        type: 'value',
        show: true,
        name: 'Mapping rate',
        nameLocation: 'center',
        nameTextStyle: { fontWeight: 'bolder' },
        nameGap: 30,
      },
      series,
    };
  }
}
