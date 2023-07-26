import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public pieChartData: ChartData<'pie', number[], string> = {
    labels: ['Cajas Pequeñas', 'Cajas Medianas', 'Cajas Grandes'],
    datasets: [
      {
        data: [
          this.getRandomValue(),
          this.getRandomValue(),
          this.getRandomValue(),
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  public pieChartType: ChartType = 'pie';

  private getRandomValue(): number {
    return Math.floor(Math.random() * 100) + 1; // Genera un valor aleatorio entre 1 y 100
  }

  ngOnInit(): void {}
}
