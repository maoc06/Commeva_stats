import { Component, OnInit } from '@angular/core';
import { Beneficio } from 'src/app/models/beneficio';
import { Categoria } from 'src/app/models/categoria';
import { UsoBeneficios } from 'src/app/models/uso-beneficios';
import { BeneficoService } from 'src/app/services/benefico.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { UsoBeneficiosService } from 'src/app/services/uso-beneficios.service';
import getUniqueId from 'src/app/util/unique';

@Component({
  selector: 'app-graph-by-category',
  templateUrl: './graph-by-category.component.html',
  styleUrls: ['./graph-by-category.component.scss']
})
export class GraphByCategoryComponent implements OnInit {

  beneficio: Beneficio;
  usoBeneficios: UsoBeneficios[];

  categories: Categoria[];
  category: Categoria;
  categoriesLabels = [];
  categoriesData = [];

  view: any[] = [600, 400];

  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'Categoria';
  showYAxisLabel = false;
  yAxisLabel = 'Uso';
  timeline = true;

  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#16a596', '#FF7F50', '#90EE90', '#FA8072', '#cad315', '#fd3a69']
  };

  //pie
  showLabels = true;

  // data goes here
  public single = [];


  constructor(
    private categoryService: CategoriaService,
    private usoBeneficiosService: UsoBeneficiosService,
    private beneficioService: BeneficoService,
  ) { }

  ngOnInit(): void {
    this.getCategories();
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
        let value = this.usoBeneficios.filter((obj) => obj.idbeneficio_Beneficios === id).length;
        this.getCategory(this.beneficio.idCategoriaBeneficio, value);

      }, err => {
        console.error(err);
      }
    );
  }

  getCategory(id: number, value: number): void {
    this.categoryService.findById(id).subscribe(
      data => {
        this.category = data;
        this.single.push({ name: this.category.categoria, value: value });
        this.single = [...this.single];
      }, err => {
        console.error(err);
      }
    );
  }

  getCategories(): void {
    this.categoryService.findAll().subscribe(
      data => {
        this.categories = data;
        this.setAxisXLabels();
      }, err => {
        console.error(err);
      }
    );
  }

  setAxisXLabels(): void {
    for (const category of this.categories) {
      this.single.push({
        name: category.categoria,
        value: 0
      });
      this.single = [...this.single];
    }
  }

}
