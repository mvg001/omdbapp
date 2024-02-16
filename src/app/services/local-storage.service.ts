import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { MovieData } from '../interfaces/movie-data';
import { Observable } from 'rxjs';

const ROOT_NODE = 'peliculas';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private localStorage: Storage) { 
    this.init();
  }

  async init() {
    this.localStorage = await this.localStorage.create();
  }

  deletePelicula(titulo:string): Observable<any> {
    return new Observable(
      subscriber => {
        this.getAllPeliculas().then((pelis:MovieData[]) => {
          if (pelis.length > 0) {
            pelis.splice(pelis.findIndex(p=>p.Title==titulo),1);
            this.localStorage.set(ROOT_NODE,pelis).then(() => {
              subscriber.next();
              subscriber.complete();
            });
          }
        });
      }
    );


/*     let todasPelis: MovieData[] = [];
    let pelisFiltered: MovieData[] = [];
    this.getAllPeliculas().then((lista: MovieData[]) => {
      todasPelis = lista;
    }).then(value => {
      pelisFiltered = todasPelis.filter(peli => peli.Title != titulo);
    }).then(value => {
      this.localStorage.set(ROOT_NODE,pelisFiltered);
    }); */

  }
  savePelicula(pelicula:MovieData) {
    if (!pelicula) return;
    this.localStorage.get(ROOT_NODE)
    .then((data:MovieData[]) => {
      let peliculas: MovieData[] = (data == null) ? [] : data;
      peliculas.push(pelicula);
      peliculas.sort((a,b) => {
        if (a.Title === b.Title) return 0;
        if (a.Title < b.Title) return -1;
        return 1;
      });
      this.localStorage.set(ROOT_NODE,peliculas);
    }).catch(error => {
      console.log('Error: '+error.message);
    }).finally(() => {
      console.log('LocalStorage processing done');
    });
  }

  getPelicula(title: string): Observable<MovieData> {
    let t:string = title.trim().toLocaleLowerCase();
    console.log('Título buscado localmente: '+t);
    return new Observable<MovieData>(
      subscriber => {
        this.localStorage.get(ROOT_NODE)
        .then(
          (peliculas:MovieData[]) => {
            let pelicula = peliculas.find((p:MovieData) => 
              p.Title.trim().toLowerCase().includes(t));
            subscriber.next(pelicula);
            subscriber.complete();
          }
        )
      }
    );
  }

  getAllPeliculas(): Promise<MovieData[]> {
    return this.localStorage.get(ROOT_NODE);
  }


} // end class LocalStorageService


