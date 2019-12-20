import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable()
export class ClockService {

    private newYorkClock: Observable<Date>;
    private londonClock:Observable<Date>;

    
    constructor() {
       
        this.newYorkClock = Observable.interval(1000).map(tick => {
            return this.getUtcTime(300);
        }).share();

        this.londonClock = Observable.interval(1000).map(tick => {
            return this.getUtcTime(0);
        }).share();
    }

    getNewYorkClock(): Observable<Date> {
        return this.newYorkClock;
    }

    getLondonClock(): Observable<Date> {
        return this.londonClock;
    }

    private getUtcTime(offset)
    {
        var now = new Date();
        var millis = now.getTime() + (now.getTimezoneOffset() * 60000);
        var nowUtc = new Date(millis);
        var now = new Date();         
        var millis = now.getTime() + (now.getTimezoneOffset() * 60000);
        var nowUtc = new Date(millis);
        var newTimeMilis = nowUtc.getTime() - (offset * 60000);
        var newTime = new Date(newTimeMilis);

        return newTime;
    }
}