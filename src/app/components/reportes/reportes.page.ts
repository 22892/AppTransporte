import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service'
import 'moment/locale/es';
import * as moment from 'moment';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
})
export class ReportesPage implements OnInit {

  listRutas: any[] = []
  listRutasAux: any[] = []
  listPromedios: any[] = []
  listControl: any[] = []
  listTipoTransporte: any[] = []
  listTransporteByRuta: any[] = []
  selectRuta: any
  date: any = this.transformDate(new Date())
  fechaHoy = new Date()
  promedioHora: any = 0
  promedioMinuto: any = 0
  promedioSegundo: any = 0
  numeroItems: any = 0
  controlTiempo: boolean = false

  constructor(private service: ServiceService,
    private toastCtrl: ToastController) { }

  ngOnInit() {

    this.recuperarListaRutas()
    this.listTipoTransporte = this.service.getListaTipoTransporte()

  }


  recuperarListaRutas(){
    var recuperaRuta = localStorage.getItem('listRutas')
    if(recuperaRuta == null){
      
    }else{
      this.listRutas = JSON.parse(recuperaRuta)
     
    }

  }

  ionViewWillEnter(){
    this.recuperarListaRutas()  
    this.listTipoTransporte = this.service.getListaTipoTransporte()
    this.getPromediosRutaTrasnporte()
  }

  transformDate(newDate: any): any{
   
    var dia = moment(newDate,'YYYY-MM-DD').format("DD");
    var mes = moment(newDate,'YYYY-MM-DD').format("MM");
    var anio = moment(newDate,'YYYY-MM-DD').format("YYYY");

    let fecha = anio+'-'+mes+'-'+dia
    return fecha
  }


  getFechaFiltro(){

    this.getTransportesByRuta()
  }


  async getTransportesByRuta(){

    this.listTransporteByRuta = []
    this.listRutasAux = []
    this.listControl = []
    
    if(this.date == undefined || this.date == null || this.date == ''){

    }else{
      this.fechaHoy = this.date
    }

    if(this.selectRuta){

      var recuperaRuta = localStorage.getItem('listRutas')
      if(recuperaRuta == null){
      
        this.listTransporteByRuta = []
        
      }else{
        this.listRutas = JSON.parse(recuperaRuta)

        this.listRutas.forEach((ruta: any, index: any)=>{

          var date1 = this.transformDate(this.fechaHoy)
          this.listControl = []      
          
          ruta.control.forEach((transporte: any)=>{
            var date2 = this.transformDate(transporte.fecha_sistema) 
            
            if(date1 == date2){

              this.listControl = [...this.listControl, transporte]
                
            }else{
              
              
            }
  
          })

          console.log('fecha ');
          console.log(this.listControl);
          
          
          if(this.listControl.length>0){
            ruta.control = this.listControl
            this.listRutasAux = [...this.listRutasAux, ruta]     
          }

          
        })

        
        if(this.listRutasAux.length>0){

          this.listRutasAux.forEach((ruta: any)=>{
            if(ruta.codigo == this.selectRuta.codigo){
              if(ruta.control.length>0){
                this.listTransporteByRuta = ruta.control

              }
            }
  
          })
  
          if(this.listTransporteByRuta.length>0){

            this.listTransporteByRuta.sort((a, b) => b.id - a.id)
      
            for(var i=0; i<this.listTransporteByRuta.length-1; i++){
        
        
              var array1 = this.listTransporteByRuta[i].hora.split(':');
              var array2 = this.listTransporteByRuta[i+1].hora.split(':')
        
              var t1 = new Date()
              var t2 = new Date()
        
              t1.setHours(array1[0], array1[1], array1[2]);
              t2.setHours(array2[0], array2[1], array2[2]);
        
              t1.setHours(t1.getHours() - t2.getHours(), t1.getMinutes() - t2.getMinutes(), t1.getSeconds() - t2.getSeconds());
        
              this.listTransporteByRuta[i].horasAnterior = t1.getHours()
              this.listTransporteByRuta[i].minutosAnterior = t1.getMinutes()
              this.listTransporteByRuta[i].segundosAnterior = t1.getSeconds()
        
            }
  
  
        
            this.listTransporteByRuta[this.listTransporteByRuta.length-1].horasAnterior = 0
            this.listTransporteByRuta[this.listTransporteByRuta.length-1].minutosAnterior = 0
            this.listTransporteByRuta[this.listTransporteByRuta.length-1].segundosAnterior = 0
        
        
            //para ver el tiempo anterior en base al mismo tipo de transporte
  
            var aux = 0
  
            this.listTransporteByRuta.forEach((transporte: any, index: any)=>{
              aux = index +1
              this.controlTiempo = false
              for(var j=aux; j<this.listTransporteByRuta.length; j++){
  
                if(transporte.codigo_transporte == this.listTransporteByRuta[j].codigo_transporte){
  
                  this.controlTiempo = true
                  var array1 = this.listTransporteByRuta[index].hora.split(':');
                  var array2 = this.listTransporteByRuta[j].hora.split(':')
            
                  var t1 = new Date()
                  var t2 = new Date()
            
                  t1.setHours(array1[0], array1[1], array1[2]);
                  t2.setHours(array2[0], array2[1], array2[2]);
            
                  t1.setHours(t1.getHours() - t2.getHours(), t1.getMinutes() - t2.getMinutes(), t1.getSeconds() - t2.getSeconds());
      
                  this.listTransporteByRuta[index].horasTransporte = t1.getHours()
                  this.listTransporteByRuta[index].minutosTransporte = t1.getMinutes()
                  this.listTransporteByRuta[index].segundosTransporte = t1.getSeconds()
  
                }
  
                if(this.controlTiempo == true){
                  j = this.listTransporteByRuta.length
                }
  
              }
  
              if(this.controlTiempo == false){
                this.listTransporteByRuta[index].horasTransporte = 0
                this.listTransporteByRuta[index].minutosTransporte = 0
                this.listTransporteByRuta[index].segundosTransporte = 0
              }
  
  
            })
  
            
          }else{
            let toast = await this.toastCtrl.create({
              message: 'NO TIENE ASIGNADO TRANSPORTES',
              duration: 3000,
              position: 'top'
            });
      
            return await toast.present()
            
          }
  


        }else{
          let toast = await this.toastCtrl.create({
            message: 'NO EXISTE DATOS',
            duration: 3000,
            position: 'top'
          });
    
          return await toast.present()
    
        }



      }

    }else{
      let toast = await this.toastCtrl.create({
        message: 'SELECCIONE UNA RUTA',
        duration: 3000,
        position: 'top'
      });

      return await toast.present()

      
    }





  }

