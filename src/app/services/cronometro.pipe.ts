import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cronometro'
})
export class CronometroPipe implements PipeTransform {

  tiempo: any = {hora: 0, minuto:0, segundo: 0}
  resultado: any


  transform(codigo_ruta: any, codigo_transporte): any {

    console.log('lleaaaaaaaaaaaaaaaaaaaaaaaa');
    console.log(codigo_ruta);
    console.log(codigo_transporte);

  
    
    return this.resultado

  }

}
