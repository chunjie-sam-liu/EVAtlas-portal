import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cellsRename',
})
export class CellsRenamePipe implements PipeTransform {
  transform(value: string[], ...args: unknown[]): unknown {
    return value.map((v) => v.replace(/Cells/, 'Primary cell'));
  }
}