  getPromediosRutaTrasnporte(){

    this.listPromedios = []

    var recuperaRuta = localStorage.getItem('listRutas')
    if(recuperaRuta == null){
      
    }else{
      this.listRutas = JSON.parse(recuperaRuta)

      this.listTipoTransporte.forEach((tipotrans: any, inde: any)=>{
        this.listRutas.forEach((ruta: any, index: any)=>{

          if(ruta.control.length>0){
  
            ruta.control.forEach((transporte: any, i:any)=>{
              

              if(tipotrans.codigo == transporte.codigo_transporte){

                this.promedioHora =  this.promedioHora + parseInt(transporte.horas)
                this.promedioMinuto = this.promedioMinuto + parseInt (transporte.minutos)
                this.promedioSegundo = this.promedioSegundo + parseInt(transporte.segundos)
                this.numeroItems = this.numeroItems + 1 

              }
  
  
              
            })

            
          }
  
        })

        let objPromedio = {
          codigo_transporte: tipotrans.codigo,
          nombre_transporte: tipotrans.nombre,
          color: tipotrans.color,
          numeroTransporte: this.numeroItems,
          promedioHora: (this.promedioHora / this.numeroItems).toFixed(0),
          promedioMinuto: (this.promedioMinuto / this.numeroItems).toFixed(0),
          promedioSegundo: (this.promedioSegundo / this.numeroItems).toFixed(0)
          
        }

        this.listPromedios = [...this.listPromedios, objPromedio]
        this.numeroItems = 0
        this.promedioHora = 0
        this.promedioMinuto = 0
        this.promedioSegundo = 0
  
      })

      localStorage.setItem('listPromedios', JSON.stringify(this.listPromedios));


    }


  }

  doRefresh(event){

    

    setTimeout(() => {
      if(this.selectRuta){
        this.getTransportesByRuta()
      }
      event.target.complete();
    }, 1500); 
    
  }

}
