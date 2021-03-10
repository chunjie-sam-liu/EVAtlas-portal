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

export interface PeriodicElementData {
  gse_id: string;
  Organization: string;
  Contributor: string;
  Overall_design: string;
  Summary: string;
  pubmed_id: string;
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

const ELEMENT_SAMPLE: PeriodicElementData[] = [
  {
    gse_id: 'GSE142282',
    Organization:
      'Submission date, Dec 18, 2019, Last update date, Dec 19, 2019, Contact name, Urszula Smyczyńska, E-mail(s), urszula.smyczynska@umed.lodz.pl, Organization name, Medical University of Lodz, Department, Department of Biostatistics and Translational Medicine, Street address, Mazowiecka 15, City, Lodz, ZIP/Postal code, 92-215, Country, Poland',
    Contributor: ' Smyczynska U, Bartlomiejczyk MA, Stanczak MM,  Sztromwasser P,  Wesołowska A, Barbarska O, Pawlikowska E,  Fendler W',
    Overall_design:
      'Mature breast milk in a volume of 150 ml was obtained from 3 donors at the 50th day of lactation. Each sample was immediately aliquoted into 3 equal volumes for further processing. 3 samples were subjected to HPP in 62.5°C for 30 minutes in Human Milk Pasteurizer S90 Eco (Sterifeed, Medicare Colgate Ltd, England, Cullompton), 3 to HoP using U 4000/65 apparatus (Unipress Equipment, Poland, Celestynow) and 3 were left untreated as control. Then, the samples were stored frozen at -20°C. Exosomes were isolated from 5 ml of milk using miRCURY Exosome Cell/Urine/CSF Kit (Qiagen, Hilden, Germany). MiRNA was isolated with a biofluid-tailored Serum/Plasma Advanced Kit (Qiagen). The cDNA sequencing libraries were prepared with use of QIAseq miRNA Library Kit (Qiagen), according to manufacturer’s protocol. Single-end sequencing was performed on NextSeq 500 sequencer (Illumina, USA, San Diego), according to standard manufacturer’s protocol.',
    Summary:
      'We report the application of miRNA next generation sequencing (NGS) for the analysis of impact of processing on miRNA in human breast milk, donated by 3 volunteers. MiRNA content of total and exosomal fraction was compared between unprocessed milk and sample subjected to either Holder (thermal) pasteurization (HoP) or elevated pressure processing (HPP). NGS reads were mapped to miRBase in order to obtain miRNA counts. Then, we analyzed differences in the miRNA abundance and function between raw and processed material. It was observed that both processing methods reduce number of miRNA reads and HoP is significantly more detrimental to miRNA than HPP.',
    pubmed_id: 'unavailable',
  },
  {
    gse_id: 'GSE140106',
    Organization:
      'Submission date, Nov 07, 2019, Last update date, Feb 10, 2020, Contact name, Fatemeh Vafaee, E-mail(s), f.vafaee@unsw.edu.au, Phone, 0061403012736, Organization name, University of New South Wales, Department, School of Biotechnology and Biomolecular Sciences, Street address, Gate 11 Botany Street, UNSW Sydney, School of BABS, City, Sydney, State/province, UNSW, ZIP/Postal code, 2052, Country, Australia',
    Contributor: 'Ebrahimkhani S, Beadnall HN, Wang C, Suter CM, Barnett MH, Buckland ME, Vafaee F',
    Overall_design:
      'Serum exosomal miRNA profiles of MS patients before and after treatment with fingolimod were generated by deep sequencing, single end, using Illumina HiSeq. 2000 System at the Ramaciotti Centre for Genomics.',
    Summary:
      'Background: We and others have previously demonstrated the potential for circulating exosome microRNAs to aid in disease diagnosis. In this study, we sought the possible utility of serum exosome microRNAs as biomarkers for disease activity in multiple sclerosis patients in response to fingolimod therapy. We studied patients with relapsing-remitting multiple sclerosis prior to and 6 months after treatment with fingolimod.Methods: Disease activity was determined using gadolinium-enhanced magnetic resonance imaging. Serum exosome microRNAs were profiled using next-generation sequencing. Data were analysed using univariate/multivariate modelling and machine learning to determine microRNA signatures with predictive utility.Results: we identified 15 individual miRNAs that were differentially expressed in serum exosomes from post-treatment patients with active versus quiescent disease. The targets of these microRNAs clustered in ontologies related to the immune and nervous systems, and signal transduction. While the power of individual microRNAs to predict disease status post-fingolimod was modest (average 77%, range 65 to 91%), several combinations of 2 or 3 miRNAs were able to distinguish active from quiescent disease with greater than 90% accuracy. Further stratification of patients identified additional microRNAs associated with stable remission, and a positive response to fingolimod in patients with active disease prior to treatment.Conclusions: Overall, these data underscore the value of serum exosome microRNA signatures as non-invasive biomarkers of disease in multiple sclerosis and suggest they may be used to predict response to fingolimod in future clinical practice. Additionally, these data suggest that fingolimod may have mechanisms of action beyond its known functions.',
    pubmed_id: '31721043',
  },
  {
    gse_id: 'GSE99474',
    Organization:
      'Submission date, May 31, 2017, Last update date, Jun 01, 2019, Contact name, Hsieh Chia-Hsin, E-mail(s), hsins0725@gmail.com, Phone, 886-228235870, Organization name, National Yang-Ming University, Street address, No.155, Sec.2, Linong Stree, City, Taipei, ZIP/Postal code, 11221, Country, Taiwan',
    Contributor: 'Yang M, Hsieh C',
    Overall_design: 'Exosomes have been successfully purified from cell culture conditioned medium by differential ultracentrifugation.',
    Summary:
      'Tumor-secreted exosomes have been noted to be critically involved in remodeling tumor microenvironments. In this study we investigated whether Snail-expressing cancer cells-secreted exosomes modulate the inflammasome activity in macrophages.',
    pubmed_id: 'unavailable',
  },
  {
    gse_id: 'GSE124120',
    Organization:
      'Submission date, Dec 19, 2018, Last update date, May 28, 2019, Contact name, Fei Chen, E-mail(s), jiaxm@big.ac.cn, Organization name, Beijing Institute of Genomics, Street address, NO.1 Beichen West Road, Chaoyang District, City, Beijing, ZIP/Postal code, 100101, Country, China',
    Contributor: 'Chen F',
    Overall_design: 'Examined three samples',
    Summary:
      'We performed small RNA sequencing to explore small RNA profiles of serum exosomes derived from LTBI and TB patients and healthy controls (HC). Our results revealed distinct miRNA profile of the exosomes from the three samples. We identified many differentially expressed miRNAs, including some specifically expressed miRNAs in the three samples. Besides the specially expressed miRNAs, we demonstrated distinct expression panels of the serum exosomal miRNAs from LTBI and TB samples, and six expression patterns among the three samples. These specifically expressed miRNAs and differentially expressed miRNAs in different panels and patterns provide potential biomarkers for detection/diagnosis of latent and active TB using exosomal miRNAs. Additionally, we also discovered plenty of small RNAs derived from genomic repetitive sequences (e.g., SINEs, LINEs and LTR), which might play roles in host immune responses along with Mtb infection progresses. Overall, our findings provide important reference and improved understanding about miRNAs and repetitive region-derived small RNAs in exosome during Mtb infectious process, and facilitate the development of potential molecular targets for detection/diagnosis of latent and active tuberculosis.',
    pubmed_id: '31191492',
  },
  {
    gse_id: 'GSE114008',
    Organization:
      'Submission date, May 03, 2018, Last update date, Jun 20, 2019, Contact name, Andrii Slonchak, Organization name, The University Of Queensland, Department, School of Chemistry and Molecular Biosciences, Lab, RNA Virology Lab, Street address, Bldg 76 Cooper Rd, City, St Lucia, State/province, QLD, ZIP/Postal code, 4072, Country, Australia',
    Contributor: 'Slonchak A, Clarke B, Khromykh AA',
    Overall_design:
      'Human lung carcinoma cells A545 were infected with Kunjin strain of West Nile virus at multiplicity of infection (MOI)=1 or incubated in the media containing 300u/ml IFN alpha 2a. Cells were then maintained in exosome free media for the next 24h. At 24 h post infection extracellular vesicles were isolated from culture fluids of infected or uninfected (Mock) cells using ExoQuick TC Exosomes isolation reagent. Enriched fractions of small RNAs were isolated from extacellular vesicles using mirVana miRNA isolation Kit (Ambion, USA) and used for library construction and RNA-Seq on Illumina HiSeq platform.',
    Summary:
      'The goal of this study is to determine if infection with flavivirus (West Nile virus) and action of proinflamatory cytokine interferon alter incorporation of host RNAs into extracellular vesicles secreted by human cells.',
    pubmed_id: '31182021',
  },
  {
    gse_id: 'GSE129255',
    Organization:
      'Submission date, Apr 02, 2019, Last update date, Apr 04, 2019, Contact name, Chong Wang, E-mail(s), wangchong3709@126.com, Organization name, Shanghai Liangrun, Street address, Gangao Road 271, City, Shanghai, ZIP/Postal code, 200120, Country, China',
    Contributor: 'Song S, Cheng Y, Yu G, Yang Q, Liu J, Wang Y, Sheng J, Wang L, Wang Z, Xu B',
    Overall_design:
      'To study the expression pattern of exosomal miRNA in the samples from ccRCC patients and healthy control individuals, total RNA was first isolated from the urine exosomes. The contents of small RNAs in the exosomes of ccRCC patients and healthy control individuals were consistent. Afterwards, miRNAs were isolated from total RNA and next-generation sequencing (NGS) was performed to compare the urinary exosome miRNA expression pattern of ccRCC patients with that of healthy individuals. The samples were then analyzed using an ultra-sequencer Illumina HiSeq2500, a platform that can deliver high quality data. After quality controls and adapter elimination, only high quality reads were aligned using a mirDeep2 algorithm against the mirBase v21 database, for the identification and quantification of previously described miRNAs. In total, 126 miRNA species were identified.',
    Summary:
      'Exosome-derived miRNAs are regarded as biomarkers for the diagnosis and prognosis of many human cancers. However, its function in clear cell renal cell carcinoma (ccRCC) remains unclear. In this study, differentially expressed miRNAs from urinal exosomes were identified using next-generation sequencing (NGS) and verified using urine samples of ccRCC patients and healthy donors. Then the exosomes were analyzed in early-stage ccRCC patients, healthy individuals and patients suffering with other urinary system cancers. Afterwards, the target gene of the miRNA was detected. Its biological function was investigated in vitro and in vivo. The results showed that miR-30c-5p could be stably amplified. Its expression pattern was significantly different only between ccRCC patients and healthy control individuals, but not compared with that of other urinary system cancers, which indicated its ccRCC specificity. Additionally, the overexpression of miR-30c-5p inhibited ccRCC progression in vitro and in vivo. Heat shock Protein 5 (HSPA5) was found to be a direct target gene of miR-30c-5p. HSPA5 depletion caused by miR-30c-5p inhibition reversed the promoting effect of ccRCC growth. In conclusion, urinary exosomal miR-30c-5p acts as a potential diagnostic biomarker of early-stage ccRCC, and might modulate the expression of HSPA5, which is correlated with the progression of ccRCC.',
    pubmed_id: 'https://doi.org/10.1186/s41544-019-0023-z',
  },
  {
    gse_id: 'GSE125905',
    Organization:
      'Submission date, Jan 30, 2019, Last update date, Jun 18, 2019, Contact name, Jie Ping, Organization name, Vanderbilt University Medical Center, Street address, 2525 West End Ave, City, Nashville, State/province, TN, ZIP/Postal code, 37203, Country, USA',
    Contributor: 'Jeppesen DK, Coffey RJ',
    Overall_design:
      'The extracellular release of RNA from two human cancer cells lines is examined based on separation of the samples into distinct extracellular compartments.',
    Summary:
      'RNA-Seq of cellular and extracellular samples from DKO-1 and Gli36 cell lines. The distribution of extracellular RNA between microvesicles, and crude small extracellular vesicular vesicles fractionated based on flotation density in ioxdixanol is distinct between the different extracellular compartments.',
    pubmed_id: '30951670',
  },
  {
    gse_id: 'GSE111803',
    Organization:
      'Submission date, Mar 14, 2018, Last update date, Dec 17, 2019, Contact name, Hua Fang, E-mail(s), foxbt0911@gmail.com, Organization name, Fu Xing Hospital, Department, Department of Oncology, Street address, Xicheng district Fu Xing Men Wai Da Jie No.20, City, Beijing, ZIP/Postal code, 100038, Country, China',
    Contributor: 'Fang H',
    Overall_design: 'Examination of peripheral blood exosome microRNAs from 5 patients with lung adenocarcinoma and 5 healthy controls',
    Summary:
      'Purpose: The goals of this study are to compare the small RNA expression profiles in the peripheral exosomes and try to find biomarkers for early diagnosis of lung adenocarcinomaMethods: Exosome was extracted from peripherial blood samples from 5 patients with lung adenocarcinoma and 5 healthy controls. RNA was extracted and microRNA profile was analyzed by high througput sequencing.Results: The expression of 5 microRNAs was found significantly altered in patients with lung adenocarcinoma',
    pubmed_id: '31677346',
  },
  {
    gse_id: 'GSE128004',
    Organization:
      'Submission date, Mar 07, 2019, Last update date, Mar 08, 2019, Contact name, Haoyan Chen, Organization name, Renji Hospital, Street address, 145 Shandong Road, City, Shanghai, State/province, Shanghai, ZIP/Postal code, 200001, Country, China',
    Contributor: 'Ma J, Xu M, Yin M, Hong J, Chen H, Gao Y, Xie C, Mo X, Gu S, Shen N',
    Overall_design: 'miRNA-seq was performed in neuroblastoma patients and normal controls',
    Summary:
      'To elucidate whether exosomal hsa-miR199a-3p plays a role in  neuroblastoma tumorigenesis, a miRNA-seq analysis on plasma exosomal miRNA from neuroblastoma patients and normal controls.',
    pubmed_id: '31249805',
  },
  {
    gse_id: 'GSE115572',
    Organization:
      'Submission date, Jun 11, 2018, Last update date, Mar 26, 2019, Contact name, Dominic Guanzon, Organization name, University of Queensland, Department, UQCCR, Lab, Exosome biology laboratory, Street address, Building 71/918 RBWH Herston, City, Brisbane, State/province, Queensland, ZIP/Postal code, 4029, Country, Australia',
    Contributor: 'Menon R, Guanzon D, Salomon C',
    Overall_design: 'miRNAs were profiled from exosomes using next generation seqeuencing (Illumina NextSeq 500 platform).',
    Summary:
      'The objective of this study was to characterise the changes in the exosomal miRNA concentrations circulating in the maternal plasma between mothers delivering term and preterm neonates, across gestation using a longitudinal study design. A retrospective stratified study design was used to characterize the miRNA content in exosomes present in maternal plasma of term (n=20 per time point) and preterm birth (PTB) (n=10 per time point) across gestation (i.e. first, second and third trimester).',
    pubmed_id: '30358826',
  },
  {
    gse_id: 'GSE122656',
    Organization:
      'Submission date, Nov 17, 2018, Last update date, Aug 21, 2019, Contact name, Michael Bukrinsky, E-mail(s), mbukrins@gwu.edu, Organization name, GWU, Street address, 2300 I St, City, Washington, State/province, District of Columbia, ZIP/Postal code, 20052, Country, USA',
    Contributor: 'Brichacek B, Bukrinsky M, Stern D, Clement R, Dubrovsky L, Horvath A',
    Overall_design: 'HIV Nef transfected HEK293T cell culture and HIV mock transfected HEK293T cell culture',
    Summary:
      'Purpose: Comparison of RNA-sequencing datasets obtained from exosomes of Nef-transfected and Mock-transfected HEK293T cellsMethods: Assessment of RNA content of exosomes produced by Nef-transfected HEK293T cells and and Mock-transfected HEK293T cellsResults: Differences in a set of microRNAsConclusions: Nef-transfection induces changes in the microRNA content of exosomes',
    pubmed_id: '31344124',
  },
  {
    gse_id: 'GSE122488',
    Organization:
      'Submission date, Nov 13, 2018, Last update date, Aug 24, 2020, Contact name, Fatemeh Vafaee, E-mail(s), f.vafaee@unsw.edu.au, Phone, 0061403012736, Organization name, University of New South Wales, Department, School of Biotechnology and Biomolecular Sciences, Street address, Gate 11 Botany Street, UNSW Sydney, School of BABS, City, Sydney, State/province, UNSW, ZIP/Postal code, 2052, Country, Australia',
    Contributor:
      'Ebrahimkhani S, Vafaee F, Hallal S, Wei H, Young PE, Lee MY, Seelan L, Beadnall H, Barnett MH, Shivalingam B, Suter CM, Buckland ME, Kaufman KL',
    Overall_design:
      'Serum exosomal miRNA profiles ofIDH-wildtype glioblastoma, IDH-mutant glioma grades II-III, their matched healthy controls, and additional GBM patients, non_GBM patients and healthy controls were generated by deep sequencing, single end, using Illumina HiSeq. 2000 System at the Ramaciotti Centre for Genomics.',
    Summary:
      'Background: Safe and sensitive methods for glioblastoma diagnosis and disease monitoring are urgently needed. Exosomes are nano-sized extracellular vesicles that contain molecules characteristic of their cell-of-origin, including microRNA. Exosomes released by glioblastoma tumors cross the blood-brain-barrier ino the peripheral circulation.Methods: Serum exosomal-microRNA isolated from IDH-wildtype glioblastoma (n=12) and IDH-mutant glioma grades II-III (n=10) were analyzed using small-RNA next generation sequencing and compared to age- and gender-matched healthy controls. Differentially expressed miRNAs (|fold change|³2 and p-value ≤ 0.05 in three statistical tests, Fischer-exact, t-test, and Wilcoxon) were identified and the predictive power of individual and subsets of miRNAs were tested using univariate (logistic regression) and multivariate (Random Forest) analyses. Additional glioblastoma sera (n=4) and independent sets of healthy (n=9) and non-glioma (n=10) controls were used to further test the predictive power of our glioblastoma miRNA signature.Results: Twenty-six miRNAs were differentially expressed in glioblastoma relative to healthy controls. Seven miRNAs (miR-182-5p, miR-328-3p, miR-339-5p, miR-340-5p, miR-485-3p, miR-486-5p and miR-543) were the most stable for classifying glioblastoma, achieving a predictive power of 91.7%. Strikingly, the combined expressions of miR-182-5p, miR-328-3p miR-485-3p miR-486-5p distinguished glioblastoma patients from controls with perfect accuracy. This miRNA panel was able to correctly classify all specimens in validation cohorts (n=23). An analogous approach was used to identify 23 dysregulated miRNAs in IDH-mutant gliomas, including a distinct subset of stable miRNAs for classifying patients with lower-grade IDH-mutant gliomas.Conclusions: Our serum exosomal-miRNA signature can accurately diagnose glioblastoma preoperatively. These findings have significant scope to revolutionize glioblastoma tumor diagnosis and disease monitoring.IMPORTANCE OF STUDY: There is a real need for accurate biomarkers that can measure glioblastoma disease activity and treatment response in a safe and timely manner. This study demonstrates that exosome-associated microRNAs have exceptional utility as blood-based biomarkers in glioma patients. This work also shows the potential for exosomal microRNA profiles to be used for glioma subtyping, grading and determining mutational states. The development of specific, sensitive and non-invasive screening tests would have significant clinical benefit by reducing costs of treatment monitoring, improving accessibility and quality-of-life measures. Moreover, such tests have the potential to provide objectively measured surrogate endpoints to allow clinical trial protocols to be more dynamic and adaptive.',
    pubmed_id: '30564636',
  },
  {
    gse_id: 'GSE114329',
    Organization:
      'Submission date, May 10, 2018, Last update date, Mar 21, 2019, Contact name, Hani Goodarzi, Organization name, UCSF, Department, Biochemistry and Biophysics, Street address, 600 16th St, GH S312D, City, San Francisco, State/province, CA, ZIP/Postal code, 94158, Country, USA',
    Contributor: 'Fish L, Zhang S, Goodarzi H',
    Overall_design:
      'BRCA-lines_EV_smRNA: Eight breast cancer lines and human mammary epithelial cells were cultured in biological replicates. Exosomes/small extracellular vesicles (EV) were then collected from the conditioned media using the Cell Culture Media Exosome Purification Mini Kit (Norgen). Samples were then subjected to small RNA sequencing. The number of unique orphan non-coding RNAs were then recorded for each sample.',
    Summary:
      "We performed small RNA sequencing of exosomes and extracellular vesicles collected from breast cancer cells as well as human mammary epithelial cells (HUMEC) in biological replicates (using Norgen's cell culture media exosme purification and RNA isoaltion kits).",
    pubmed_id: '30397354',
  },
  {
    gse_id: 'GSE67004',
    Organization:
      'Submission date, Mar 17, 2015, Last update date, May 15, 2019, Contact name, Yongchao Dou, E-mail(s), douyongchao@gmail.com, Organization name, vanderbilt medical center, Street address, 2525 west end, City, Nashville, State/province, Tennessee, ZIP/Postal code, 37203, Country, USA',
    Contributor:
      'Franklin JL, Cha DJ, Dou Y, Liu Q, Higginbotham JN, Weaver AM, Vickers K, Demory Beckler M, Prasad N, Levy S, Zhang B, Coffey RJ, Patton JG',
    Overall_design:
      'miRNAseq deep sequencing for both cell and exosome mirnas of Dks-8, DLD-1, and DKO-1 cell lines. The DKs-8 line contains a wild type KRAS alleles, the DLD-1 line contains both wild type and mutant (G13D) KRAS alleles, and the DKO-1 line contains only a mutant KRAS allele.',
    Summary:
      'Although long thought to act cell autonomously, mutant KRAS colorectal cancer (CRC) cells release protein-laden exosomes that can alter the tumor microenvironment.  We have previously shown that mutant KRAS induces EGFR-ligand trafficking to exosomes and drastically alters exosomal protein contents, leading to activities that contribute to neoplastic growth. We have performed small library RNAseq analysis on cells and matched exosomes from isogenic CRC cell lines differing only in KRAS status to determine whether mutant KRAS regulates the composition of secreted small RNAs. Exosomal small RNA profiles were distinct from cellular profiles, with principle component analysis showing clusters of mutant KRAS cell-derived exosomes distinct from wild type KRAS cell-derived exosomes. Secreted RNA species encompassed several different classes of small RNAs, including ribosomal and tRNA fragments, as well as mature miRNA sequences. miR-10b, was selectively increased in wild type KRAS-derived exosomes, whereas miR-100 was selectively increased in mutant KRAS-derived exosomes.  Ceramide inhibition resulted in accumulation of miR-100 in mutant KRAS cells, suggesting KRAS-dependent miRNA export.  In Transwell cell culture experiments, mutant, but not wild type, KRAS donor cells conferred miR-100-mediated target repression in wild type KRAS recipient cells',
    pubmed_id: '26132860',
  },
  {
    gse_id: 'GSE58410',
    Organization:
      'Submission date, Jun 11, 2014, Last update date, May 15, 2019, Contact name, Liang Wang, E-mail(s), liwang@mcw.edu, Phone, 414-955-2574, Organization name, Medical College of Wisconsin, Department, Pathology, Street address, 8701 Watertown Plank Rd., City, Milwaukee, State/province, Wisconsin, ZIP/Postal code, 53226, Country, USA',
    Contributor:
      'Huang X, Yuan T, Liang M, Du M, Xia S, Dittmar R, Wang D, See W, Costello BA, Quevedo F, Tan W, Nandy D, Bevan GH, Longenbach S, Sun Z, Lu Y, Wang T, Thibodeau SN, Boardman L, Kohli M, Wang L',
    Overall_design:
      'RNA sequencing was performed to identify candidate exosomal miRNAs associated with overall survival in a screening cohort of 23 CRPC patients. Candidate miRNAs were further evaluated for prognosis using qRT-PCR in a follow-up cohort of 100 patients',
    Summary:
      'Extracellular microRNAs (miRNAs) embedded in circulating exosomes may serves as prognostic biomarkers in cancer. This study was performed to identify and evaluate plasma exosomal miRNAs for prognostication in castration resistant prostate cancer (CRPC). RNA sequencing was performed to identify candidate exosomal miRNAs associated with overall survival in a screening cohort of 23 CRPC patients. Candidate miRNAs were further evaluated for prognosis using qRT-PCR in a follow-up cohort of 100 patients. Cox regression and Kaplan–Meier survival curve analysis were used to evaluate prognostic value of miRNA candidates with and without incorporation of clinical prognostic factors (age, Gleason score and time from androgen deprivation therapy to clinical progression). In the screening cohort, we obtained ~6.80 million mappable RNA reads per patient. Of those with normalized read counts ? 5, 43% were mapped to miRNAs for a total of 375 known and 57 novel miRNAs. Cox regression analysis identified an association of miR-1290, -1246, and -375 with overall survival (FDR<0.1). Of those, higher levels of miR-1290 and -375 were verified to be significantly associated with poor overall survival (p<0.004) in the follow-up cohort. The miR-1290/-375-based prediction model showed better performance with time-dependent area under the curve (AUC) =72% compared to clinical variable-based model with AUC=65%. Plasma exosomal miR-1290 and miR-375 are promising prognostic biomarkers for CRPC patients. Prospective validation is needed for further development of these candidate miRNAs.',
    pubmed_id: '25129854',
  },
  {
    gse_id: 'GSE53452',
    Organization:
      'Submission date, Dec 18, 2013, Last update date, May 15, 2019, Contact name, Liang Wang, E-mail(s), liwang@mcw.edu, Phone, 414-955-2574, Organization name, Medical College of Wisconsin, Department, Pathology, Street address, 8701 Watertown Plank Rd., City, Milwaukee, State/province, Wisconsin, ZIP/Postal code, 53226, Country, USA',
    Overall_design: 'Refer to individual Series',
    Summary: 'This SuperSeries is composed of the SubSeries listed below.',
    pubmed_id: '24593312',
  },
  {
    gse_id: 'GSE83669',
    Organization:
      'Submission date, Jun 23, 2016, Last update date, May 15, 2019, Contact name, Bethany Hannafon, E-mail(s), bethany-hannafon@ouhsc.edu, Organization name, University of Oklahoma Health Sciences Center, Department, Pathology, Street address, 975 NE 10th Street, City, Oklahoma city, State/province, OK, ZIP/Postal code, 73104, Country, USA',
    Contributor: 'Hannafon BN, Trigoso YD, Calloway CL, Zhao D, Lum D, Zhao J, Blick KE, Welm AL, Dooley WC, Ding W',
    Overall_design:
      'The small RNA in the cells and exosomes of the normal mammary epithelial cell line (MCF10A) and two breast cancer cell lines (MCF7 and MDA-MB-231) were analyzed by Next Gen RNA Sequencing.',
    Summary:
      'Introduction: microRNAs are promising candidate breast cancer biomarkers due to their cancer-specific expression profiles. However, efforts to develop circulating breast cancer biomarkers are challenged by the heterogeneity of microRNAs in the blood. To overcome this challenge, we aimed to develop a molecular profile of microRNAs specifically secreted from breast cancer cells. Our first step towards this direction relates to capturing and analyzing the contents of exosomes, which are small secretory vesicles that selectively encapsulate microRNAs indicative of their cell of origin. To our knowledge, circulating exosome microRNAs have not been well evaluated as biomarkers for breast cancer diagnosis or monitoring.Methods: Exosomes were collected from the conditioned media of human breast cancer cell lines, mouse plasma of patient-derived orthotopic xenograft models (PDX), and human plasma samples. Exosomes were verified by electron microscopy, nanoparticle tracking analysis, and western blot. Cellular and exosome microRNAs from breast cancer cell lines were profiled by next-generation small RNA sequencing. Plasma exosome microRNA expression was analyzed by qRT-PCR analysis.Results: Small RNA sequencing and qRT-PCR analysis showed that several microRNAs are selectively encapsulated or highly enriched in breast cancer exosomes. Importantly, the selectively enriched exosome microRNA, human miR-1246, was detected at significantly higher levels in exosomes isolated from PDX mouse plasma, indicating that tumor exosome microRNAs are released into the circulation and can serve as plasma biomarkers for breast cancer. This observation was extended to human plasma samples where miR-1246 and miR-21 were detected at significantly higher levels in the plasma exosomes of 16 breast cancer patients as compared to the plasma exosomes of healthy control subjects. Receiver Operating Characteristic (ROC) curve analysis indicated that the combination of plasma exosome miR-1246 and miR-21 levels is a better indicator of breast cancer than their individual levels.Conclusions: Our results demonstrate that certain microRNA species, such as miR-21 and miR-1246, are selectively enriched in human breast cancer exosomes and significantly elevated in the plasma of breast cancer patients. These findings indicate a potential new strategy to selectively analyze plasma breast cancer microRNAs indicative of the presence of breast cancer.',
    pubmed_id: '27608715',
  },
  {
    gse_id: 'GSE74759',
    Organization:
      'Submission date, Nov 06, 2015, Last update date, May 15, 2019, Contact name, Emiy K Tsang, E-mail(s), etsang@stanford.edu, Organization name, Stanford University, Department, Pathology, Lab, Stephen Montgomery, Street address, 300 Pasteur Dr, City, Stanford, State/province, CA, ZIP/Postal code, 94305, Country, USA',
    Contributor: 'Tsang EK, Montgomery SB',
    Overall_design: 'Small RNA-Sequencing of CEPH/UTAH family 1463 cells and exosomes',
    Summary:
      'Exosomes are small extracellular vesicles that carry heterogeneous cargo, including RNA, between cells. Increasing evidence suggests that exosomes are important mediators of intercellular communication and biomarkers of disease. Despite this, the variability of exosomal RNA between individuals has not been well quantified. To assess this variability, we sequenced the small RNA of cells and exosomes from a 17-member family. Across individuals, we show that selective export of miRNAs occurs not only at the level of specific transcripts, but that a cluster of 74 mature miRNAs on chromosome 14q32 is massively exported in exosomes while mostly absent from cells. We also observe more inter-individual variability between exosomal samples than between cellular ones and identify four miRNA expression quantitative trait loci (eQTLs) shared between cells and exosomes. Our findings indicate that genomically co-located miRNAs can be exported together and highlight the variability in exosomal miRNA levels between individuals as relevant for exosome use as diagnostics.',
    pubmed_id: '27799337',
  },
  {
    gse_id: 'GSE81151',
    Organization:
      'Submission date, May 05, 2016, Last update date, May 15, 2019, Contact name, Abu Musa Md Talimur Reza, E-mail(s), golapahbau@gmail.com, Phone, +821058084721, Organization name, Konkuk University, Department, Stem Cell and Regenerative Biology, Lab, Germ Cell and Regenerative Bio-medicine Lab., Street address, 604, Animal Science Building, City, Seoul, ZIP/Postal code, 143-701, Country, South Korea',
    Contributor: 'Reza A, Choi Y, Kim J',
    Overall_design: 'Exosomal-miRNA profiles were generated by NGS, in triplicate, by Illumina sequencing platforms.',
    Summary:
      'Purpose: Relationship between mesenchymal stem cells (MSCs) and cancer cells became mysterious because of having sufficient evidences regarding both stimulatory and inhibitory role of MSCs to cancer cells. Certainly, there is debate on customary role of MSCs (inhibitory/stimulatory), however, the notable involvement of MSCs in cancer biology is undoubtedly clear. MSCs might support tumor development through immune suppression, epithelial to mesenchymal transition (EMT), angiogenesis, and serving as cancer stromal cells. In contrast, MSCs are also reported to play role in suppression of cancer by downregulating the cancer survival signaling pathways such as Wnt/β-catenin and/or Akt3. Now, it is a rational demand to investigate the mechanism behind these completely contradictory roles of MSCs in cancer biology. Incidentally, cytokines and soluble factors secreted by MSCs have been scrutinized thoroughly and most of the reports with few exceptions concluded that MSCs-secreted cytokines and soluble factors have stimulatory effect in the progression of cancer. While, role of exosomes which is a type of micro-vesicles having 30-200 nm diameters, secreted by all cells, could be up-taken by neighboring cells, containing many important components including RNAs, proteins, DNA and lipids, serving as efficient vehicles for cancer-stromal communication,  have been investigated very marginally and deserve to go for intensive investigation. Specially, cell-secreted miRNAs (18-22 nucleotides) are predominantly carried by exosomes and have been focused in recent years for its capacity in post-transcriptional regulation of gene expression through mRNA silencing.  Hence, understating the functions of MSCs-derived secretome (particularly exosomes) in cancer is very much important to comprehend the cross-talk between MSCs and cancer cell biology. In this research, next generation sequencing (NGS) was performed for enrichment analysis of miRNAs in hAMSCs-CM derived exosomes.Methods: Exosomal-RNA was isolated from hAMSCs-CM derived exosomes, small RNA libraries were prepared through a series of processes such as adapter ligation, reverse transcription, PCR amplification, and pooled gel purification.Sequence quality was checked by FastQC experiment, unique sequences found for known miRNAs after clustering were verified with miRBase database (www.mirbase.org/) by blast, trimmed read might have considered as miRNA on condition of having 100% identical and whole length sequence of miRNA compare to the ones on miRBase database. Unmatched trimmed read excluded from miRBase were blast to ncRNA database Rfam (http://rfam.sanger.ac.uk/). Unmatched trimmed reads to any of non-miRNA on Rfam database were considered as a potential novel miRNA.Result: The exosomal-RNA sequencing explored that exosomes contains a rich population of miRNAs and many of the obtained miRNAs are reported to have anti-cancer properties through targeting different cancer survival pathways.Conclusion: Outwardly, we outlined that exosomal-miRNA is one of the conceivable reasons behind anti-proliferative effect of MSCs towards cancer cells.',
    pubmed_id: '27929108',
  },
  {
    gse_id: 'GSE72183',
    Organization:
      'Submission date, Aug 19, 2015, Last update date, May 15, 2019, Contact name, Iddo Z. Ben-Dov, E-mail(s), iddo@hadassah.org.il, Phone, +97226776881, Organization name, Hadassah Medical Center, Department, Nephrology and Hypertension, Lab, Laboratory of Medical Transcriptomics, Street address, Ein Kerem, City, Jerusalem, ZIP/Postal code, 91120, Country, Israel',
    Contributor: 'Ben-Dov IZ',
    Overall_design:
      'Two urine voids from 20 healthy volunteers (10 men, 10 women). From each void cells and extracellular vesicles were purified and total RNA extracted. Thus 80 samples overall (however only 79 processed because 1 women did not provide sufficient urine in second void for extracellular vesicle purification).',
    Summary:
      'Background: Urine is a potential source of biomarkers for diseases of the kidneys and urinary tract. RNA, including microRNA, is present in the urine enclosed in detached cells or in extracellular vesicles (EVs) or bound and protected by extracellular proteins. Detection of cell- and disease-specific microRNA in urine may aid early diagnosis of organ-specific pathology. In this study, we applied barcoded deep sequencing to profile microRNAs in urine of healthy volunteers, and characterized the effects of sex, urine fraction (cells vs. EVs) and repeated voids by the same individuals. Results: Compared to urine-cell-derived small RNA libraries, urine-EV-derived libraries were relatively enriched with miRNA, and accordingly had lesser content of other small RNA such as rRNA, tRNA and sn/snoRNA. Unsupervised clustering of specimens in relation to miRNA expression levels showed prominent bundling by specimen type (urine cells or EVs) and by sex, as well as a tendency of repeated (first and second void) samples to neighbor closely. Likewise, miRNA profile correlations between void repeats, as well as fraction counterparts (cells and EVs from the same specimen) were distinctly higher than correlations between miRNA profiles overall. Differential miRNA expression by sex was similar in cells and EVs. Conclusions: miRNA profiling of both urine EVs and sediment cells can convey biologically important differences between individuals. However, to be useful as urine biomarkers, careful consideration is needed for biofluid fractionation and sex-specific analysis, while the time of voiding appears to be less important.',
    pubmed_id: '26785265',
  },
  {
    gse_id: 'GSE71008',
    Organization:
      'Submission date, Jul 16, 2015, Last update date, May 15, 2019, Contact name, Liang Wang, E-mail(s), liwang@mcw.edu, Phone, 414-955-2574, Organization name, Medical College of Wisconsin, Department, Pathology, Street address, 8701 Watertown Plank Rd., City, Milwaukee, State/province, Wisconsin, ZIP/Postal code, 53226, Country, USA',
    Contributor: 'Yuan T, Huang X, Wang L',
    Overall_design:
      'RNAs fro plasma circulating microviscles in 192 individuals were sequenced and quantified. RNA expression stability testing was performed to identify stably expressed RNAs. Distribution of RNA species and individual RNA transcripts were compared in normal and cancer patients.',
    Summary:
      'Extracellular vesicles such as exosomes are selectively enriched in RNA that has potential for use as disease biomarkers. To systemically characterize circulating extracellular RNA profiles, we performed RNA sequencing analysis on plasma extracellular vesicles derived from 192 individuals including 100 colon cancer, 36 prostate cancer and 6 pancreatic cancer patients along with 50 healthy individuals. Of ~12.6 million raw reads for each of these subjects, the number of mappable reads aligned to RNA references was ~5.4 million including microRNAs(miRNAs) (~40.4%), piwi-interacting RNAs(piwiRNAs) (~40.0%), pseudo-genes (~3.7%), long noncoding RNAs (lncRNAs) (~2.4%), tRNAs (~2.1%), and mRNAs (~2.1%). To select the best candidates for potential extracellular RNA reference controls, we performed abundant level stability testing and identified a set of miRNAs showing relatively consistent expression. To estimate biological variations, we performed association analysis of expression levels with age and sex in healthy individuals. This analysis showed significant sex association with seven small noncoding RNAs (false discovery rate, or FDR<0.05), while no small noncoding RNAs were statistically associated with age. To identify disease-associated RNA transcripts, we performed analysis of covariance by including disease status, age, sex, RNA isolation and gel size selection dates. We observed a gradual increase of significantly associated RNAs (in particular, miRNAs) with disease advancement as denoted by cancer staging. We found significant association of miR-125a-5p and miR-1246-3p with all cancer types tested (FDR<0.05). Based on the disease associations, we developed cancer type-specific multivariate statistical models to predict disease status with an area under the ROC curve from 0.67 in stage I colon cancer to 0.92 in advanced prostate cancer. To date, this is the largest RNA-seq study to systematically profile extracellular RNA species, which has not only provided a baseline reference profile for circulating extracellular RNA, but also a set of RNA candidates for reference controls and disease biomarkers.',
    pubmed_id: '26786760',
  },
  {
    gse_id: 'GSE70432',
    Organization:
      'Submission date, Jul 01, 2015, Last update date, May 15, 2019, Contact name, Bethany Hannafon, E-mail(s), bethany-hannafon@ouhsc.edu, Organization name, University of Oklahoma Health Sciences Center, Department, Pathology, Street address, 975 NE 10th Street, City, Oklahoma city, State/province, OK, ZIP/Postal code, 73104, Country, USA',
    Contributor: 'Hannafon BN, Carpenter KJ, Berry WL, Janknecht R, Dooley WC, Ding W',
    Overall_design: 'Examination of small RNA populations in MCF7 cells and exosomes after DHA treatment.',
    Summary:
      'Background: Docosahexaenoic acid (DHA) is a natural compound with anticancer and anti-angiogenesis activity that is currently under investigation as both a preventative agent and an adjuvant to breast cancer therapy. However, the precise mechanisms of DHA’s anticancer activities are unclear. It is understood that the intercommunication between cancer cells and their microenvironment is essential to tumor angiogenesis. Exosomes are extracellular vesicles that are important mediators of intercellular communication and play a role in promoting angiogenesis. However, very little is known about the contribution of breast cancer exosomes to tumor angiogenesis or whether exosomes can mediate DHA’s anticancer action. Results: Exosomes were collected from MCF7 and MDA-MB-231 breast cancer cells after treatment with DHA. We observed an increase in exosome secretion and exosome microRNA contents from the DHA-treated cells. The expression of 83 microRNAs in the MCF7 exosomes was altered by DHA (>2-fold). The most abundant exosome microRNAs (let-7a, miR-23b, miR-27a/b, miR-21, let-7, and miR-320b) are known to have anti-cancer and/or anti-angiogenic activity. These microRNAs were also increased by DHA treatment in the exosomes from other breast cancer lines (MDA-MB-231, ZR751 and BT20), but not in exosomes from normal breast cells (MCF10A). When DHA-treated MCF7 cells were co-cultured with or their exosomes were directly applied to endothelial cell cultures, we observed an increase in the expression of these microRNAs in the endothelial cells. Furthermore, overexpression of miR-23b and miR-320b in endothelial cells decreased the expression of their pro-angiogenic target genes (PLAU, AMOTL1, NRP1 and ETS2) and significantly inhibited tube formation by endothelial cells, suggesting that the microRNAs transferred by exosomes mediate DHA’s anti-angiogenic action. These effects could be reversed by knockdown of the Rab GTPase, Rab27A, which controls exosome release. Conclusions: We conclude that DHA alters breast cancer exosome secretion and microRNA contents, which leads to the inhibition of angiogenesis. Our data demonstrate that breast cancer exosome signaling can be targeted to inhibit tumor angiogenesis and provide new insight into DHA’s anticancer action, further supporting its use in cancer therapy.',
    pubmed_id: '26178901',
  },
  {
    gse_id: 'GSE134220',
    Organization:
      'Submission date, Jul 12, 2019, Last update date, Feb 21, 2020, Contact name, Moran Amit, E-mail(s), MAmit@mdanderson.org, Organization name, The University of Texas MD Anderson Cancer Center, Department, Head & Neck Surgery - Research, Street address, 1515 Holcombe Blvd, City, Houston, State/province, TX, ZIP/Postal code, 77030, Country, USA',
    Contributor: 'Amit M',
    Overall_design: 'Examination of cancer associated neuron identity',
    Summary:
      'mRNA: profiling the neural identity of cancer associated neuronsmiRNA: investigating the p53 dependant exosomal miRNA content',
    pubmed_id: '32051587',
  },
  {
    gse_id: 'GSE128803',
    Organization:
      'Submission date, Mar 25, 2019, Last update date, Feb 26, 2020, Contact name, lin yinuo, E-mail(s), linyinuo@wmu.edu.cn, Organization name, Second Affiliated Hospital of Zhejiang University, Street address, Jiefang Road NO.88, City, Hangzhou, ZIP/Postal code, 310009, Country, China',
    Contributor: 'Yu H, Lin Y, Zhang C',
    Overall_design:
      'exosomal microRNA profiles of HeLa cell exosome vs human cervical epithelial cell (HCER) analysed using deep sequencing, in triplicate, using Illumina GAIIx.',
    Summary:
      'We aimed to compare the exosomal microRNA profile form HeLa cell line with that from human cervical epithelial cell(Hcer)line.exosomes were isolated from conditioned medium of HeLa cell and HCer cell,3 samples for each group.Exosomal microRNAs were sequenced on Proton Sequencers according to Ion PI Hi-Q Sequencing 200 Kit (Life Technologies).According to the results of miRNA sequencing, we found a total 371 different miRNAs the amount of which reach to 10 fold differece between two groups.',
    pubmed_id: 'unavailable',
  },
  {
    gse_id: 'GSE130654',
    Organization:
      'Submission date, May 03, 2019, Last update date, Apr 10, 2020, Contact name, Shuli Tang, E-mail(s), tangshuli2005@163.com, Phone, +86 13946016223, Organization name, Harbin Medical University Cancer Hospital, Street address, Haping Road No.150, Nangang District, City, Harbin, State/province, Heilongjiang Province, ZIP/Postal code, 150081, Country, China',
    Contributor: 'Zhang Y, Huang X, Tang S, Cheng J, Yao Y, Lou C, Wang L',
    Overall_design:
      'Serum exosomal miRNA profiles of early gastric cancer patients were generated by deep sequencing, in triplicate, using Illumina Hiseq 2500/2000 platform.',
    Summary:
      'The aim of this study was to identify and evaluate exosomal miRNAs in serum as early diagnostic markers for gastric cancer (GC).Methods: Using next-generation sequencing (NGS) and bioinformatics, we identified candidate serum exosomal miRNA markers for early detection of GC in patients. The candidates were further validated by qRT-PCR in 50 newly recruited early-stage GC patients and matched healthy individuals.Results: NGS revealed that the average mappable reads in the RNA libraries were about 6.5 million per patient. A total of 66 up and 13 down-regulated exosomal miRNAs were found in the screened cohort after removal of log2 transformed read counts <5 and p >0.05. In the validation cohort, by comparing candidate exosomal miRNAs levels in early-stage GC patients and healthy individuals, higher levels of miR-92b-3p, let-7g-5p, miR-146b-5p and miR-9-5p were found to be significantly associated with GC. Diagnostic power of the combined panels of the exosomal miRNAs or the combination of exosomal miRNAs and CEA outperformed that of single exosomal miRNA marker for establishing a diagnosis of early-stage GC. In addition, serum levels of exosomal miR-92b-3p were significantly associated with low adhesion, let-7g-5p and miR-146b-5p were significantly correlated with nerve infiltration, and miR146b-5p was statistically correlated with tumor invasion depth in early-stage GC.Conclusions: Serum exosomal miR-92b-3p, -146b-5p, -9-5p, and let-7g-5p may serve as potential noninvasive biomarkers for early diagnosis of GC. Further validation of these candidate exosomal miRNAs in larger experimental cohorts are required in order to confirm the diagnostic values.',
    pubmed_id: '32256526',
  },
  {
    gse_id: 'GSE145508',
    Organization:
      'Submission date, Feb 19, 2020, Last update date, Apr 22, 2020, Contact name, Hara Kang, Organization name, Incheon National University, Street address, 119 Academy-ro, City, Incheon, ZIP/Postal code, 22012, Country, South Korea',
    Contributor: 'Kang H',
    Overall_design:
      'microRNA expression profiles of exosomes secreted by human pulmonary artery smooth muscle cells after exposure to PDGF-BB by Illumina Hi-seq 2000.',
    Summary:
      'Analysis of exosomal microRNAs secreted by PDGF-stimulated human pulmonary artery smooth muscle cells. Results increase our understanding of exosome-mediated crosstalk between vascular cells under a pathological condition.',
    pubmed_id: '32155804',
  },
  {
    gse_id: 'GSE136997',
    Organization:
      'Submission date, Sep 06, 2019, Last update date, Apr 12, 2020, Contact name, Jesper Just, E-mail(s), jesperj@cfin.au.dk, Organization name, Aarhus University, Department, Clinical Medicine, Street address, Palle Juul-Jensens boulevard 99, City, Aarhus N, ZIP/Postal code, 8200, Country, Denmark',
    Contributor: 'Yan Y, Kjems J, Venø M, Just J, Drasbek K, Sloth M',
    Overall_design:
      'Examination of miRNA changes in circulating extracellular vesicles before and 1 hour after blood flow restricted exercise.',
    Summary:
      'In this study, we provide evidence that ischemic exercise, conducted as blood flow-restricted resistance exercise, promote changes in the micro-RNA cargo of circulating extracellular vesicles in healthy volunteers.',
    pubmed_id: '32245988',
  },
  {
    gse_id: 'GSE129892',
    Organization:
      'Submission date, Apr 16, 2019, Last update date, Mar 05, 2020, Contact name, Danielle Michell, E-mail(s), danielle.michell@vumc.org, Organization name, Vanderbilt Univ. Medical Center, Street address, 2220 Pierece Ave, 312 Preston Research Bldg, City, Nashville, State/province, TN, ZIP/Postal code, 37232, Country, USA',
    Overall_design: 'Refer to individual Series',
    Summary: 'This SuperSeries is composed of the SubSeries listed below.',
    pubmed_id: '32214346',
  },
  {
    gse_id: 'GSE114711',
    Organization:
      'Submission date, May 21, 2018, Last update date, Mar 26, 2019, Contact name, Serge Patrick Nana-Sinkam, Organization name, Virginia Commonwealth University, Department, Department of Internal Medicine Division of Pulmonary Disease and Critical Care Medicine, Street address, 1200 East Broad Street, City, Richmond, State/province, Virgina, ZIP/Postal code, 23298, Country, USA',
    Contributor: 'Acunzo M, Nana-Sinkam PS',
    Overall_design:
      'A total of 26 frozen plasma samples received as generous gift from the NYU plasma bank (courtesy of H.I. Pass MD, IRB approved protocol) and grouped into the following three categories: 7 control smokers, 11 early stage NSCLC, and 8 late stage NSCLC.',
    Summary:
      'We analyzed small-RNA sequencing data from plasma-derived exosome (PEV) from a cohort of NSCLC patients at different stages.We identified two ED miRNAs in circulation able to distinguish between normal and tumor sample subtypes.',
    pubmed_id: '29976955',
  },
  {
    gse_id: 'GSE106224',
    Organization:
      'Submission date, Oct 26, 2017, Last update date, Jul 09, 2019, Contact name, Kai Wang, E-mail(s), kwang@systemsbiology.org, Organization name, Institute for Systems Biology, Street address, 401 Terry Ave N, City, Seattle, State/province, WA, ZIP/Postal code, 98109, Country, USA',
    Contributor: 'Fallen S, Kim T, Wang K',
    Overall_design:
      'Blood samples were collected from women who had spontaneous preterm births between 24-34 weeks (n=20) and matched with respect to gestational age and other variables to pregnant women with normal pregnancy (n=50).',
    Summary:
      'Preterm birth (PTB) is defined as childbirth occurring at less than 37 completed weeks or 259 days of gestation. Premature babies have higher rates of cerebral palsy, sensory deficits, learning disabilities and respiratory illnesses that extend into adulthood. This lifelong morbidity results in high economic and social costs to families and communities. PTB is a syndrome initiated by multiple mechanisms, including infection or inflammation, uteroplacental ischaemia or haemorrhage, uterine overdistension, stress, and other immunologically mediated processes. Identifying and monitoring molecular signals in easily accessible body fluids that can diagnose or predict the risk of preterm labor in pregnant women will reduce or prevent PTBs. A number of studies reported the identification of putative biomarkers for PTB including protein, miRNA and hormone from different body fluids such as serum/plasma, cervical vaginal fluid, saliva and amniotic fluids. These putative biomarkers identified can largely be grouped into three main functional categories: inflammatory related molecules, placenta or fetal derived molecules and stress related molecules. In the past few years next generation sequencing (NGS) has become the major platform for miRNA analysis especially with body fluids. However, studies have shown significant sequence bias among different small RNA library preparation protocols. We have modified the small RNA library construction protocol which greatly reduces the sequence bias and increase miRNA coverage in sample. We also adapted a newly developed size exclusion chromatography (SEC) based EV purification protocol which can provide cleaner EVs compared to other methods. We are using these improved approaches to gain more reliable profile of circulating RNA in body fluid as well as its associated EVs. With these new approaches, we explore the possibility of using specific circulating miRNAs, specifically those encapsulated in EVs, as a noninvasive biomarker for PTB by comparing the miRNA profiles in maternal plasma, EV and EV-depleted plasma between individuals who had a spontaneous preterm birth and uncomplicated pregnancies.',
    pubmed_id: '29516617',
  },
  {
    gse_id: 'GSE103493',
    Organization:
      'Submission date, Sep 05, 2017, Last update date, May 15, 2019, Contact name, Sukhbir Kaur, E-mail(s), kaurs@mail.nih.gov, Organization name, NIH, Department, NCI, Lab, LP, Street address, 10 Center Drive, City, Bethesda, ZIP/Postal code, 20892, Country, USA',
    Contributor: 'Kaur S, Elkahloun A, Myers TG, Young L',
    Overall_design:
      'Jurkat cell exosomes where bound by CD47, CD63 and MHC1 antibodies and compared to their un-bound exosomes using a total of 14 samples: triplicates for CD47 bound and unbound and duplicates for the rest.',
    Summary:
      'Extracellular vesicles (EVs) mediate cell-cell communication including the intercellular transfer of RNAs, which alter gene expression in target cells. However, heterogeneity in the size, density, and composition of EVs has limited progress towards defining their physiological functions and utility as disease-specific biomarkers. CD63 and MHC-1 are widely used as markers to purify EVs. CD47 is also present on EVs and alters their effects on target cells, suggesting that specific surface markers define functionally distinct EVs. This hypothesis was addressed by comparing the properties of Jurkat T cell EVs captured using CD47, CD63, and MHC-1 antibodies. These EV subsets have similar sizes but divergent RNA contents.',
    pubmed_id: '29416092',
  },
  {
    gse_id: 'GSE103831',
    Organization:
      "Submission date, Sep 13, 2017, Last update date, Jul 08, 2019, Contact name, Ingrid Struman, E-mail(s), i.struman@ulg.ac.be, Organization name, GIGA-R, Department, BMGG, Street address, Avenue de l'Hôpital, 1, City, Liege, ZIP/Postal code, 4000, Country, Belgium",
    Contributor: 'Perez-Boza J, Lion M, Struman I',
    Overall_design:
      'Basal cellular and exosomal samples were prepared for smallRNA enriched sequencing and for total RNA sequencing using Illumina sample preparation and sequencing. Two biological replicates were prepared in parallel per condition and RNA typePlease note that the processed data was generated from all 8 samples together and thus, is linked to the Series records.',
    Summary:
      'Exosomes are small extracellular vesicles of around 100nm of diameter produced by most cell types. These vesicles carry nucleic acids, proteins, lipids and other biomolecules and function as carriers of biological information in processes of extracellular communication. The content of exosomes is regulated by the external and internal microenvironment of the parent cell, but the intrinsic mechanisms of loading of molecules into exosomes is still not completely elucidated. In this study, by the use of next generation sequencing we have characterized in depth the RNA composition of healthy endothelial cells and exosomes and provided an accurate profile of the different coding and non-coding RNA species found per compartment. We have also discovered a set of unique genes preferentially included (or excluded) into vesicles. Moreover, after studying the enrichment of RNA motifs in the genes unequally distributed between cells and exosomes, we have detected a set of enriched sequences for several classes of RNA. In conclusion, our results provide the basis to study the involvement of RNA-binding proteins capable to recognize RNA sequences and their role in the export of RNAs into exosomes.',
    pubmed_id: '29282313',
  },
  {
    gse_id: 'GSE109879',
    Organization:
      'Submission date, Jan 30, 2018, Last update date, Oct 15, 2019, Contact name, Wu Qi, E-mail(s), wind_y1990@126.com, Phone, +8613707198696, Organization name, Renmin Hospital of Wuhan University, Department, Department of Breast and Thyroid Surgery, Street address, 99 Zhang Zhidong Road, City, Wuhan, State/province, Hubei, ZIP/Postal code, 430060, Country, China',
    Contributor: 'Qi W',
    Overall_design: 'exosomes from MDA-MB-231 cultivated with mature 3T3-L1',
    Summary:
      'To identify miRNAs involved in exosomes from MDA-MB-231 cultivated with mature 3T3-L1, small RNA libraries from exosomes stored at 20 °C for 0 and 24 h were constructed. A total of 432 small RNA sequences were generated, and 88 known and 1224 new candidate miRNAs were obtained. Among them, 85 miRNAs were up-regulated and 300 were down-regulated in exosomes from MDA-MB-231 cultivated with mature 3T3-L1.',
    pubmed_id: '31138258, 30474469',
  },
  {
    gse_id: 'GSE94721',
    Organization:
      'Submission date, Feb 09, 2017, Last update date, May 15, 2019, Contact name, Dominic Guanzon, Organization name, University of Queensland, Department, UQCCR, Lab, Exosome biology laboratory, Street address, Building 71/918 RBWH Herston, City, Brisbane, State/province, Queensland, ZIP/Postal code, 4029, Country, Australia',
    Contributor: 'Salomon C, Guanzon D, Rice GE',
    Overall_design: 'miRNAs were profiled from exosomes using next generation seqeuencing, utilizing the Illumina NextSeq 500 platform',
    Summary:
      'Preeclampsia (PE) and its related diseases is one of the most significant pregnancy complications, occurring at an incidence of 3-5% and is responsible for nearly 40% of premature births delivered before 35 weeks. There is a need to develop strategies for early prediction of patients who will develop PE, in order to establish preventive strategies to reduce the prevalence and severity of the disease and their associated aftereffects. Therefore, a prospective cohort of patients were recruited at three time points during pregnancy for each patient (i.e. 11-14 (early gestational age), 22-24 (middle gestational age) and 32-36 (late gestational age) weeks gestation). A retrospective stratified study design was used to characterize miRNAs in exosomes derived from maternal plasma of normal (n=32 per time point) and PE (n=15 per time point) pregnancies.',
    pubmed_id: '28531338',
  },
  {
    gse_id: 'GSE93143',
    Organization:
      "Submission date, Jan 04, 2017, Last update date, May 15, 2019, Contact name, Zhiyun Wei, Organization name, Brigham and Women's Hospital, Department, Neurology, Lab, Krichevsky, Street address, 60 Fenwood Road, City, Boston, State/province, Massachusetts, ZIP/Postal code, 02115, Country, USA",
    Contributor: 'Zhiyun W, Anna KM',
    Overall_design:
      'Four low-passage patient-derived glioblastoma stem cell cultures were grown as neurospheres in serum-free media. Microvesicles (MVs), exosomes, and ribonucleoproteins (RNPs) were separated from conditioned media using sequential filtration, and RNA was isolated from each fraction. Cellular RNA was isolated from cultures in parallel. RNA was also isolated from MVs, exosomes, and RNPs from fresh media. Both long RNA library and small RNA libraries were prepared for each RNA sample, and sequenced on HiSeq2000. Cellular RNA of human or mouse primary normal brain cells (neurons, astrocytes, microglia, and endothelial cells) were also sequenced for small RNA libraries.',
    Summary:
      'Communication between glioblastoma brain tumor (GBM) and its microenvironment alters the parameters of tumor growth and host responses, and may be mediated in part by tumor-secreted RNA. The global repertoire of extracellular RNAs (exRNAs) released by GBM, however, has not been investigated. We have developed a protocol enabling quantitative, minimally biased analysis of vesicular and non-vesicular exRNA complexes, including microvesicles (MVs) and exosomes (collectively called extracelluar vesicles; EVs), as well as ribonucleoproteins (RNPs) and applied it to study exRNA in patient-derived glioma stem-like cultures (GSC). Despite the intertumoral heterogeneity, further exacerbated at the exRNA level, the extracellular complexes exhibit distinct RNA composition, with microvesicles most closely reflecting the cellular transcriptome, and exRNPs exhibiting the most discrete repertoire. Up to 90% of exRNA reads represent fragmented rRNA; the remaining content is enriched in small ncRNA species, such as miRNAs in exosomes, and precisely processed tRNA and Y RNA fragments in both EVs and exRNPs. EV-enclosed mRNAs are mostly fragmented, and UTRs are more abundant than ORF regions; nevertheless, some full-length transcripts are present. Overall, there is less than one copy of non-rRNA per EV. Our results suggest that massive EV/exRNA uptake would be required to ensure functional impact of transferred information to the normal recipient cells of the brain and predict the most impactful miRNAs in such conditions. This study also provides a catalog of diverse vesicular and non-vesicular exRNA species useful for biomarker discovery.',
    pubmed_id: '29074968',
  },
  {
    gse_id: 'GSE93175',
    Organization:
      'Submission date, Jan 05, 2017, Last update date, May 15, 2019, Contact name, Liang Wang, E-mail(s), liwang@mcw.edu, Organization name, Medical College of Wisconsin, Street address, 8701 Watertown Plank Road, City, Milwaukee, ZIP/Postal code, 53226, Country, USA',
    Contributor: 'Du M, Wang L',
    Overall_design:
      'exosomal miRNAs profiles of 41 mRCC patients were generated by 50 bp single read sequencing using Illumina HiSeq2000 DNA sequence analyzer.',
    Summary:
      'Purpose: Since clinical characteristics are often inaccurate and subjective, we evaluated the prognostic value of plasma exosomal miRNAs to predict survival in metastatic renal cell cancer (mRCC).Methods: RNA sequencing was performed to identify candidate exosomal miRNAs associated with overall survival in a screening cohort of 41 mRCC patients.Candidate miRNAs were further evaluated for prognosis by TaqMan quantitative real-time reverse transcription polymerase chain reaction (qRT-PCR) in a follow-up cohort of 65 mRCC patients.Results: RNA sequencing in screening cohort generated 3.75 million mappable reads per patient, of those with normalized read counts>8 RPM (reads per million), 93.8% were mapped to miRNAs for a total of 322 unique miRNAs. Cox regression analysis identified 20 miRNAs that were associated with overall survival (OS, FDR< 0.05). Among these 20 significant miRNAs, three were validated in a separate independent cohort of 65 patients with mRCC.Patients with lower expression of miR-26a1-3p, miR-let-7i-5p and miR-615-3p had a significantly poorer OS than those with higher expression. Multivariate model by combining miR-let-7i-5p and the Memorial Sloan-Kettering Cancer Center (MSKCC) score significantly improved survival prediction.Conclusions: Our study identifies multiple plasma exosomal miRNAs showing association with survival in mRCC stage patients. Multivariate model by combining miR-let-7i-5p and the Memorial Sloan-Kettering Cancer Center (MSKCC) score significantly improved survival prediction.',
    pubmed_id: '28969022',
  },
  {
    gse_id: 'GSE106277',
    Organization:
      'Submission date, Oct 27, 2017, Last update date, May 15, 2019, Contact name, Tanyalak Parimon, E-mail(s), tanyalak.parimon@cshs.org, Organization name, Cedars-Sinai Medical Center, Department, Medicine, Lab, Peter Chen, Street address, 127 San Vicente, City, Los Angeles, State/province, CA, ZIP/Postal code, 90048, Country, USA',
    Contributor: 'Parimon T, Chen P',
    Overall_design:
      'Examiniation of exosomal microRNA profile in 2 sets of human non-small cell lung cancer cell lines (A549 cell line); The first set is scramble (wild-type; A549.Scrb) cells and syndecan-1 knock-down (A549.1735) cells',
    Summary:
      'We evaluated the effect of syndecan-1 in various cell-based and animal models of lung cancer and found that lung tumorigenesis was promoted when cells lose syndecan-1 expression. We also demonstrate that syndecan-1 (or lack thereof) alters the microRNA (miRNA) cargo carried within exosomes exported from lung cancer cells. Analysis of the changes in miRNA expression identifies a distinct shift toward augmented pro-cancerous signaling, which are consistent with the changes found in lung adenocarcinoma. In all, our work identifies syndecan-1 as an important factor on lung cancer cells that control its ability to shape the lung tumor microenvironment through alterations in miRNA packaging within exosomes.',
    pubmed_id: '29355516',
  },
  {
    gse_id: 'GSE106303',
    Organization:
      'Submission date, Oct 30, 2017, Last update date, May 15, 2019, Contact name, Tanyalak Parimon, E-mail(s), tanyalak.parimon@cshs.org, Organization name, Cedars-Sinai Medical Center, Department, Medicine, Lab, Peter Chen, Street address, 127 San Vicente, City, Los Angeles, State/province, CA, ZIP/Postal code, 90048, Country, USA',
    Contributor: 'Parimon T, Chen P',
    Overall_design:
      'Examiniation of exosomal microRNA profile in 2 sets of human non-small cell lung cancer cell lines (EKVX cell line); The first set is scramble (wild-type; EKVX.Scrb) cells and syndecan-1 knock-down (EKVX.1735) cells',
    Summary:
      'We evaluated the effect of syndecan-1 in various cell-based and animal models of lung cancer and found that lung tumorigenesis was promoted when cells lose syndecan-1 expression. We also demonstrate that syndecan-1 (or lack thereof) alters the microRNA (miRNA) cargo carried within exosomes exported from lung cancer cells. Analysis of the changes in miRNA expression identifies a distinct shift toward augmented pro-cancerous signaling, which are consistent with the changes found in lung adenocarcinoma. In all, our work identifies syndecan-1 as an important factor on lung cancer cells that control its ability to shape the lung tumor microenvironment through alterations in miRNA packaging within exosomes.',
    pubmed_id: '29355516',
  },
  {
    gse_id: 'GSE97644',
    Organization:
      'Submission date, Apr 11, 2017, Last update date, Jun 19, 2019, Contact name, Thomas C Foster, E-mail(s), foster1@ufl.edu, Phone, 3522735093, Organization name, University of Florida, Department, Neuroscience, Lab, L2-132 (MBI), Building-59, Street address, 1149 S Newell Dr., City, Gainesville, State/province, FL, ZIP/Postal code, 32610, Country, USA',
    Contributor: 'Rani A, O’Shea A, Ianov L, Cohen RA, Woods AJ, Foster TC',
    Overall_design:
      'The study included 97 human subjects, males (n = 58) and females (n = 39) (age range 44-102 years, average 73 years). Plasma exosomal miRNA was used to investigate the expression level associated with cognitive decline.',
    Summary:
      'Neural imaging, genetics, and circulating biomarkers are being developed to differentiate normal aging from diseases that affect cognition. The blood based biomarkers, such as plasma exosome could provide a simple and relatively inexpensive means for tracking the progression of cognitive decline and effectiveness of treatments, as well as providing information on mechanism for cognitive impairment.',
    pubmed_id: '29046635',
  },
  {
    gse_id: 'GSE117744',
    Organization:
      'Submission date, Jul 26, 2018, Last update date, Mar 26, 2019, Contact name, Victoria James, E-mail(s), victoria.james@nottingham.ac.uk, Organization name, University of Nottingham, Street address, Sutton Bonington Campus, City, Leicestershire, ZIP/Postal code, LE12 5RD, Country, United Kingdom',
    Contributor: 'James V, Dottorini T',
    Overall_design:
      'miRNAs and mRNA from PC3 extracellular vesicles tested by RNAseq in duplicate using an Illumina Nextseq 500 mid Output run',
    Summary:
      'Analysis of miRNA and mRNA within extracellular vesicles obtained from prostate cancer PC3 cells. Kaighn ME, et al. Establishment and characterization of a human prostatic carcinoma cell line (PC-3). Invest. Urol. 17: 16-23, 1979. PubMed: 447482',
    pubmed_id: '30353168',
  },
  {
    gse_id: 'GSE141326',
    Organization:
      'Submission date, Dec 03, 2019, Last update date, Mar 16, 2020, Contact name, Patricia Midori Murobushi Ozawa, E-mail(s), paty.mih@gmail.com, Organization name, Federal University of Parana, Department, Genetics, Street address, Av. Cel. Francisco H. dos Santos, 100, City, Curitiba, State/province, PR, ZIP/Postal code, 81530-000, Country, Brazil',
    Contributor:
      'Vieira E, Lemos DS, Melo Souza IL, Zanata SM, Pankievicz VC, Tuleski TR, Souza EM, Wowk PF, Urban Cd, Kuroda F, Lima RS, Almeida RC, Gradia DF, Cavalli IJ, Cavalli LR, Malheiros D, Ribeiro EM',
    Overall_design:
      'MiRNAs derived from extracellular vesicles were isolated from serum samples of well clinically annotated breast cancer patients and control from South of Brazil',
    Summary:
      'Purpose: In this study, we performed RNA-seq analysis as a screening strategy to identify EV-miRNAs derived from serum of well clinically annotated breast cancer (BC) patients from South of Brazil.Methods: EVs from three groups of samples, healthy controls (CT), luminal A (LA), and triple negative (TNBC), were isolated from serum using a precipitation method and analyzed by RNA-seq (screening phase). Subsequently, four EV-miRNAs (miR-142-5p, miR-150-5p, miR-320a, and miR-4433b-5p) were selected to be quantified by RT-qPCR in individual samples (test phase).Results: A panel composed of miR-142-5p, miR-320a, and miR-4433b-5p discriminated BC patients from CT with an AUC of 0.8387 (93.33% sensitivity, 68.75% specificity). In addition, the combination of miR-142-5p and miR-320a, presented an AUC of 0.941 (100% sensitivity, 93.80% specificity) in distinguishing LA patients from CT. Interestingly, decrease expression of miR-142-5p and miR-150-5p were significantly associated with more advanced tumor grades (grade III), while the decrease expression of miR-142-5p and miR-320a with larger tumor size.Conclusion: These results provide insights into the potential application of EVs-miRNAs from serum as novel specific markers for early diagnosis of BC.',
    pubmed_id: '31963351',
  },
  {
    gse_id: 'GSE143613',
    Organization:
      "Submission date, Jan 14, 2020, Last update date, Mar 03, 2020, Contact name, Jeroen van de Peppel, E-mail(s), h.vandepeppel@erasmusmc.nl, Organization name, ErasmusMC, Street address, 's Gravendijkwal 230, City, Rotterdam, ZIP/Postal code, 3015 CE, Country, Netherlands",
    Contributor: 'van de Peppel J, Morhayim J, Hoogenboezem R, Bindels E, Braakman E',
    Overall_design: 'Examination of the miRNA content of extracellular vesicles isolated from 2 different cell lines',
    Summary:
      'Osteolineage cell-derived extracellular vesicles (EVs) play a regulatory role in hematopoiesis and have been shown to promote the ex vivo expansion of human hematopoietic stem and progenitor cells (HSPCs). Here, we demonstrate that EVs from different human osteolineage sources do not have the same HSPC expansion promoting potential. Comparison of stimulatory and non-stimulatory osteolineage EVs by next-generation sequencing and mass spectrometry analyses revealed distinct microRNA (miRNA) and protein signatures identifying EV-derived candidate regulators of ex vivo HSPC expansion. Accordingly, the treatment of umbilical cord blood-derived CD34+ HSPCs with stimulatory EVs altered HSPC transcriptome, including genes with known roles in cell proliferation. An integrative bioinformatics approach, which connects the HSPC gene expression data with the candidate cargo in stimulatory EVs, delineated the potentially targeted biological functions and pathways during hematopoietic cell expansion and development. In conclusion, our study gives novel insights into the complex biological role of EVs in osteolineage cell-HSPC crosstalk and promotes the utility of EVs and their cargo as therapeutic agents in regenerative medicine.',
    pubmed_id: '32086861',
  },
  {
    gse_id: 'GSE145051',
    Organization:
      'Submission date, Feb 10, 2020, Last update date, Mar 30, 2020, Contact name, Jennifer Chan, E-mail(s), jennifer.chan2@mssm.edu, Organization name, Icahn School of Medicine at Mount Sinai, Department, Neuroscience, Street address, 1470 Madison Ave, Hess 9-201, City, New York, State/province, New York, ZIP/Postal code, 10029, Country, USA',
    Contributor: 'Chan JC, Morgan CP, Cisse YM, Bale TL',
    Overall_design:
      'Examination of 1) impact of chronic stress on mouse sperm microRNA content over time (1 vs 12 weeks post-stress), 2) impact of corticostrone on secreted EV microRNA content from DC2 cells over time (1, 4, 8 days post-treatment), 3) impact of intracytoplasmic sperm injection with sperm incubated with control or corticosterone-treated EVs on mouse E12.5 brain and 4) E12.5 placentas, 5) impact of perceived stress dynamic on human sperm over 6 months',
    Summary:
      'We report reproductive tract extracellular vesicles (EVs) transmit information regarding stress in the paternal environment to sperm, ultimately altering fetal development. Using intracytoplasmic sperm injection, we found that sperm incubated with EVs collected from stress-treated epididymal epithelial cells produced offspring with altered neurodevelopment and adult stress reactivity. Proteomic and transcriptomic assessment of these EVs showed dramatic changes in protein and miRNA content long after stress treatment had ended.',
    pubmed_id: '32198406',
  },
  {
    gse_id: 'GSE134205',
    Organization:
      'Submission date, Jul 12, 2019, Last update date, Jan 19, 2021, Contact name, Yanqing Wang, E-mail(s), iwangyq@163.com, Organization name, Shanghai Renji Hospital, Department, Urology, Street address, NO. 160 Pujian Road, City, Shanghai, ZIP/Postal code, 200127, Country, China',
    Contributor: 'Fang Y, Wang Y',
    Overall_design:
      'Serum extracellular vesicle delivered miRNA profiles of patients with bone-metastatic PCa or non-bone -metastatic PCa or benign prostatic hyperplasia were generated by deep sequencing, and  contrastive analysis.',
    Summary:
      'Purpose: The goals of this study are to compare the serum extracellular vesicle (EV) delivered miRNA levels of patients with bone-metastatic prostate cancer (PCa),  non-bone -metastatic PCa and benign prostatic hyperplasia (BPH), and to identify EV-delivered microRNAs in patient’s serum as indicators for bone-metastatic PCa.Methods:Serum extracellular vesicle delivered miRNA profiles of patients with bone-metastatic PCa or non-bone -metastatic PCa or BPH were generated by deep sequencing,  using Illumina HiSeqTM 2500 platformResults: Using an optimized data analysis method, we mapped about 17 million sequence reads per sample. Differential analysis showed the expressions of 35 EV delivered miRNAs were significantly different between serum of patients with PCa and BPH, with a p value <0.05. the expressions of  5 EV delivered miRNAs were confirmed with qRT–PCR.Conclusions: Serum EV-delivered miR-181a-5p is a promising diagnostic biomarker for bone-metastatic PCa.',
    pubmed_id: 'unavailable',
  },
  {
    gse_id: 'GSE108666',
    Organization:
      'Submission date, Jan 02, 2018, Last update date, Jan 19, 2021, Contact name, George Mias, Organization name, Michigan State University, Department, Biochemistry and Molecular Biology, Street address, 775 Woodlot Drive, Rm1319, City, East Lansing, ZIP/Postal code, 48824, Country, USA',
    Contributor: 'Mias GI, Rogers LR, Singh VV',
    Overall_design:
      'Saliva extracellular vesicle small RNA-sequencing summary: Examination of extra cellular vesicle (EV) gene expression dynamics in a single individual in saliva over multiple timepoints. 104 total timepoints spanning two 24-hour periods, one without vaccination, and the second with vaccination. 30 daily samples follow and multiple monthly samples over the course of 1 year total.',
    Summary:
      'The investigation includes findings from our clinical trial, monitoring individualized response to pneumococcal vaccination, where we have carried out integrative profiling assessment of saliva pre and post vaccination in a single individual. This is to our knowledge the most extensive saliva-centered omics dataset on an individual, covering 100 timepoints over the course of one year. The time span covers a healthy period as well as comprehensive monitoring of innate and adaptive immune responses following pneumococcal vaccination. Protein and RNA from saliva were produced at each timepoint (100 timepoints), and mass spectrometry proteomics and RNA-sequencing were carried out for all samples in non-targeted comprehensive profiling. Specifically, a single individual (male, 38) was profiled over multiple timepoints during healthy periods, as well as post treatment with pneumococcal vaccine (PPSV23). Initially pre-immunization samples, including a 24 hour period with hourly sampling (samples P1052515H07-P1052615H08), were collected to provide a comparative baseline. A subsequent 24-hour time course was performed, with again hourly samples taken pre and post vaccination (P1060715H07-P1060815H06). The PPSV23 pneumococcal vaccine was admistered inbetween timepoints at approximately 10.30am, prior to datapoint P1060715H11. Following the vaccination, and after the 24 hour monitoring, daily samples were taken for about a month (up to sample P1070715H08), to capture innate and adaptive responses in saliva. Two more weekly samples followed, with then monthly sample till the end of the investigation. Omics sample analysis includes: RNA-sequencing of total RNA, small RNA sequencing in saliva extracellular vesicles and saliva mass spectrometry proteomics.Note on sample naming: The sample identifier/name P1MMDDYYHhh corresponds to: patient index:P1, date MMDDYY and hour hh preceded by H using 24 hour enumeration.',
    pubmed_id: 'unavailable',
  },
  {
    gse_id: 'GSE138107',
    Organization:
      'Submission date, Sep 27, 2019, Last update date, Dec 31, 2019, Contact name, Ricardo Mamede Figueiredo, E-mail(s), r.mamede.figueiredo@gmail.com, Organization name, GenXPro GmbH, Street address, Altenhöferallee 3, City, Frankfurt am Main, ZIP/Postal code, 60438, Country, Germany',
    Contributor:
      'Christoph L, Philipp N, Ricardo F, Manfred R, Alexandra B, Eva-Maria K, Christoph L, Eckhard M, Steffen K, Till K, Oliver D, Holger N, Christian HW, Christian T',
    Overall_design:
      'Small RNA profiles of CTEPH patients and age- and sex-matched healthy controls were generated by deep sequencing, in triplicate, using Illumina NextSeq 500.',
    Summary:
      'The aim of this study was to determine whether extracellular vesicle (EV)-associated small non-coding RNAs (sncRNAs) have potential as biomarkers for chronic thromboembolic pulmonary hypertension (CTEPH). EVs were isolated using different methods from serum of 23 CTEPH patients and 23 controls. EV-associated RNAs were analysed by next-generation sequencing using the TrueQuant method for molecular barcoding, and differentially expressed sncRNAs were validated by qRT-PCR. We identified 18 miRNAs and 21 piRNAs or piRNA clusters that were differentially expressed in CTEPH patients compared with the control group. Bioinformatic analysis predicted a contribution of these piRNAs to the progression of cardiac and vascular remodelling. Furthermore, the expression levels of DQ593039 correlated with clinically meaningful parameters such as mean pulmonary arterial pressure, pulmonary vascular resistance, right ventricular systolic pressure, and levels of N-terminal pro-brain natriuretic peptide. In summary, EV-associated piRNA DQ593039 shows promise as biomarker and may be a potential therapeutic target for CTEPH.',
    pubmed_id: '31671920',
  },
  {
    gse_id: 'GSE106453',
    Organization:
      'Submission date, Nov 02, 2017, Last update date, May 20, 2019, Contact name, Dominic Guanzon, Organization name, University of Queensland, Department, UQCCR, Lab, Exosome biology laboratory, Street address, Building 71/918 RBWH Herston, City, Brisbane, State/province, Queensland, ZIP/Postal code, 4029, Country, Australia',
    Contributor: 'Than U, Guanzon D, Parker T',
    Overall_design:
      'miRNAs were profiled in extracellular vesicles (exosomes, microvesicles and apoptotic bodies) derived from primary keratinocytes.',
    Summary:
      'Extracellular vesicles (EVs) are mammalian cell-derived nano-scale structures enclosed by a lipid bilayer that were previously considered to be cell debris with little biological value. However, EVs are now recognized to possess biological function, acting as a packaging, transport and delivery mechanism by which functional molecules (i.e. miRNAs) can be transferred to target cells over some distance. To examine the miRNA from keratinocyte-derived EVs, we isolated three distinct populations of EVs from both HaCaT and primary human keratinocytes (PKCs) and characterized their biophysical, biochemical and functional features by using microscopy, immunoblotting, nanoparticle tracking, and next generation sequencing. We identified 1048; 906; and, 704 miRNAs, respectively, in apoptotic bodies (APs), microvesicles (MVs) and exosomes (EXs) released from HaCaT, and 608; 506; and, 622 miRNAs in APs, MVs and EXs released from PKCs. In which, there were 623 and 437 identified miRNAs common to three HaCaT-derived EVs and PKC-derived EVs, respectively. In addition, we found hundreds of exosomal miRNAs that were previously un-reported and that differences in the abundance levels of the identified EV miRNAs could discriminate between the three EV populations. These data contribute to EV-identified miRNA database, especially keratinocyte-derived EV miRNA content.',
    pubmed_id: '30258405',
  },
  {
    gse_id: 'GSE126419',
    Organization:
      'Submission date, Feb 11, 2019, Last update date, Mar 27, 2020, Contact name, Xiwei Wu, E-mail(s), xwu@coh.org, Organization name, City of Hope National Medical Center, Department, Molecular and Cellular Biology, Street address, 1500 E. Duarte Rd., City, Duarte, State/province, CA, ZIP/Postal code, 91010, Country, USA',
    Contributor: 'Wu X, Wang SE',
    Overall_design:
      'Extracellular vesicles were collected by ultracentrifugation of the conditioned medium of MDA-MB-231 cells that had been treated with docetaxel (DTX; 4 nM), doxorubicin (DOXO; 125 nM), or PBS for 48 h.  RNA was extracted using TRIZOL LS (Thermo Fisher Scientific), and subjected to library construction and Illumina sequencing.',
    Summary:
      'To identify the extracellular-vesicle-encapsulated miRNAs that are differentially secreted by the MDA-MB-231 metastatic breast cancer cells following treatment with chemotherapy drugs, we profiled the small RNAs (between 17 and 52 nt) isolated from extracellular vesicles by Illumina sequencing.  miRNAs that are significantly induced by chemotherapy drugs are identified.',
    pubmed_id: '31118200',
  },
  {
    gse_id: 'DRP000998',
    Organization: 'Faculty of Pharmaceutical Sciences, Teikyo Heisei University, Ichihara, Chiba 2900193, Japan',
    Contributor: 'Yuko Ogawa, Yoshitaka Taketomi, Makoto Murakami, Masafumi Tsujimoto, Ryohei Yanoshita',
    Overall_design:
      'In a previous study, we found at least twotypes of salivary exosome that are different in size and have different proteomes. Studies of salivary exosomalsmall RNAs are limited to miRNAs. In this study, we examined small RNA transcriptomes using next generationsequencing technology to elucidate a full transcriptome set of small RNAs expressed in the two typesof salivary exosomes and in whole saliva (WS). Many types of small RNA, such as miRNA, piwi-interactingRNA (piRNA), small nucleolar RNA (snoRNA) and other small RNAs are contained in salivary exosomesand WS. Among these small RNAs we identified novel miRNA candidates',
    Summary:
      'Exosomes were purified from WS as previously described.16) Briefly, 30mL of WS was added to an equal volume of Tris\u0002buffered saline (20mm Tris–HCl, pH 7.4 and 150mm NaCl). The sample was then centrifuged and then filtered to eliminate bacteria and food debris and the filtrate was concentrated using an Amicon Ultra-15 centrifugal filter device with a 100kDa exclusion (Millipore Corporation, MA, U.S.A.). The concentrated filtrate was subjected to gel-filtration on a Sephacryl S-500 column (GE Healthcare, Buckinghamshire, U.K.) equilibrated with Tris-buffered saline. Void fractions (exosome I) and the following fractions displaying dipeptidyl peptidase IV activity (exosome II) were collected, and concen\u0002trated using Amicon Ultra-4 filters with a 100 kDa exclusion. with known miRNAs (miRBase; http://www.mirbase.org),\r\npiRNAs (piRNA Bank; http://pirnabank.ibab.ac.in and repeats), snoRNAs (sno/scaRNAbase; http://gene.fudan.sh.cn/\r\nsnoRNAbase.nsf) and repeats (RepeatMasker; http://hgdown\u0002load.cse.ucsc.edu/goldenPath/hg19/database/rmsk.txt.gz).',
    pubmed_id: '23302638',
  },
  {
    gse_id: 'DRP003268',
    Organization: 'Registration date: 8-Sep-2016, Department of Pathology, National Institute of Infectious Diseases',
    Contributor: 'Shiho Hoshina,Tsuyoshi Sekizuka,Michiyo Kataoka,Hideki Hasegawa,Hiromichi Hamada,Makoto Kuroda,Harutaka Katano',
    Overall_design:
      'Exosomes were isolated following a previously described ultracentrifugation protocol. After incubation for 72 h at 37°C with 5% CO2, cells were centrifuged at 300×g for 5 min. The supernatant was then passed through a 0.22-μm filter. This filtered supernatant was transferred to a fresh tube (50 mL) and centrifuged at 2,000×g for 30 min. The supernatant obtained from this procedure was then transferred to ultracentrifuge tubes and spun in a SW32Ti swinging bucket rotor (Beckman Coulter, Brea, CA, USA) at 12,000×g for 30 min at 4°C. The superna\u0002tant was again transferred to new ultracentrifuge tubes and spun for 70 min at 110,000×g. The supernatant was then discarded and the pellet was suspended in 1 ml of sterile phosphate-buff\u0002ered saline (PBS). Samples were then transferred to 1.5-ml microtubes and supplemented with 200 μL of ExoQuick-TC (System Biosciences, Mountain View, CA, USA). After incubation at 4°C overnight, the mixture was centrifuged at 1,500×g for 30 min. The supernatant was then discarded and the pellet was centrifuged at 1,500×g for 5 min. Finally, the resulting pellet was suspended in 100 μL of sterile PBS.',
    Summary:
      'In this study, we thus identified virus- and host-encoded miRNAs in exosomes released from KSHV- or EBV-infected lymphoma cell lines and compared them with intracellular miRNAs using a next-generation sequencer. Sequencing analysis demonstrated that 48% of the annotated miRNAs in the exosomes from KSHV-infected cells originated from KSHV. Human mir-10b-5p and mir-143-3p were much more highly concentrated in exosomes than in cells. Exosomes contained more nonexact mature miRNAs that did not exactly match those in miRBase than cells. Among the KSHV-encoded miRNAs, miRK12-3-5p was the most abundant exact mature miRNA in both cells and exosomes that exactly matched those in miRBase',
    pubmed_id: '27611973',
  },
  {
    gse_id: 'ERP013193',
    Organization:
      'Registration date: 27-Nov-2015, Department of Public Health and General Practice Norwegian University of Science and Technology',
    Contributor: 'Melanie Rae Simpson, Gaute Brede, Jostein Johansen, Roar Johnsen, Ola Storrø, Pål Sætrom, Torbjørn Øien',
    Overall_design:
      'Small RNA sequencing was conducted on samples collected 3 months postpartum from 54 women participating in the ProPACT trial. Differential expression of miRNA was assessed for the probiotic vs placebo and AD vs non-AD groups. The results were further analysed using functional prediction techniques.',
    Summary:
      'Human breast milk samples contain a relatively stable core group of highly expressed miRNAs, including miR-148a-3p, miR-22-3p, miR-30d-5p, let-7b-5p and miR-200a-3p. Functional analysis of these miRNAs revealed enrichment in a broad range of biological processes and molecular functions. Although several miRNAs were found to be differentially expressed on comparison of the probiotic vs placebo and AD vs non-AD groups, none had an acceptable false discovery rate and their biological significance in the development of AD is not immediately apparent from their predicted functional consequences.',
    pubmed_id: '26657066',
  },
  {
    gse_id: 'ERP019917',
    Organization: 'Registration date: 15-Feb-2017, Gerontology Research Center, University of Jyvaskyla',
    Contributor:
      'Reeta Kangas, Timo Törmäkangas, Vidal Fey, Juha Pursiheimo, Ilkka Miinalainen, Markku Alen, Jaakko Kaprio, Sarianna Sipilä, Anna-Marja Säämänen, Vuokko Kovanen, Eija K Laakkonen',
    Overall_design:
      'Serum exosomes were isolated from 450 μl of sample by using Exoquick Exosome Precipitation Solution according to manufacturer’s protocol (#EXOQ5A-1, System Biosciences).',
    Summary:
      'This study investigated differences in serum exosome microRNA-cargo, obtained from healthy postmenopausal monozygotic twins (n=10 pairs), from which the other sister was using estrogen-based hormone replacement therapy (HRT) and the other was not under treatment. In addition, premenopausal women (n=8) with natural hormonal status were included in the study. This study gave new information about the exomiR messaging and its sensitivity to age and HRT',
    pubmed_id: '28195143',
  },
  {
    gse_id: 'SRP031761',
    Organization: 'Registration date: 14-Oct-2013, La Trobe University',
    Contributor: 'Hong Ji, Maoshan Chen, David W Greening, Weifeng He, Alin Rai, Wenwei Zhang, Richard J Simpson',
    Overall_design:
      'For large scale production of exosomes, cells were cultured in CELLine Bioreactor classic flask (Integra Biosciences, Switzerland) and culture medium (CM) collected. Approximately 3x107 LIM1863 cells were suspended in 15 ml of phenol red free RPMI 1640 medium supplemented with 0.5% ITS, 100 U/mL penicillin and 100 ¦Ìg/mL streptomycin (cultivation medium) and seeded into the cultivation chamber of a CELLine classic flask.',
    Summary:
      'Deep sequencing of miRNA libraries prepared from parental LIM1863 cells/derived EV subtype RNA yielded 254 miRNA identifications, of which 63 are selectively enriched in the EVs--miR-19a/b-3p, miR-378a/c/d, and miR-577 and members of the let-7 and miR-8 families being the most prominent. Let-7a-3p*, let-7f-1-3p*, miR-451a, miR-574-5p*, miR-4454 and miR-7641 are common to all EV subtypes, and 6 miRNAs (miR-320a/b/c/d, miR-221-3p, and miR-200c-3p) discern LIM1863 exosomes from sMVs; miR-98-5p was selectively represented only in sMVs. Notably, A33-Exos contained the largest number (32) of exclusively-enriched miRNAs; 14 of these miRNAs have not been reported in the context of CRC tissue/biofluid analyses and warrant further examination as potential diagnostic markers of CRC. Surprisingly, miRNA passenger strands (star miRNAs) for miR-3613-3p*, -362-3p*, -625-3p*, -6842-3p* were the dominant strand in A33-Exos, the converse to that observed in parental cells. This finding suggests miRNA biogenesis may be interlinked with endosomal/exosomal processing.',
    pubmed_id: '25330373',
  },
  {
    gse_id: 'SRP046046',
    Organization: 'VU University Medical Center Amsterdam The Netherl',
    Contributor:
      'Danijela Koppers-Lalic, Michael Hackenberg, Irene V Bijnsdorp, Monique A J van Eijndhoven, Payman Sadek, Daud Sie, Nicoletta Zini, Jaap M Middeldorp, Bauke Ylstra, Renee X de Menezes, Thomas Würdinger, Gerrit A Meijer, D Michiel Pegtel',
    Overall_design:
      'Epstein Barr Virus (EBV) positive lymphoblastoid cell lines (LCLs) were maintained in RPMI-1640 (Lonza) medium, supplemented with 10% fetal bovine serum (FBS, HyClone; Perbio Science), antibiotics (100 U/mL penicillin G, 100 µg/mL streptomycin sulfate), and 2 mM glutamine. For exosomes collection, each cell line was cultured in RPMI-1640 supplemented with 10% exosome-depleted FBS for three consecutive rounds followed by harvesting exosome-containing supernatant (one collection round represents one exosomes-containing preparation; 100x106 cells in 200 ml of medium). Cell death was analyzed routinely by trypan-blue exclusion, and cultures with =90% viability were not considered for exosome collection. Exosomes were isolated and purified from the supernatants using the differential centrifugation protocol as described (Verweij et al., 2013). small RNA libraries were prepared for sequencing using standard Illumina protocols with TruSeq small RNA kit',
    Summary:
      "We generated small RNA profiles by RNA sequencing (RNA-seq) from a panel of human B cells and their secreted exosomes. A comprehensive bioinformatics and statistical analysis revealed nonrandomly distributed subsets of microRNA (miRNA) species between B cells and exosomes. Unexpectedly, 3' end adenylated miRNAs are relatively enriched in cells, whereas 3' end uridylated isoforms appear overrepresented in exosomes, as validated in naturally occurring EVs isolated from human urine samples. Collectively, our findings suggest that posttranscriptional modifications, notably 3' end adenylation and uridylation, exert opposing effects that may contribute, at least in part, to direct ncRNA sorting into EVs.",
    pubmed_id: '25242326',
  },
  {
    gse_id: 'SRP048961',
    Organization: 'Registration date: 16-Oct-2014, Institute for Stem cell biology and Regenerative medicine (inStem)',
    Contributor: 'Vyas N1, Walvekar A, Tate D, Lakshmanan V, Bansal D, Lo Cicero A, Raposo G, Palakodeti D, Dhawan J',
    Overall_design:
      'Total RNA was isolated from the vesicular pools using Trizol (Invitrogen). Vesicles were treated with RNase A, 30 min before resuspending them in Trizol. Small RNA libraries were prepared using the Truseq small RNA library preparation kit (Illumina). Small RNA libraries were subjected to Next generation sequencing using a Hi-seq1000, Illumina platform (C-CAMP). The small RNA reads obtained from HEK cells and chick notochord were mapped to human and Gallus gallus genome respectively using the UCSC genome browser.',
    Summary:
      'In this study, we show that Shh is secreted on two types of exo-vesicles by human cell lines . We find that the two classes of exo-vesicles carry distinct signal-modulatory accessory proteins as well as distinct sets of cellular miRNAs.',
    pubmed_id: '25483805',
  },
  {
    gse_id: 'SRP057172',
    Organization: 'Registration date: 19-Dec-2014, Institut Pasteur de Montevideo',
    Contributor: 'Juan Pablo Tosar, Fabiana Gámbaro, Julia Sanguinetti,1 Braulio Bonilla, Kenneth W. Witwer, and Alfonso Cayota',
    Overall_design:
      'We sequenced the intracellular sRNA content (19–60 nt) of breast epithelial cell lines (MCF-7 and MCF-10A) and compared it with extracellular fractions enriched in microvesicles, exosomes and ribonucleoprotein complexes. Our results are consistent with a non-selective secretion model for most microRNAs, although a few showed secretion patterns consistent with preferential secretion. On the contrary, 5′ tRNA halves and 5′ RNA Y4-derived fragments of 31–33 were greatly and significantly enriched in the extracellular space (even in non-mammary cell lines), where tRNA halves were detected as part of ∼45 kDa ribonucleoprotein complexes.',
    Summary:
      'Sequencing of the small RNA content of extracellular fractions obtained by differential centrifugation from serum-free cultures of the human breast epithelial cell lines MCF-7 and MCF-10A',
    pubmed_id: '25940616',
  },
  {
    gse_id: 'SRP057826',
    Organization: 'Registration date: 29-Apr-2015, Huazhong University of Science and Technology',
    Contributor:
      'Hong-Mei Zhang, Qing Li, Xiaojian Zhu, Wei Liu, Hui Hu, Teng Liu, Fanjun Cheng, Yong You, Zhaodong Zhong, Ping Zou, Qiubai Li, Zhichao Chen, An-Yuan Guo',
    Overall_design:
      'Our previous work demonstrated that MVs lost their transforming abilities following RNase treatment, indicating that RNAs in MVs were responsible for the transformation. To further explore the key regulators and their regulations in the process of K562-MVs transforming MNCs into leukemia-like cells, we sequenced the mRNAs and small RNAs for samples of the critical time points. Then, deep analyses of differentially expressed genes, TFs and miRNAs, as well as the regulatory networks among them were performed. We identified that miR-146b-5p as a key regulator accelerated the transformation by targeting NUMB and other genes, and also caused genome instability and cell proliferation of the recipient cells, which will provide important insights into the leukemogenesis.',
    Summary:
      'Sequencing of the small RNA content of extracellular fractions obtained by differential centrifugation from serum-free cultures of the human breast epithelial cell lines MCF-7 and MCF-10A',
    pubmed_id: '27013199',
  },
  {
    gse_id: 'SRP058913',
    Organization: 'Registration date: 1-Jun-2015, Brazilian Center for Research in Energy and Materials',
    Contributor:
      'Mauricio Rocha Dourado, Johanna Korvala, Pirjo Åström, Carine Ervolino De Oliveira, Nilva K Cervigne, Luciana Souto Mofatto, Debora Campanella Bastos, Ana Camila Pereira Messetti, Edgard Graner, Adriana Franco Paes Leme, Ricardo D Coletta, Tuula Salo',
    Overall_design:
      'In this study, we evaluated the effects of EV derived from CAF primary human cell lines (n = 5) on proliferation, survival, migration, and invasion of oral squamous cell carcinoma (OSCC) cells. As controls, EV from human primary-established normal oral fibroblasts (NOF, n = 5) were used. Our in vitro assays showed that CAF-EV significantly induces migration and invasion of OSCC cells and promote a disseminated pattern of HSC-3 cell invasion in the 3D organotypic assay. Furthermore, gene expression analysis of EV-treated cancer cells revealed changes in the pathways associated with tumour metabolism and up-regulation of tumour invasion genes.',
    Summary:
      'This study focused in identifying the repertoire of miRNAs found in extracellular vesicles isolated from tumorigenic and metastatic Oral squamous cell carcinoma.',
    pubmed_id: '30788085',
  },
  {
    gse_id: 'SRP069182',
    Organization: 'Registration date: 22-Jan-2016, Sichuan Cancer Hospital & Institute',
    Contributor:
      'Ling Li, Chao Li, Shaoxin Wang, Zhaohui Wang, Jian Jiang, Wei Wang, Xiaoxia Li, Jin Chen, Kun Liu, Chunhua Li, Guiquan Zhu',
    Overall_design:
      'Given that exosomes have been shown to transport miRNAs to alter cellular functions, we performed miRNA sequencing of normoxic and hypoxic OSCC-derived exosomes.',
    Summary:
      'Hypoxia is a common feature of solid tumors. Exosomes are now implicated in mediating interactions with the cellular environment. The goal of this study was to investigate the miRNA expression profiles of exosomes derived from normoxic and hypoxic oral squamous cell carcinoma cells.',
    pubmed_id: '26992424',
  },
  {
    gse_id: 'SRP090496',
    Organization: 'Registration date: 22-Sep-2016, TGen',
    Contributor:
      'Cecilia Lässer, Ganesh Vilas Shelke, Ashish Yeri, Dae-Kyum Ki, Rossella Crescitelli, Stefania Raimondo, Margareta Sjöstrand, Yong Song Gho, Kendall Van Keuren Jensen, Jan Lötvall',
    Overall_design:
      'In the current study, we hypothesized that cells release different exRNA signatures, one consisting of full-length rRNA that can be seen as distinct peaks on an electropherogram and one that does not consist of full-length rRNA, and therefore do not show rRNA peaks. We therefore separated 2 distinct exRNA profiles from the human mast cell line HMC-1 by their buoyant density.',
    Summary:
      'High density and low density extracellular RNA from mast cells. Both whole transcriptome and small RNA sequencing samples are included here.',
    pubmed_id: '27791479',
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

  displayedSamples: string[] = ['gse_id', 'Organization', 'Contributor', 'Overall_design', 'Summary', 'pubmed_id'];
  sampleSource = ELEMENT_SAMPLE;

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
