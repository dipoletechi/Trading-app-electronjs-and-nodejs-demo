import { Component, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { StockUrlHelper } from '../shared/helpers/stockurl.helper'
import { WinInfoHelper } from '../shared/helpers/wininfo.helper'
import { remote, ipcRenderer } from 'electron';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChartsComponent implements AfterViewInit {
  stockUrlHelper: StockUrlHelper;
  winInfoHelper:WinInfoHelper;
  chartUrl:string;
  constructor() {
    this.stockUrlHelper = new StockUrlHelper();
    this.winInfoHelper=new WinInfoHelper();
    this.chartUrl=this.getChartUrl();    
  }

  ngAfterViewInit(): void {

  }
  backgroundColor: string = '#0b0b17';
  textColor:string='#fff';

  // stocks = [
  //   { Text: 'NVDA', Id: "NASDAQ:NVDA", cols: 1, rows: 1, color: this.backgroundColor,textColor:this.textColor },
  //   { Text: 'AAPL', Id: "NASDAQ:AAPL", cols: 1, rows: 2, color: this.backgroundColor,textColor:this.textColor },
  //   { Text: 'INTC', Id: "NASDAQ:INTC", cols: 1, rows: 3, color: this.backgroundColor,textColor:this.textColor }
  // ];

  selectStock(event,selectedStock) {        
    this.setSelectedStockColor(selectedStock);
    this.stockUrlHelper.intevals.forEach(element => {
      ipcRenderer.send('updatestock', element, this.stockUrlHelper.CreateChartUrl(element, selectedStock.Id), selectedStock.Id);
    });
  }

  private setSelectedStockColor(selectedStock) {
    // this.stocks.forEach(stock => {
    //   stock.color = this.backgroundColor;
    //   stock.textColor=this.textColor;
    // });
    // selectedStock.color = "#fff";
    // selectedStock.textColor="#000";
  }

  private getChartUrl()
  {    
    var windowInfo=this.winInfoHelper.getWindowInfoObj();
    return this.stockUrlHelper.CreateChartUrl(windowInfo.Interval,windowInfo.Stock);
  }
}