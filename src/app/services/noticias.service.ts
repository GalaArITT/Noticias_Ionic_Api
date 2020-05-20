import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private http: HttpClient ) { }

  getTopHeadlines(){
    return this.http.get<RespuestaTopHeadlines>('http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=74814b76438344c8809763de43fa408d');
  }
}
