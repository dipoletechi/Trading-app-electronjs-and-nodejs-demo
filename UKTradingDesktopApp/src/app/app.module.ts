import {BrowserModule, DomSanitizer} from '@angular/platform-browser'
import { Pipe, PipeTransform, Component, NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToasterModule} from 'angular2-toaster';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { TitleHeaderComponent } from './titleheader/titleheader.component';
import { MenuComponent } from './menu/menu.component';
import { StockComponent } from './stock/stock.component';
import { SplashComponent } from './splash/splash.component';
import { ChartsComponent } from './charts/charts.component';
import { AnyChartComponent } from './anychart/anychart.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import {StockService} from './stock/shared/stock.service';
import {ClockService} from './menu/shared/clock.service';
import {NotificationService} from './shared/service/notification.service'
import {AuthenticationService} from './authentication/shared/services/authentication.service';
import {  
  MatAutocompleteModule,  
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,  
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
  MatInputModule  
} from '@angular/material';

import {HttpModule} from '@angular/http';

@NgModule({
  exports: [        
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,    
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    MatInputModule
  ]
})
export class MaterialModule {}


@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@NgModule({
  declarations: [
    AppComponent,    
    SafePipe,
    MenuComponent,
    StockComponent,
    SplashComponent,
    TitleHeaderComponent,
    ChartsComponent ,
    AuthenticationComponent,
    AnyChartComponent    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,    
    MaterialModule,
    BrowserAnimationsModule,
    ToasterModule,
    CommonModule        
  ],
  providers: [StockService,NotificationService,AuthenticationService,ClockService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}