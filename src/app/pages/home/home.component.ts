import { Component, OnInit } from '@angular/core';
import { Asociado } from 'src/app/models/asociado';
import { Beneficio } from 'src/app/models/beneficio';
import { UsoBeneficios } from 'src/app/models/uso-beneficios';
import { AsociadoService } from 'src/app/services/asociado.service';
import { BeneficoService } from 'src/app/services/benefico.service';
import { UsoBeneficiosService } from 'src/app/services/uso-beneficios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public beneficios: Beneficio[];
  public usoBeneficios: UsoBeneficios[];
  public asociados: Asociado[];

  constructor(
    private beneficiosservice: BeneficoService,
    private usoBeneficioService: UsoBeneficiosService,
    private asociadoService: AsociadoService,
  ) { }

  ngOnInit(): void {
    this.getBeneficios();
    this.getUsoBeneficios();
    this.getAsociados();
  }

  getAsociados(): void {
    this.asociadoService.findAll().subscribe(
      data => {
        this.asociados = data;
      }, err => {
        console.error(err);
      }
    );
  }
  getUsoBeneficios(): void {
    this.usoBeneficioService.findAll().subscribe(
      data => {
        this.usoBeneficios = data;
      }, err => {
        console.error(err);
      }
    );
  }

  getBeneficios(): void {
    this.beneficiosservice.findAll().subscribe(
      data => {
        this.beneficios = data;
      }, err => {
        console.error(err);
      }
    );
  }

}
