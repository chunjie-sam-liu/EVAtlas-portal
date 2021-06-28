import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cellsRename',
})
export class CellsRenamePipe implements PipeTransform {
  transform(value: string[], ...args: unknown[]): unknown {
    const tranValue = value.map((v) => (v === 'Cell_line' ? v.replace('_', ' ') : v.replace(/Cell_line: /, '')));
    return tranValue.map((v) => v.replace(/Cells/, 'Primary cell'));
  }
}
