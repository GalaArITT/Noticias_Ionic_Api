import { Injectable, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey= environment.apiKey;
const apiUrl = environment.apiUrl;
const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  headlinepages = 0;
  categoriaActual='';
  categoriaPage =0; 
  constructor(private http: HttpClient ) { }

  private ejecutarQuery<T>(query:string){ // recibir un tipo y la respuesta es de eso
    query = apiUrl + query;
    return this.http.get<T>(query,{headers});
  }

  getTopHeadlines(){
    this.headlinepages++;
      return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=mx&page=${this.headlinepages}`);
      //return this.http.get<RespuestaTopHeadlines>('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=74814b76438344c8809763de43fa408d');
  }
  getTopHeadlinesCategoria(categoria:string){
    if(this.categoriaActual===categoria){
      this.categoriaPage++;
    }else{
      this.categoriaPage=1;
      this.categoriaActual=categoria;
    }
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=mx&category=${categoria}&page=${this.categoriaPage}`);
    //return this.http.get('https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=74814b76438344c8809763de43fa408d')
  }
}
