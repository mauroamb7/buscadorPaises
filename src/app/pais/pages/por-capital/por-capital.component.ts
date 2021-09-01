import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class PorCapitalComponent {
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

      this.paisService.buscarCapital(termino).subscribe(
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

    this.paisService.buscarCapital(termino).subscribe(
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
