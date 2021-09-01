import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';

import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class PorPaisComponent {
  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugerencias: Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor(private paisService: PaisService) {}

  buscar(termino: string) {
    if (termino.length !== 0) {
      this.hayError = false;
      this.termino = termino;
      this.mostrarSugerencias = false;

      this.paisService.buscarPais(termino).subscribe(
        (paises) => {
          //console.log(paises);
          this.paises = paises;
        },
        (err) => {
          this.hayError = true;
          this.paises = [];
        }
      );
    }
  }

  //TO DO hacerlo reutilizable
  sugerencias(termino: string) {
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;

    this.paisService.buscarPais(termino).subscribe(
      (paises) => {
        this.paisesSugerencias = paises;
        this.paisesSugerencias = this.paisesSugerencias.splice(0, 5);
      },
      (err) => {
        this.paisesSugerencias = [];
      }
    );
  }
}
