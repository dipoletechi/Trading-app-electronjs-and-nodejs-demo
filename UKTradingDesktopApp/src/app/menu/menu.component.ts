import { Component, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { ipcRenderer, remote } from 'electron';
import { StockUrlHelper } from '../shared/helpers/stockurl.helper'
import { StockService } from '../stock/shared/stock.service';
import { NotificationService } from '../shared/service/notification.service'
import { ResponseType } from '../shared/models/response.model';
import { ClockService } from './shared/clock.service';
import { MenuHelper, MenuItem, SubMenuItemFirstLevel, MenuIdentification } from './helpers/menu.helpers'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.clockService.getNewYorkClock().subscribe(time => this.newYorkClock = time);
    this.clockService.getLondonClock().subscribe(time => this.londonClock = time);
    this.SetDefaultSymbol();
  }

  authToken: string;
  isLoading: boolean = true;
  isMenuInAction: boolean = false;
  loaderMessage: string = "Please wait.."
  stockUrlHelper: StockUrlHelper;
  stockService: StockService;
  notificationService: NotificationService;
  menuItems: Array<MenuItem> = new Array<MenuItem>();
  newYorkClock: Date;
  londonClock: Date;

  constructor(stockService: StockService, private zone: NgZone, private clockService: ClockService, notificationService: NotificationService) {
    this.stockUrlHelper = new StockUrlHelper();
    this.stockService = stockService;
    this.notificationService = notificationService;
    this.authToken = remote.getGlobal("userAuthToken");
    this.menuItems = (new MenuHelper()).menuItems;
  }

  openChartForInterval(interval: string) {
    ipcRenderer.send('showchart', interval);
  }

  menumouseover(menuItem: any) {
    this.isMenuInAction = true;
    var imageUrl = "./assets/menuimages/" + menuItem.Id + "-" + "orange.png";
    menuItem.ImageUrl = imageUrl;
  }


  menumouseout(menuItem: any) {
    this.isMenuInAction = false;
    var imageUrl = "./assets/menuimages/" + menuItem.Id + "-" + "white.png";
    menuItem.ImageUrl = imageUrl;
  }

  menuclick(menuItem: any) {
    var id = menuItem.Id;
    switch (id) {
      case MenuIdentification.Chart:
        ipcRenderer.send('createnewchart');
        break;
      case MenuIdentification.Watchlist:
        ipcRenderer.send('showstock');
      case MenuIdentification.Subwatchlist:
        ipcRenderer.send('showstock');
        break;
      case MenuIdentification.AnyChart:
        ipcRenderer.send('anychart');
        break;
      case MenuIdentification.Logout:
        ipcRenderer.send('authentication', false);
        break;
      default: {
        if (menuItem.SubMenuLevel == "1") {
          this.notificationService.notify("warning", "Not implemented", "Action on this menu option will be implemented soon.");
        }
      }
    }
  }

  SetDefaultSymbol() {

    this.stockService.getDefaultSymbol(this.authToken).subscribe(
      response => {
        this.zone.run(() => {
          this.isLoading = false;
        });
        if (response.Type == ResponseType.Success) {
          var defaultSymbol = (response.Data[0] as any).Symbol;
          ipcRenderer.send("updatestock", "", defaultSymbol);
        }
        else {
          this.notificationService.notify(response.Type, "Default symbol", response.Message);
        }

      },
      error => {
        this.notificationService.notify("error", "Default symbol", "Failed to load default symbol");
        this.zone.run(() => {
          this.isLoading = false;
        });
      }
    );
  }
}