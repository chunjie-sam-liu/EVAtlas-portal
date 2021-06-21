import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'evRenameSpe',
})
export class EvRenameSpePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return value === 'exosomes' ? value.replace('exosomes', 'sEV') : value.replace(/microvesicles/, 'lEV');
  }
}
