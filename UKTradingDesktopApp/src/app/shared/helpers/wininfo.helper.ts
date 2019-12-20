import { remote } from 'electron';

export class WinInfoHelper {

  currentWindow: any;

  constructor() {
    this.currentWindow = remote.getCurrentWindow();
  }

  public getWindowInformation() {
    return JSON.parse(this.currentWindow.windowInformation);
  }

  public getWindowInfoObj() {
    var winInfoObj = JSON.parse(this.currentWindow.windowInformation);
    return winInfoObj.Info;
  }

  public getWindowType() {
    var winInfoObj = JSON.parse(this.currentWindow.windowInformation);
    return winInfoObj.Type;
  }

  public getWindowId() {
    var winInfoObj = JSON.parse(this.currentWindow.windowInformation);
    return winInfoObj.Id;
  }
}