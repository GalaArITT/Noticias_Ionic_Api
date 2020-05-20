import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias:Article[]=[]; 
  constructor(private noticiasServices:NoticiasService) {}

  //consumir servicio
  ngOnInit() {
    this.noticiasServices.getTopHeadlines().subscribe( 
      res => {
      console.log('noticias',res);
      this.noticias.push(...res.articles);
    });    
  }


}
