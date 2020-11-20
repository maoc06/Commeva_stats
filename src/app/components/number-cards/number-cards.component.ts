import { Component, OnInit } from '@angular/core';
import { Asociado } from 'src/app/models/asociado';
import { Beneficio } from 'src/app/models/beneficio';
import { UsoBeneficios } from 'src/app/models/uso-beneficios';
import { AsociadoService } from 'src/app/services/asociado.service';
import { BeneficoService } from 'src/app/services/benefico.service';
import { UsoBeneficiosService } from 'src/app/services/uso-beneficios.service';

@Component({
  selector: 'app-number-cards',
  templateUrl: './number-cards.component.html',
  styleUrls: ['./number-cards.component.scss']
})
export class NumberCardsComponent implements OnInit {

  public beneficios: Beneficio[];
  public usoBeneficios: UsoBeneficios[];
  public asociados: Asociado[];

  single = [];
  view: any[] = [];

  colorScheme = {
    domain: ['#008C4A', '#11C2D6', '#8BC43F']
  };
  cardColor: string = '#fff';
  textColor: string = '#3B3B3B';
  innerPadding: number = 10;

  constructor(
    private beneficiosservice: BeneficoService,
    private usoBeneficioService: UsoBeneficiosService,
    private asociadoService: AsociadoService,
  ) {

    this.view = [innerWidth / 1.1, 200];
  }

  ngOnInit(): void {
    this.getBeneficios();
    this.getUsoBeneficios();
    this.getAsociados();
  }

  getAsociados(): void {
    this.asociadoService.findAll().subscribe(
      data => {
        this.asociados = data;
        this.single.push({ name: "N° de Asociados", value: this.asociados.length });
        this.single = [...this.single];
      }, err => {
        console.error(err);
      }
    );
  }
  getUsoBeneficios(): void {
    this.usoBeneficioService.findAll().subscribe(
      data => {
        this.usoBeneficios = data;
        this.single.push({ name: "N° de Beneficios Usados", value: this.usoBeneficios.length });
        this.single = [...this.single];
      }, err => {
        console.error(err);
      }
    );
  }

  getBeneficios(): void {
    this.beneficiosservice.findAll().subscribe(
      data => {
        this.beneficios = data;
        this.single.push({ name: "N° de Beneficios", value: this.beneficios.length });
        this.single = [...this.single];
      }, err => {
        console.error(err);
      }
    );
  }

}
