import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MovieData } from 'src/app/interfaces/movie-data';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { OmdbSvcService } from 'src/app/services/omdb-svc.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {



  pelicula: MovieData | undefined;
  titulo: string = '';
  cargando: boolean = false;


  constructor(private omdbSvc: OmdbSvcService, private ldb: LocalStorageService) { }

  ngOnInit() {
  }

  guardarPeli() {
    if (this.pelicula) this.ldb.savePelicula(this.pelicula);
  }

  showPeli(pelicula: MovieData) {
    this.pelicula = pelicula;
  }

  buscarPeli() {
    if (this.titulo.trim().length <= 0) return;
    console.log(`buscando: ${this.titulo}`);
    this.pelicula = undefined;
    let formulario = this;
    this.cargando = true;
    let t = this.titulo;
    this.titulo = '';
    this.omdbSvc.fetchMovie(t).subscribe(
      {
        next(retorno: MovieData) {
          formulario.pelicula = retorno;
        },
        error(error: HttpErrorResponse) {
          console.error('Ha ocurrido un error: ' + error.message);
        },
        complete() {
          console.log('petición finalizada');
          formulario.cargando = false;
        }
      }
    );
  }
  buscarPeliLocalmente() {
    if (this.titulo.trim().length <= 0) return;
    this.pelicula = undefined;
    let t = this.titulo;
    this.titulo = '';
    this.ldb.getPelicula(this.titulo).subscribe(
      pelicula => this.pelicula = pelicula
    );
  }

} // end of FormularioPage
