import { Component, OnInit } from '@angular/core';
import { Beneficio } from 'src/app/models/beneficio';
import { DataGraph } from 'src/app/models/data-graph';
import { UsoBeneficios } from 'src/app/models/uso-beneficios';
import { BeneficoService } from 'src/app/services/benefico.service';
import { UsoBeneficiosService } from 'src/app/services/uso-beneficios.service';
import getUniqueId from 'src/app/util/unique';
// import { countQuantity } from 'src/app/util/countQuantity';

@Component({
  selector: 'app-top-benefits',
  templateUrl: './top-benefits.component.html',
  styleUrls: ['./top-benefits.component.scss']
})
export class TopBenefitsComponent implements OnInit {

  usoBeneficios: UsoBeneficios[];
  beneficio: Beneficio;

  myData: DataGraph[] = [];

  // pubsingle: any[];
  view: any[] = [500, 400];

  public single = [
    // {
    //   "name": "Cine Colombia",
    //   "value": 125
    // },
    // {
    //   "name": "Cruz Verde",
    //   "value": 72
    // },
    // {
    //   "name": "Mister Wings",
    //   "value": 62
    // },
    // {
    //   "name": "Studio-F",
    //   "value": 50
    // },
    // {
    //   "name": "ELA",
    //   "value": 42
    // },
    // {
    //   "name": "Otros",
    //   "value": 25
    // }
  ];

  // options
  showLegend: boolean = true;
  showLabels: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(
    private usoBeneficiosService: UsoBeneficiosService,
    private beneficioService: BeneficoService,
  ) { }

  ngOnInit(): void {
    this.getUsoBeneficios();

  }


  getUsoBeneficios(): void {
    this.usoBeneficiosService.findAll().subscribe(
      data => {
        this.usoBeneficios = data;
        this.setDataSet();
      }, err => {
        console.error(err);
      });
  }

  setDataSet() {
    let uniqueIds: number[] = getUniqueId(this.usoBeneficios);
    for (const id of uniqueIds) {
      this.getBeneficio(id);
    }
  }

  getBeneficio(id: number) {
    this.beneficioService.findById(id).subscribe(
      data => {
        this.beneficio = data;
        // this.myData.push(
        //   new DataGraph(
        //     this.usoBeneficios.filter((obj) => obj.idbeneficio_Beneficios === id).length,
        //     this.beneficio.proveedorNombre
        //   )
        // );
        this.single.push({ name: this.beneficio.proveedorNombre, value: this.usoBeneficios.filter((obj) => obj.idbeneficio_Beneficios === id).length });
        this.single = [...this.single];
      }, err => {
        console.error(err);
      }
    );
  }

  // getUniqueId() {
  //   return [...new Set(this.usoBeneficios.map(item => item.idbeneficio_Beneficios))];
  // }


}
