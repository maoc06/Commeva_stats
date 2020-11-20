import { Component, OnInit } from '@angular/core';
import { Beneficio } from 'src/app/models/beneficio';
import { Categoria } from 'src/app/models/categoria';
import { UsoBeneficios } from 'src/app/models/uso-beneficios';
import { BeneficoService } from 'src/app/services/benefico.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { UsoBeneficiosService } from 'src/app/services/uso-beneficios.service';

@Component({
  selector: 'app-graph-by-category',
  templateUrl: './graph-by-category.component.html',
  styleUrls: ['./graph-by-category.component.scss']
})
export class GraphByCategoryComponent implements OnInit {

  chartInstance: any;

  beneficio: Beneficio;
  usoBeneficios: UsoBeneficios[];

  categories: Categoria[];
  categoriesLabels = [];

  categoriesData = [];

  initOpts = {
    renderer: 'svg',
    width: 400,
    height: 325
  };

  options = {
    title: {
      text: 'Uso por Categorias',
      left: 'center',
      top: 20,
      textStyle: {
        color: '#3B3B3B',
      },
    },
    color: ['#008C4A'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: this.categoriesLabels,
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [{
      type: 'value'
    }],
    series: [{
      name: 'Cantidad',
      type: 'bar',
      barWidth: '60%',
      data: this.categoriesData,
    }]
  };

  constructor(
    private usoBeneficiosService: UsoBeneficiosService,
    private categoryService: CategoriaService,
    private beneficioService: BeneficoService,
  ) { }

  ngOnInit(): void {
    console.group('Grafico: Por Categorias');
    this.getCategories();
    this.getUsoBeneficios();
  }

  onChartInit(e: any) {
    this.chartInstance = e;
    console.log('*Grafico renderizado');
  }

  getCategories(): void {
    this.categoryService.findAll().subscribe(
      data => {
        console.log('*Categorias cargadas');
        this.categories = data;
        this.setAxisXLabels();
      }, err => {
        console.error(err);
      }
    );
  }

  setAxisXLabels(): void {
    for (const category of this.categories) {
      this.categoriesLabels.push(category.categoria);
      this.categoriesData.push(0);
    }
    console.log('*Etiquetas del eje X cargadas');
  }

  getUsoBeneficios(): void {
    this.usoBeneficiosService.findAll().subscribe(
      data => {
        console.log('*Uso de beneficios cargado');
        this.usoBeneficios = data;
        this.setDataSet();
      }, err => {
        console.error(err);
      });
  }



  setDataSet(): void {
    for (const beneficio of this.usoBeneficios) {
      this.getBeneficio(beneficio.idbeneficio_Beneficios);
    }
    console.log('*Conteo por categoria terminado');
    console.groupEnd();
  }

  getBeneficio(id: number): void {
    this.beneficioService.findById(id).subscribe(
      data => {
        this.beneficio = data;
        this.getCategory(this.beneficio.idCategoriaBeneficio);
      }, err => {
        console.error(err);
      }
    );
  }

  getCategory(id: number): void {
    this.categoryService.findById(id).subscribe(
      data => {
        let category: Categoria = data;
        let index = this.categoriesLabels.indexOf(category.categoria);
        this.categoriesData[index] += 1;
      }, err => {
        console.error(err);
      }
    );
  }

}
