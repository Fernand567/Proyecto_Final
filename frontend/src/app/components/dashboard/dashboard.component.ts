import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ChartData, ChartType, Chart, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CajasService } from 'src/app/auth/cajas.service';
import { Observable } from 'rxjs';

// Registramos los módulos necesarios para usar Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective, { static: true }) myPieChart!: BaseChartDirective;

  public pieChartData: ChartData<'pie', number[], string> = {
    labels: ['Cajas Pequeñas', 'Cajas Medianas', 'Cajas Grandes'],
    datasets: [
      {
        data: [1, 1, 1], // Inicializa los valores en 1
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  public pieChartType: ChartType = 'pie';
  public cajasData$!: Observable<any>; // Aquí definimos la propiedad cajasData$ como Observable<any>

  public pieChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
  };

  constructor(private cajasService: CajasService, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cajasData$ = this.cajasService.obtenerCajas();
    this.obtenerDatosCajas(); // Mantenemos esta llamada para actualizar la gráfica inmediatamente

    // Llamar automáticamente a la función actualizarGrafico() cada 5 segundos
    setInterval(() => {
      this.actualizarGrafico();
    }, 5000); // 5000 milisegundos = 5 segundos
  }

  ngAfterViewInit(): void {
    this.myPieChart.update();
  }

  obtenerDatosCajas(): void {
    this.cajasData$.subscribe(
      (data: any) => {
        console.log(data);
        const a: number[] = [];
        data.forEach((b: any) => {
          a.push(b.cantidad);
        });

        console.log(a);

        this.pieChartData.datasets[0].data = a;
        console.log(this.pieChartData.datasets[0].data);

        // Disparar manualmente la detección de cambios
        this.changeDetectorRef.detectChanges();

        // Actualizar el gráfico
        this.myPieChart.update();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // Función para actualizar manualmente el gráfico
  actualizarGrafico(): void {
    this.obtenerDatosCajas();
  }
}
