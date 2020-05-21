import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias:Article[]=[];
  constructor(private storage:Storage, private toastCtrl:ToastController) { 
    this.cargarFavoritos();
  }

  guardarNoticia(noticia:Article){

    const existe = this.noticias.find(noti=>noti.title === noticia.title);

    if(!existe){
      this.noticias.unshift(noticia);
      //set a key/value
      this.storage.set('favoritos', this.noticias);
      this.presentToast('Guardado en Favoritos');
    }

  }
  async cargarFavoritos(){
    const favoritos = await this.storage.get('favoritos');
    if(favoritos){
      this.noticias = favoritos;
    }
    //console.log('asyn', favoritos);
  }
  borrarNoticia(noticia:Article){
    //eliminar
    this.noticias = this.noticias.filter(noti=>noti.title!== noticia.title);
    this.storage.set('favoritos', this.noticias);
    this.presentToast('Eliminado de Favoritos');
  }

  async presentToast(mensaje:string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

}
