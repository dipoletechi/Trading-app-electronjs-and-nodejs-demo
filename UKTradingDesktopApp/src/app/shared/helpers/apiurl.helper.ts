
export class APIUrlHelper {

  //Production api link 
  public static ApiEndPoint: string = "http://112.196.0.251:3000";
  //public static ApiEndPoint:string="http://localhost:3000";
  public static WatchlistApiEndPoint: string = APIUrlHelper.ApiEndPoint + "/api/watchlist";
  public static AutenticationApiEndPoint: string = APIUrlHelper.ApiEndPoint + "/api/auth";
}