import { Component, OnInit } from '@angular/core';
import { Beneficio } from 'src/app/models/beneficio';
import { DataGraph } from 'src/app/models/data-graph';
import { UsoBeneficios } from 'src/app/models/uso-beneficios';
import { BeneficoService } from 'src/app/services/benefico.service';
import { UsoBeneficiosService } from 'src/app/services/uso-beneficios.service';
// import { countQuantity } from 'src/app/util/countQuantity';

@Component({
  selector: 'app-top-benefits',
  templateUrl: './top-benefits.component.html',
  styleUrls: ['./top-benefits.component.scss']
})
export class TopBenefitsComponent implements OnInit {

  usoBeneficios: UsoBeneficios[];
  beneficio: Beneficio;
  chartInstance: any;

  myData: DataGraph[] = [];

  options = {
    // backgroundColor: '#2c343c',
    title: {
      text: 'Top Beneficios',
      left: 'center',
      top: 20,
      textStyle: {
        color: '#3B3B3B',
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    visualMap: {
      show: false,
      min: 80,
      max: 600,
      inRange: {
        colorLightness: [0, 1],
      },
    },
    series: [
      {
        name: 'Cantidad',
        type: 'pie',
        radius: '55%',
        center: ['50%', '50%'],
        data: this.myData.sort((a, b) => a.value - b.value),
        roseType: 'radius',
        label: {
          normal: {
            textStyle: {
              color: 'rgba(0, 0, 0, 0.3)',
            },
          },
        },
        labelLine: {
          normal: {
            lineStyle: {
              color: 'rgba(0, 0, 0, 0.3)',
            },
            smooth: 0.2,
            length: 10,
            length2: 20,
          },
        },
        itemStyle: {
          normal: {
            color: '#008C4A',
            shadowBlur: 100,
            shadowColor: 'rgba(0, 155, 0, 0.5)',
          },
        },

        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: () => Math.random() * 200,
      },
    ],
  };

  constructor(
    private usoBeneficiosService: UsoBeneficiosService,
    private beneficioService: BeneficoService,
  ) { }

  ngOnInit(): void {
    console.group('Grafico: Top Beneficios');
    this.getUsoBeneficios();
  }

  onChartInit(e: any) {
    this.chartInstance = e;
    console.log('Grafico renderizado');
  }

  getUsoBeneficios(): void {
    this.usoBeneficiosService.findAll().subscribe(
      data => {
        console.log('Uso de beneficios Cargado');
        this.usoBeneficios = data;
        this.setDataSet();

      }, err => {
        console.error(err);
      });
  }

  setDataSet() {
    let uniqueIds: number[] = this.getUniqueId();
    for (const id of uniqueIds) {
      this.getBeneficio(id);
    }
    console.log('IDs unicos cargados');
    console.groupEnd();
  }

  getBeneficio(id: number) {
    this.beneficioService.findById(id).subscribe(
      data => {
        this.beneficio = data;
        this.myData.push(
          new DataGraph(
            this.usoBeneficios.filter((obj) => obj.idbeneficio_Beneficios === id).length,
            this.beneficio.proveedorNombre
          )
        );
      }, err => {
        console.error(err);
      }
    );
  }

  getUniqueId() {
    return [...new Set(this.usoBeneficios.map(item => item.idbeneficio_Beneficios))];
  }


}
