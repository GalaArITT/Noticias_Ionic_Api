import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  noticias:Article[]= [];

  @ViewChild(IonSegment,{static:true}) segment: IonSegment; //mandar llamar un ionsegment 
  constructor(private noticiasService:NoticiasService) {}

  ngOnInit() {
    this.segment.value = this.categorias[0];
    this.cargarNoticias(this.segment.value);
   }

   cambioCategoria(event){
    //console.log(event.detail.value); //cargar el tipo de categoria
    this.noticias =[]; //hay que vaciar el arreglo 
    this.cargarNoticias(this.segment.value);

   }

   cargarNoticias(categoria:string, event?){

    this.noticiasService.getTopHeadlinesCategoria(categoria).subscribe(
      res=>{
        //console.log('encabezados',res);
        this.noticias.push(... res.articles);
        /*codigo del profe*/
        if(res.articles.length===0){
          event.target.disabled=true;
          event.target.complete();
        }        
        if(event){
          event.target.complete();
          return; 
        }
      })
   
    }
   loadData(event){
    this.cargarNoticias(this.segment.value, event);

   } 

}
