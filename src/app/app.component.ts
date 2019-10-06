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
  width = '800px';
  height = '600px';

  ngOnInit(): void {
    const elements = this.chartContainer.nativeElement;
    d3.select(elements).append('svg')
      .style('width', this.width, 'important')
      .style('height', this.height, 'important');
  }
}
