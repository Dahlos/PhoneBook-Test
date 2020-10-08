import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rut',
})
export class RutPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    if (!this.validateRut(value)) return ` --- Rut Invalido --- ${value}`;
    return value;
  }

  validateRut(rutCompleto: string): boolean {
    var tmp = rutCompleto.split('-');
    var digv = tmp[1];
    var rut = tmp[0];
    if (digv == 'K') digv = 'k';
    return this.digitoVerificador(rut) == digv;
  }

  digitoVerificador(rut) {
    var M = 0,
      S = 1;
    for (; rut; rut = Math.floor(rut / 10)) {
      S = (S + (rut % 10) * (9 - (M++ % 6))) % 11;
    }
    return S ? S - 1 : 'k';
  }
}
