import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { StockUrlHelper } from './shared/helpers/stockurl.helper'
import { WinInfoHelper } from './shared/helpers/wininfo.helper'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css'       
],   
})
export class AppComponent implements AfterViewInit {

  componentToBeLoad: string = 'Splash'
  stockUrlHelper: StockUrlHelper;
  winInfoHelper:WinInfoHelper;
  ngAfterViewInit(): void {

  }
  constructor() {     
    this.stockUrlHelper = new StockUrlHelper();  
    this.winInfoHelper=new WinInfoHelper();    
    this.componentToBeLoad = this.winInfoHelper.getWindowType();        
  }

}