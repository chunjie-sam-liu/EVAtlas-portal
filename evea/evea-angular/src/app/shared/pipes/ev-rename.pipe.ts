import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'evRename',
})
export class EvRenamePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
