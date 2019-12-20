
export class APIUrlHelper {

  //Production api link 
  public static ApiEndPoint: string = "http://159.65.19.158:3000";
  //public static ApiEndPoint:string="http://localhost:3000";
  public static WatchlistApiEndPoint: string = APIUrlHelper.ApiEndPoint + "/api/watchlist";
  public static AutenticationApiEndPoint: string = APIUrlHelper.ApiEndPoint + "/api/auth";
}