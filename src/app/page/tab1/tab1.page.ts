import { Component, OnInit, ViewChild } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias:Article[]=[]; 
  @ViewChild(IonInfiniteScroll,{static:false}) infiniteScroll: IonInfiniteScroll;

  constructor(private noticiasServices:NoticiasService) {}

  //consumir servicio
  ngOnInit() {
    this.cargarNoticia();
  }

  loadData(event){
    //console.log(event);
    this.cargarNoticia(event);
  }

  cargarNoticia(event?){ //? es para opcional
    this.noticiasServices.getTopHeadlines().subscribe( 
      res => {
      //console.log('noticias',res);
      /*codigo del profe*/
      if(res.articles.length===0){
        event.target.disabled=true;
        event.target.complete();
      }
      this.noticias.push(...res.articles);
      //mi codigo 
      if(event){
        event.target.complete();
        //this.infiniteScroll.disabled = true; //parar el infinite scroll a mi me funcionó
        return; 
      }
    });    
  }


}
