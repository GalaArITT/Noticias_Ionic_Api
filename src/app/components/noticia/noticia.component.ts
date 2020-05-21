import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { browser } from 'protractor';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia:Article;
  @Input() i:number;
  @Input() enFavoritos; 

  constructor(private iab:InAppBrowser, private actionSheetCtrl:ActionSheetController
    , private socialSharing: SocialSharing, private dataLocal : DataLocalService,private toastCtrl:ToastController) { }

  ngOnInit() {
    console.log('Favoritos', this.enFavoritos);
  }

  abrirNoticia(){
    //console.log('Noticia', this.noticia.url);
    const browser = this.iab.create(this.noticia.url, '_system'); //para abrir en el navegador por defecto del movil
  }

  async lanzarMenu(){

    let guardarBorrarBtn;
    if(this.enFavoritos){
      //borrar de favoritos
      guardarBorrarBtn= {
        text: 'Eliminar de Favoritos',
        icon: 'trash',
        cssClass:'action-dark',
        handler: () => {
          console.log("borrado");
          this.dataLocal.borrarNoticia(this.noticia);
        }
      }      
    }else{
      guardarBorrarBtn= {
        text: 'Favorito',
        icon: 'star',
        cssClass:'action-dark',
        handler: () => {
          console.log("favorito");
          this.dataLocal.guardarNoticia(this.noticia);
        }
      }
    }


    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        cssClass:'action-dark',
        handler: () => {
          //console.log('Share clicked');
            this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          );
        },
      }, 
      guardarBorrarBtn,
       {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        cssClass:'action-dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  

}
