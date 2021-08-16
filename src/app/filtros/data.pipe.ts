import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'data'
})
export class DataPipe implements PipeTransform {

  transform(value: string, ...args: string[]): Date {
    const datahora = value.split(" ");
    //const datahora = value.substr(10);
    //return datahora[0];
    return new Date(value.replace(" ", "T"));
  }

}