import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefono',
})
export class TelefonoPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): unknown {
    console.log(value);
    if (value.toString().length < 11) return ` --- Telefono Invalido --- ${value}`;
    return value;
  }
}
