import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonItem, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ServiceService } from '../../services/service.service'
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../../pages/modal/modal.page';
import 'moment/locale/es';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.page.html',
  styleUrls: ['./horarios.page.scss'],
  
})
export class HorariosPage implements OnInit {

  @ViewChild(IonModal) modal: IonModal;

  name: string;
  listRutas: any[] = []
  listRutasCompletas: any[] = []
  objTransporte: any
  selectRuta: string
  selectCodigo: number
  activarModal: boolean = false
  resultado: any
  
  codigo_ruta: any
  codigo_transporte: any

  sub: any




  constructor(private modalController: ModalController,
    private service: ServiceService,) {

    this.service.updateListRuta.subscribe( value => {

      if(value == true){
        console.log('Actualiza');

        var recuperarTransporte = localStorage.getItem('objTransporte')
       
        
        if(recuperarTransporte == null){
          
        }else{
          this.objTransporte = JSON.parse(recuperarTransporte)
          this.asignaTransporteRuta(this.objTransporte)


        }
      }
    })



 
  } 

  ngOnInit() {
    this.getRecuperaListaRuta()

    setInterval(()=>{
      
      var recuperaRuta = localStorage.getItem('listRutas')
      if(recuperaRuta == null){
        
      }else{
        this.listRutas = JSON.parse(recuperaRuta)
        this.getCronometro(this.listRutas)
        
      }

    },2000)

    
  }

  ionViewWillEnter(){
    this.getRecuperaListaRuta()    
  }


  asignaTransporteRuta(objTransporte: any){

    var ltsRutas = localStorage.getItem('listRutas')

    if(ltsRutas == null){
      
    }else{
      this.listRutas = JSON.parse(ltsRutas)
    }


    this.listRutas.forEach((item: any, index: any)=>{
      
      if(item.codigo == objTransporte.codigo_ruta){
        this.listRutas[index].control.push(objTransporte)
        localStorage.setItem('listRutas', JSON.stringify(this.listRutas));
    
      }
    })

  }



  getCronometro(liataRutas: any){
   

    liataRutas.forEach((ruta: any, index: any)=>{

      
      if(ruta.control.length>0){
        ruta.control.forEach((control: any, i: any)=>{
          
          if(i + 1 ==  ruta.control.length){
            control.segundos = control.segundos + 2
        
            if(control.segundos == 60){
              control.segundos = 0
              control.minutos = control.minutos + 1
            }
            if(control.minutos == 60){
              control.minutos = 0
              control.segundos = 0
              control.horas = control.horas + 1
            }
  
          }
                    

        })
  
      }
     
      
    })

    localStorage.setItem('listRutas', JSON.stringify(this.listRutas));

   
    
  }


  getRecuperaListaRuta(){
    var recuperarRutas = localStorage.getItem('listRutas')
    
    if(recuperarRutas == null){
      this.listRutas = []
    }else{
      this.listRutas = JSON.parse(recuperarRutas)
    }

  }



  async openModalRuta(posicion: any){

    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {
        ruta: this.listRutas[posicion],
      }
    });
  
    return await modal.present();

  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');

   
  }


  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      
      
    }
  }


}
