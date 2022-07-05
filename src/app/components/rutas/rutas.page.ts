import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.page.html',
  styleUrls: ['./rutas.page.scss'],
})
export class RutasPage implements OnInit {

  @ViewChild(IonModal) modal: IonModal;

  name: string;
  listRutas: any[] = []

  control: any[] = [ ]

  constructor() {

  }

  ngOnInit() {

    this.getRecuperaRutas()
  }

  getRecuperaRutas(){
    var recuperarRutas = localStorage.getItem('listRutas')
    
    
    if(recuperarRutas == null){
      this.listRutas = []
    }else{

      this.listRutas = JSON.parse(recuperarRutas)

      if(this.listRutas.length==0){
        console.log('elimina');
        
        localStorage.removeItem("idTransporte");
        
      }

    }

  }


  ionViewWillEnter(){
    this.getRecuperaRutas()
  }


  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');

    let obj = {
      codigo: this.listRutas.length+1,
      nombre: this.name,
      control: this.control,
      fecha_sistema: new Date()
    }

    this.listRutas = [...this.listRutas, obj]
    localStorage.setItem('listRutas', JSON.stringify(this.listRutas));
    this.name = ""
   
  }


  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      console.log('agregado');
      
    }
  }

  eliminarRuta(codigo: any){

    this.listRutas = this.listRutas.filter(
      (ruta) => ruta.codigo !== codigo
    );
    localStorage.setItem('listRutas', JSON.stringify(this.listRutas));


  }

}
