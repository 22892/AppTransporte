import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  public updateListRuta: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  listTipoTransporte: any = [{codigo: 1, nombre: 'Oriental', color: 'primary'}, {codigo: 2, nombre: 'Cenepa', color: 'success'}, 
                             {codigo: 3, nombre: 'Turismo', color: 'danger'}]
  objTransporte: any

  constructor() { }


  getListaTipoTransporte(){
    return this.listTipoTransporte
  }

  setObjetoTransporte(transporte: any){
    this.objTransporte = transporte
    localStorage.setItem('objTransporte', JSON.stringify(this.objTransporte));
    this.updateListRuta.next(true)


  }

  getListObjetoTransporte(){
    return this.objTransporte
  }

  setIdTransporte(id: any){

    console.log('x qqqqqqqqq');
    console.log(id);
    

    if(id == 0){
      localStorage.setItem('idTransporte', '1');
      
    }else{

      console.log('noooo');
      

      var idTrans = localStorage.getItem('idTransporte')
      console.log(idTrans);
      
      if(idTrans == null){

      }else{

        console.log('aumenta');
        

        var aux = parseInt(idTrans) + 1
        localStorage.setItem('idTransporte', aux.toString());
      }
    }

    console.log('finall');
    
   
  }

  getIdTransporte(){

    var resulatdo: any
    var idTrans = localStorage.getItem('idTransporte')

    console.log('getttttttttttttt');
    console.log(idTrans);
    console.log(parseInt(idTrans));

    if(idTrans == null){
      localStorage.setItem('idTransporte', '1');
      resulatdo = 1
    }else{
      resulatdo = parseInt(idTrans)
    }
    

    return resulatdo
  }

}
