import { Component, OnInit } from '@angular/core';
import { MovieData } from 'src/app/interfaces/movie-data';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {

  peliculas: MovieData[] = [];
  todasPeliculas: MovieData[] = [];
  titulo: string = '';


  constructor(private ldb: LocalStorageService) { }

  ngOnInit() {
    this.getAllPelis();
  }

  getAllPelis() {
    this.ldb.getAllPeliculas().then((lista: MovieData[]) => {
      if (lista.length > 0) {
        this.peliculas = lista;
        this.todasPeliculas = lista;
      }
    });
  }
  alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        //console.log(`cancelado borrado`);
      },
    },
    {
      text: 'Borrar!',
      role: 'confirm',
      handler: () => {
        //console.log(`confirmado borrado`);
      }
    },
  ];
  setResult(ev:any,titulo:string) {
    //console.log(titulo);
    //console.log(ev);
    if (ev.detail.role == 'confirm') {
      //console.log(`invocando borrado`);
      this.borrar(titulo);
    }
  }
  borrar(titulo: string) {
    this.ldb.deletePelicula(titulo).subscribe((value) => {
      this.getAllPelis();
    });
  }
  editar(titulo: string) {
    console.log(`listado::editar(${titulo}) not implemented`);
  }
  filtrarTitulo() {
    let tit = this.titulo.trim().toLowerCase();
    if (tit.length <= 0 || this.peliculas.length <= 0) return;
    this.peliculas = this.todasPeliculas.filter(
      (p:MovieData) => p.Title.trim().toLowerCase().includes(tit)
    );
  }
}
