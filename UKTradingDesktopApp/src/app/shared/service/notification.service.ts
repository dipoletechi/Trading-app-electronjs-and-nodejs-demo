import { Injectable } from '@angular/core';
import {ToasterContainerComponent, ToasterService, ToasterConfig} from 'angular2-toaster';
 
@Injectable()
export class NotificationService {   
    private toasterService: ToasterService;
     
    constructor(toasterService: ToasterService) {  
        this.toasterService = toasterService;          
    } 
    
    public toasterconfig : ToasterConfig = 
    new ToasterConfig({
        showCloseButton: true, 
        // tapToDismiss: true, 
        timeout:50000000,
        mouseoverTimerStop:true,
        limit:1,
        animation:'fade',
        newestOnTop:true
    });

    notify(type:string,title:string,body:string)
    {
        this.toasterService.pop(type, title, body);
    }
}   