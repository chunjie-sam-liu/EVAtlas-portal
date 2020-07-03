import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rmcl',
})
export class RmclPipe implements PipeTransform {
  transform(value: string[], ...args: unknown[]): unknown {
    return value.map((v) => (v === 'Cell_line' ? v.replace('_', ' ') : v.replace(/Cell_line: /, '')));
  }
}
