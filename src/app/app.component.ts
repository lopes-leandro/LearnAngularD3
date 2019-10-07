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
      date: 'October 9, 2019 at 6:00PM',
      distance: 8.269
    }
  ];


  ngOnInit(): void {

    const elements = this.chartContainer.nativeElement;
    d3.select(elements).append('svg')
      .attr('width', this.width)
      .attr('height', this.height);

    // TODO: Utilizado para gerar elementos circle anteriormente
    // this.dataset.forEach(el => {
    //   d3.select('svg').append('circle');
    // });

    // TODO: Nova implementação para gerar elementos circles dinâmicamente
    d3.select('svg').selectAll('circle')
      .data(this.dataset)
      .enter()
      .append('circle');

    // creating a vertical linear scale
    const yScale = d3.scaleLinear();
    yScale.range([this.height, 0]);
    const yDomain = d3.extent(this.dataset, (data, index) => {
      return data.distance;
    });
    yScale.domain(yDomain);

    d3.selectAll('circle').data(this.dataset)
      .attr('cy', (datum, index) => {
        return yScale(datum.distance);
      });

    const parseTime = d3.timeParse('%B%e, %Y at %-I:%M%p');
    const formatTime = d3.timeFormat('%B%e, %Y at %-I:%M%p');
    const xScale = d3.scaleTime();
    xScale.range([0, this.width]);

    const xDomain = d3.extent(this.dataset, (data, index) => {
      return parseTime(data.date);
    });
    xScale.domain(xDomain);

    d3.selectAll('circle').data(this.dataset)
      .attr('cx', (datum, index) => {
        return xScale(parseTime(datum.date));
      });

  }
}
