
export class StockUrlHelper {
  public CreateChartUrl(interval: string, stock: string): string {
    var chartUrl = "https://s.tradingview.com/widgetembed/?&autosize=true&symbol=" + stock + "&interval=" + interval + "&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=[]&hideideas=1&theme=Dark&style=1&timezone=Etc/UTC&studies_overrides={}&overrides={}&enabled_features=[]&disabled_features=[]&locale=en&utm_source=localhost&utm_medium=widget&utm_campaign=chart&utm_term=" + stock;
    return chartUrl;
  }

  public intevals = ["1", "5", "D"];
}