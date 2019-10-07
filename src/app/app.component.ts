import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {

  @ViewChild('chart') private chartContainer: ElementRef;
  // resizing applicated with .styles() method
  // width = '800px';
  // height = '600px';

  width = 800;
  height = 600;

  dataset = [
    {
      id: 1,
      date: 'October 1, 2019 at 4:00PM',
      distance: 5.2
    },
    {
      id: 2,
      date: 'October 4, 2019 at 5:00PM',
      distance: 7.0275
    },
    {
      id: 3,
      date: 'October 15, 2019 at 6:00PM',
      distance: 8.269
    }
  ];


  ngOnInit(): void {

    // console.log(this.dataset);

    const elements = this.chartContainer.nativeElement;
    d3.select(elements).append('svg')
      // .style('width', this.width, 'important')
      // .style('height', this.height, 'important')
      .attr('width', this.width)
      .attr('height', this.height);

    this.dataset.forEach(el => {
      d3.select('svg').append('circle');
    });

    // creating a vertical linear scale
    const yScale = d3.scaleLinear();
    yScale.domain([0, 10]);
    yScale.range([this.height, 0]);

    // você pode obter o domínio sempre que quiser assim
    // console.log(yScale.domain());
    // você pode obter o range sempre que quiser assim
    // console.log(yScale.range());
    // você converte um ponto de dado em um ponto visual
    // console.log(yScale(5.9));
    // você converte um ponto visual em um valor de dado
    // console.log(yScale.invert(29));

    // passando valores státicos para os elementos selecionados
    // d3.selectAll('circle').attr('cy', 300);

    d3.selectAll('circle').data(this.dataset)
      .attr('cy', (datum, index) => {
        // console.log(index);
        return yScale(datum.distance);
      });

    // scaleTime(): mapea valor dos dados com pontos visuais numéricos; 
    const xScale = d3.scaleTime();
    xScale.range([0, this.width]);
    xScale.domain([new Date('2019-10-1'), new Date('2019-10-31')]);
    // console.log(xScale(new Date('2019-10-15')));
    // console.log(xScale.invert(371.54811715481173));

    const parseTime = d3.timeParse('%B%e, %Y at %-I:%M%p');
    const formatTime = d3.timeFormat('%B%e, %Y at %-I:%M%p');

    d3.selectAll('circle').data(this.dataset)
      .attr('cx', (datum, index) => {
        return xScale(parseTime(datum.date));
      });

  }
}
