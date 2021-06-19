import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'evRename',
})
export class EvRenamePipe implements PipeTransform {
  transform(value: string[], ...args: unknown[]): unknown {
    return value.map((v) => (v === 'Exosomes' ? v.replace('Exosomes', 'sEV') : v.replace(/Microvesicles/, 'lEV')));
  }
}
