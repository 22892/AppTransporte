import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ServiceService } from '../../services/service.service'
import 'moment/locale/es';
import * as moment from 'moment';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @Input() ruta: any;

  listTipoTransporte: any[] = []
  selectTransporte: any
  numeroTransporte: any
  
  

  constructor(private modalController: ModalController,
    private service: ServiceService,
    private toastCtrl: ToastController) { }

  ngOnInit() {
    this.listTipoTransporte = this.service.getListaTipoTransporte()
  }

  dismiss() {
    return this.modalController.dismiss();
  }


  transformDate(newDate: any): any{
    //var dia = moment(newDate,'YYYY-MM-DD').format("DD");
    //var mes = moment(newDate,'YYYY-MM-DD').format("MMMM");
    //var anio = moment(newDate,'YYYY-MM-DD').format("YYYY");

    var hora = moment(newDate,'HH:mm:ss').format("HH");
    var minuto = moment(newDate,'HH:mm:ss').format("mm");
    var segundo = moment(newDate,'HH:mm:ss').format("ss");

    let fecha = hora+':'+minuto+':'+segundo

    return fecha
  }

  getDateNuevo(newDate: any): any{
   
    
    var dia = moment(newDate,'YYYY-MM-DD').format("DD");
    var mes = moment(newDate,'YYYY-MM-DD').format("MM");
    var anio = moment(newDate,'YYYY-MM-DD').format("YYYY");

    var hora = moment(newDate,'HH:mm:ss').format("HH");
    var minuto = moment(newDate,'HH:mm:ss').format("mm");
    var segundo = moment(newDate,'HH:mm:ss').format("ss");

    let fecha = dia+'-'+mes+'-'+anio+'GMT'+hora+':'+minuto+':'+segundo
    return fecha
  }

  restarFechas(fecha: any, dias: any){
    return fecha.setDate(fecha.getDate()-dias)
  }


  async agregarTransporte(){

    var idTransporte = this.service.getIdTransporte()


    if(idTransporte == null){
    
      this.service.setIdTransporte(0)
      idTransporte = 1

    }else{
      this.service.setIdTransporte(1)

    }

    

    if(this.selectTransporte && this.numeroTransporte){
        
      let objetoControl ={
        id: idTransporte,
        codigo_transporte: this.selectTransporte.codigo,
        hora: this.transformDate(new Date()) ,
        fecha: this.getDateNuevo(new Date()),
        fecha_sistema: new Date(),
        transporte: this.selectTransporte.nombre,
        linea: this.numeroTransporte,
        codigo_ruta: this.ruta.codigo,
        color: this.selectTransporte.color,
        horas: 0,
        minutos: 0,
        segundos: 0
      }
      
      this.service.setObjetoTransporte(objetoControl)
      this.dismiss()

    }else{

            
      let toast = await this.toastCtrl.create({
        message: 'Seleccione Transporte y Linea',
        duration: 3000,
        position: 'top'
      });

      return await toast.present()

    }
    

  }

  cancelar(){
    return this.modalController.dismiss();
  }


}
