import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OMDB_API_URL } from '../../environments/environment';
import { OMDB_API_KEY } from '../../environments/environment';
import { MovieData } from '../interfaces/movie-data';
@Injectable({
  providedIn: 'root'
})
export class OmdbSvcService {

  constructor(private httpc: HttpClient) { }
  fetchMovie(title: string) {
    const url = `${OMDB_API_URL}/?apikey=${OMDB_API_KEY}&t=${title}`;
    return this.httpc.get<MovieData>(url);
  }
}
