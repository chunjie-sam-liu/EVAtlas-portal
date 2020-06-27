import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'redSeed',
})
export class RedSeedPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return value ? `${value.slice(0, 1)}<span class="red-seed">${value.slice(1, 8)}</span>${value.slice(8)}` : '';
  }
}
