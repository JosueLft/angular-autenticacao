import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hora'
})
export class HoraPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    const datahora = value.split(" ");
    //const datahora = value.substr(10);
    return datahora[1];
  }

}