import { Component, ViewChild, AfterViewInit, ViewEncapsulation, EventEmitter, NgZone } from '@angular/core';
import { StockUrlHelper } from '../shared/helpers/stockurl.helper'
import { remote, ipcRenderer } from 'electron';
import { StockModel } from './models/stock.model';
import { MatTableDataSource } from '@angular/material';
import { MatFormField } from '@angular/material/form-field';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { StockService } from './shared/stock.service'
import { Observable } from 'rxjs/Rx';
import { NotificationService } from '../shared/service/notification.service'
import { ResponseType } from '../shared/models/response.model'
import { CustomErrorStateMatcher } from '../shared/helpers/errorstatematcher.helper';
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class StockComponent implements AfterViewInit {
  symbolAddControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new CustomErrorStateMatcher();
  newSymbol: string = '';
  displayedColumns = ['Symbol', 'Name', 'Price', 'Percentage'];
  stockDataSource = new MatTableDataSource([]);


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches   
    this.stockDataSource.filter = filterValue;
  }
  isLoading: boolean = true;
  loaderMessage: string = 'Loading watchlist..'

  stockUrlHelper: StockUrlHelper;
  stockService: StockService;
  backgroundColor: string = '#0b0b17';
  textColor: string = '#fff';
  selectedBackgroundColor: string = 'rgb(30, 28, 39)';
  selectedTextColor: string = '#0b0b17';
  notificationService: NotificationService;
  authToken:string;
  constructor(private zone: NgZone, stockService: StockService, notificationService: NotificationService) {
    this.stockUrlHelper = new StockUrlHelper();
    this.stockService = stockService;
    this.notificationService = notificationService;
    this.authToken=remote.getGlobal("userAuthToken");
    this.loadWatchlist();
  }

  ngAfterViewInit(): void {

  }

  addSymbol() {
    if (this.isLoading == false && this.newSymbol != '') {
      this.isLoading = true;
      this.loaderMessage = 'Adding ' + this.newSymbol + ' symbol to wathclist in progress..';
      this.stockService.addsymbol(this.newSymbol,this.authToken).subscribe(
        data => {
          this.zone.run(() => {
            this.isLoading = false;
          });
          if (data.Type == ResponseType.Success) {
            var stockModel = new StockModel(this.backgroundColor, this.textColor);
            stockModel.Symbol = this.newSymbol;
            stockModel.Price = "--";
            stockModel.Name = "--";
            stockModel.Percentage = "--";
            this.stockDataSource.data.push(stockModel);
            this.stockDataSource._updateChangeSubscription();
            this.newSymbol = '';
          } else {            
            this.notificationService.notify(data.Type, "Add Symbol failed", data.Message);
            this.zone.run(() => {
              this.isLoading = false;
            });
          }
        },
        error => {          
          this.notificationService.notify("error", "Add Symbol failed", "Error in adding new symbol to watchlist");
          this.zone.run(() => {
            this.isLoading = false;
          });
        }
      );
    }
  }

  selectStock(event, selectedStock: StockModel) {
    this.setSelectedStockColor(selectedStock);
    ipcRenderer.send('updatestock', selectedStock.Symbol);
  }

  private setSelectedStockColor(selectedStock) {
    this.stockDataSource.data.forEach(stock => {
      stock.BackgroundColor = this.backgroundColor;
      stock.TextColor = this.textColor;
    });
    selectedStock.TextColor = this.selectedTextColor;
    selectedStock.BackgroundColor = this.selectedBackgroundColor
    this.stockDataSource._updateChangeSubscription();
  }


  loadWatchlist() {    
    this.stockService.getwatchlist(this.authToken).subscribe(
      watchlistresponse => {
        if (watchlistresponse.Type == ResponseType.Success) {
          this.stockDataSource = new MatTableDataSource(this.stockParser(watchlistresponse.Data));
        }
        else {
          this.notificationService.notify(watchlistresponse.Type, "Issue in symbol load", watchlistresponse.Message);
        }

        this.isLoading = false;
      },
      error => {
        this.notificationService.notify("error", "Watchlist load failed", "Error in getting watchlist");
      }
    );

  }

  private stockParser(stock: any) {
    var stockRepo = new Array<StockModel>();

    stock.forEach(st => {
      var stockModel = new StockModel(this.backgroundColor, this.textColor);
      if (st.IsDefault == "1") {
        stockModel = new StockModel(this.selectedBackgroundColor, this.selectedTextColor);
      }
      stockModel.Name = st.Name;
      stockModel.Percentage = st.Percentage;
      stockModel.Price = st.Price;
      stockModel.Symbol = st.Symbol;
      stockModel.IsDefault = st.IsDefault;
      stockRepo.push(stockModel);
    });
    return stockRepo;
  }

}

