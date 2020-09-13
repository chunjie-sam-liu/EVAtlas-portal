import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EChartOption } from 'echarts';
import { MappingDist } from 'src/app/shared/model/mapping-dist';
import { sortBy as _sortBy, values as _values, sum as _sum } from 'lodash-es';
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

const ELEMENT_DATA: PeriodicElement[] = [
  {
    Source: '1',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Adipose',
    Specific_miRNA_counts: '3',
    Specific_piRNA_counts: '1',
    Specific_others_counts: '56',
  },
  {
    Source: '2',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Adrenal gland',
    Specific_miRNA_counts: '4',
    Specific_piRNA_counts: '3',
    Specific_others_counts: '6',
  },
  {
    Source: '3',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Blood',
    Specific_miRNA_counts: '6',
    Specific_piRNA_counts: '6',
    Specific_others_counts: '74',
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
    Specific_miRNA_counts: '2',
    Specific_piRNA_counts: '0',
    Specific_others_counts: '1',
  },
  {
    Source: '6',
    EV_type: 'Microvesicle',
    Cancer_Source_type: 'Bone marrow',
    Specific_miRNA_counts: '2',
    Specific_piRNA_counts: '9',
    Specific_others_counts: '312',
  },
  {
    Source: '7',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Brain',
    Specific_miRNA_counts: '1',
    Specific_piRNA_counts: '7',
    Specific_others_counts: '8',
  },
  {
    Source: '8',
    EV_type: 'Microvesicle',
    Cancer_Source_type: 'Brain',
    Specific_miRNA_counts: '1',
    Specific_piRNA_counts: '4',
    Specific_others_counts: '5',
  },
  {
    Source: '9',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Breast',
    Specific_miRNA_counts: '4',
    Specific_piRNA_counts: '20',
    Specific_others_counts: '21',
  },
  {
    Source: '10',
    EV_type: 'Microvesicle',
    Cancer_Source_type: 'Breast',
    Specific_miRNA_counts: '2',
    Specific_piRNA_counts: '2',
    Specific_others_counts: '11',
  },
  {
    Source: '11',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Cervix',
    Specific_miRNA_counts: '7',
    Specific_piRNA_counts: '16',
    Specific_others_counts: '16',
  },
  {
    Source: '12',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Colorectum',
    Specific_miRNA_counts: '21',
    Specific_piRNA_counts: '3',
    Specific_others_counts: '1',
  },
  {
    Source: '13',
    EV_type: 'Microvesicle',
    Cancer_Source_type: 'Colorectum',
    Specific_miRNA_counts: '20',
    Specific_piRNA_counts: '3',
    Specific_others_counts: '1',
  },
  {
    Source: '14',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Epididymal',
    Specific_miRNA_counts: '0',
    Specific_piRNA_counts: '3',
    Specific_others_counts: '16',
  },
  {
    Source: '15',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Hypopharynx',
    Specific_miRNA_counts: '2',
    Specific_piRNA_counts: '2',
    Specific_others_counts: '39',
  },
  {
    Source: '16',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Kidney',
    Specific_miRNA_counts: '18',
    Specific_piRNA_counts: '10',
    Specific_others_counts: '5',
  },
  {
    Source: '17',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Lung',
    Specific_miRNA_counts: '0',
    Specific_piRNA_counts: '7',
    Specific_others_counts: '3',
  },
  {
    Source: '18',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Lymph',
    Specific_miRNA_counts: '4',
    Specific_piRNA_counts: '3',
    Specific_others_counts: '16',
  },
  {
    Source: '19',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Mouth',
    Specific_miRNA_counts: '0',
    Specific_piRNA_counts: '6',
    Specific_others_counts: '2',
  },
  {
    Source: '20',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Nerve',
    Specific_miRNA_counts: '0',
    Specific_piRNA_counts: '4',
    Specific_others_counts: '2',
  },
  {
    Source: '21',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Ovary',
    Specific_miRNA_counts: '3',
    Specific_piRNA_counts: '0',
    Specific_others_counts: '3',
  },
  {
    Source: '22',
    EV_type: 'Microvesicle',
    Cancer_Source_type: 'Pancreas',
    Specific_miRNA_counts: '23',
    Specific_piRNA_counts: '2',
    Specific_others_counts: '4',
  },
  {
    Source: '23',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Prostate',
    Specific_miRNA_counts: '21',
    Specific_piRNA_counts: '2',
    Specific_others_counts: '0',
  },
  {
    Source: '24',
    EV_type: 'Microvesicle',
    Cancer_Source_type: 'Prostate',
    Specific_miRNA_counts: '18',
    Specific_piRNA_counts: '2',
    Specific_others_counts: '2',
  },
  {
    Source: '25',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Skin',
    Specific_miRNA_counts: '0',
    Specific_piRNA_counts: '16',
    Specific_others_counts: '8',
  },
  {
    Source: '26',
    EV_type: 'Microvesicle',
    Cancer_Source_type: 'Skin',
    Specific_miRNA_counts: '0',
    Specific_piRNA_counts: '2',
    Specific_others_counts: '15',
  },
  {
    Source: '27',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Stomach',
    Specific_miRNA_counts: '0',
    Specific_piRNA_counts: '0',
    Specific_others_counts: '5',
  },
  {
    Source: '28',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Tongue',
    Specific_miRNA_counts: '1',
    Specific_piRNA_counts: '7',
    Specific_others_counts: '14',
  },
  {
    Source: '29',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Uterus',
    Specific_miRNA_counts: '0',
    Specific_piRNA_counts: '10',
    Specific_others_counts: '28',
  },
  {
    Source: '30',
    EV_type: 'Exosome',
    Cancer_Source_type: 'Vessel',
    Specific_miRNA_counts: '1',
    Specific_piRNA_counts: '5',
    Specific_others_counts: '11',
  },
  {
    Source: '31',
    EV_type: 'Cells',
    Cancer_Source_type: 'Skin Original',
    Specific_miRNA_counts: '1',
    Specific_piRNA_counts: '5',
    Specific_others_counts: '10',
  },
  {
    Source: '32',
    EV_type: 'Apoptotic.bodies',
    Cancer_Source_type: 'Skin',
    Specific_miRNA_counts: '0',
    Specific_piRNA_counts: '0',
    Specific_others_counts: '1',
  },
];

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

  public assets = environment.assets;

  exoMappingRateTitle = 'Exosomes mapping rate';
  exoMappingRate: EChartOption;

  mvMappingRateTitle = 'Microvesicles mapping rate';
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
