import { Component, ViewChild, AfterViewInit, Input } from '@angular/core';
import { ipcRenderer } from 'electron';
import { StockUrlHelper } from '../shared/helpers/stockurl.helper'
import { WinInfoHelper } from '../shared/helpers/wininfo.helper'
import { NotificationService } from '../shared/service/notification.service'

@Component({
    selector: 'app-titleheader',
    templateUrl: './titleheader.component.html',
    styleUrls: ['./titleheader.component.css']
})
export class TitleHeaderComponent implements AfterViewInit {
    @Input()
    loaderMessage: string = "Loading.."

    @Input()
    isLoading: boolean = false

    stockUrlHelper: StockUrlHelper;
    winInfoHelper: WinInfoHelper;
    headerTitle: string;
    ngAfterViewInit(): void {

    }
    notificationService: NotificationService;

    constructor(notificationService: NotificationService) {
        this.stockUrlHelper = new StockUrlHelper();
        this.winInfoHelper = new WinInfoHelper();
        this.setWindowTitle();
        this.notificationService = notificationService;
    }

    setWindowTitle() {       
        var winType = this.winInfoHelper.getWindowType();
        if (winType == "Menu") {
            this.headerTitle = "Main Menu";
        }
        else if (winType == "Stock") {
            this.headerTitle = "Watchlist";
        }
        else if (winType == "Chart") {
            var windowInfoObj = this.winInfoHelper.getWindowInfoObj();
            this.headerTitle = windowInfoObj.Stock;
        }
    }

    closeWindow() {
        var winId = this.winInfoHelper.getWindowId();
        ipcRenderer.send('closewindow', winId);
    }

    minimizeWindow() {
        var winId = this.winInfoHelper.getWindowId();
        ipcRenderer.send('minimizewindow', winId);
    }

    getIntervalText(interval) {
        var intervalText = "";
        if (interval == "1") {
            intervalText = "1 Minute";

        }
        else if (interval == "5") {
            intervalText = "5 Minute";
        }
        else if (interval == "D") {
            intervalText = "Day";
        }

        return intervalText;
    }
}