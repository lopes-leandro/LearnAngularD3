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

  width = '800';
  height = '600';

  dataset: any[] = [
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

    console.log(this.dataset);

    const elements = this.chartContainer.nativeElement;
    d3.select(elements).append('svg')
      // .style('width', this.width, 'important')
      // .style('height', this.height, 'important')
      .attr('width', this.width)
      .attr('height', this.height);

    this.dataset.forEach(el => {
      d3.select('svg').append('circle');
    });

  }
}
