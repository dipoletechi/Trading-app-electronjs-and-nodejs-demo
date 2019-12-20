export class MenuItem {
    Id: string;
    Title: string; 
    ImageUrl:string;
    IsSelected:boolean;
    SubMenu:Array<SubMenuItemFirstLevel>;   
    constructor(Id:string)
    {
        this.ImageUrl="./assets/menuimages/"+Id+"-"+"white.png";
        this.IsSelected=false;
    }
}

export class SubMenuItemFirstLevel{
    Id:string;
    Title:string;   
    ImageUrl:string;
    IsSelected:boolean;
    SubMenuLevel:string;
    constructor(Id:string)
    {
        this.IsSelected=false;
        this.ImageUrl="./assets/menuimages/"+Id+"-"+"white.png";
        this.SubMenuLevel="1";
    }
}


export enum   MenuIdentification{
New="new",
Chart="chart",
AnyChart="anychart",
Scanner="scanner",
Watchlist="watchlist",
Timensale="timensale",
Depthofmarket="depthofmarket",
News="news",
Lists="lists",
Subwatchlist="subwatchlist",
Topgainers="topgainers",
Toplosers="toplosers",
Tools="tools",
Comingsoon="comingsoon",
Layout="layout",
Load="load",
Options="options",
Support="support",
Logasupporticket="logasupporticket",
Logout="logout"
}
export class MenuHelper {

    public menuItems: Array<MenuItem>;
    
    constructor() {
        this.menuItems=new Array<MenuItem>();
    
    /************New Menu Item section***********************/  
    var Id=MenuIdentification.New;  
    var menuItem=new MenuItem(Id);    
    menuItem.Id=Id;
    menuItem.Title="New";
    menuItem.SubMenu=new Array<SubMenuItemFirstLevel>();
    
    Id=MenuIdentification.Chart;
    var subMenuItemFirstLevel=new SubMenuItemFirstLevel(Id);
    subMenuItemFirstLevel.Id=Id;
    subMenuItemFirstLevel.Title="Chart";
    menuItem.SubMenu.push(subMenuItemFirstLevel);

    Id=MenuIdentification.Scanner  ;
    subMenuItemFirstLevel=new SubMenuItemFirstLevel(Id);
    subMenuItemFirstLevel.Id=Id;
    subMenuItemFirstLevel.Title="Scanner";
    menuItem.SubMenu.push(subMenuItemFirstLevel);


    Id=MenuIdentification.AnyChart  ;
    subMenuItemFirstLevel=new SubMenuItemFirstLevel(Id);
    subMenuItemFirstLevel.Id=Id;
    subMenuItemFirstLevel.Title="AnyChart";
    menuItem.SubMenu.push(subMenuItemFirstLevel);

    Id=MenuIdentification.Watchlist  ;
    subMenuItemFirstLevel=new SubMenuItemFirstLevel(Id);
    subMenuItemFirstLevel.Id=Id;
    subMenuItemFirstLevel.Title="Watchlist";
    menuItem.SubMenu.push(subMenuItemFirstLevel);

    Id=MenuIdentification.Timensale  ;
    subMenuItemFirstLevel=new SubMenuItemFirstLevel(Id);
    subMenuItemFirstLevel.Id=Id;
    subMenuItemFirstLevel.Title="Time & Sales";
    menuItem.SubMenu.push(subMenuItemFirstLevel);

    Id=MenuIdentification.Depthofmarket  ;
    subMenuItemFirstLevel=new SubMenuItemFirstLevel(Id);
    subMenuItemFirstLevel.Id=Id;
    subMenuItemFirstLevel.Title="Depth Of Market";
    menuItem.SubMenu.push(subMenuItemFirstLevel);

    Id=MenuIdentification.News  ;
    subMenuItemFirstLevel=new SubMenuItemFirstLevel(Id);
    subMenuItemFirstLevel.Id=Id;
    subMenuItemFirstLevel.Title="News";
    menuItem.SubMenu.push(subMenuItemFirstLevel);

    this.menuItems.push(menuItem);
    /************New Menu Item section closed***********************/  


    
    /************List Menu Item section***********************/    
    Id=MenuIdentification.Lists;  
    menuItem=new MenuItem(Id);    
    menuItem.Id=Id;
    menuItem.Title="Lists";
    menuItem.SubMenu=new Array<SubMenuItemFirstLevel>();
    

    Id=MenuIdentification.Subwatchlist  ;
    subMenuItemFirstLevel=new SubMenuItemFirstLevel(Id);
    subMenuItemFirstLevel.Id=Id;   
    subMenuItemFirstLevel.Title="Watchlist";
    menuItem.SubMenu.push(subMenuItemFirstLevel);

    Id=MenuIdentification.Topgainers  ;
    subMenuItemFirstLevel=new SubMenuItemFirstLevel(Id);
    subMenuItemFirstLevel.Id=Id;
    subMenuItemFirstLevel.Title="Top Gainers";
    menuItem.SubMenu.push(subMenuItemFirstLevel);


    Id=MenuIdentification.Toplosers;
    subMenuItemFirstLevel=new SubMenuItemFirstLevel(Id);
    subMenuItemFirstLevel.Id=Id;
    subMenuItemFirstLevel.Title="Top Losers";
    menuItem.SubMenu.push(subMenuItemFirstLevel);

    this.menuItems.push(menuItem);
    /************List Menu Item section closed***********************/  


      /************Tools Menu Item section***********************/    
      Id=MenuIdentification.Tools;  
      menuItem=new MenuItem(Id);    
      menuItem.Id="tools";
      menuItem.Title="Tools";
      menuItem.SubMenu=new Array<SubMenuItemFirstLevel>();
      
  
      Id=MenuIdentification.Comingsoon;
      subMenuItemFirstLevel=new SubMenuItemFirstLevel(Id);
      subMenuItemFirstLevel.Id=Id;
      subMenuItemFirstLevel.Title="Coming Soon..";
      menuItem.SubMenu.push(subMenuItemFirstLevel);
  
      this.menuItems.push(menuItem);
      /************tools Menu Item section closed***********************/  


      
      /************Layout Menu Item section***********************/    
      Id=MenuIdentification.Layout;  
      menuItem=new MenuItem(Id); 
      menuItem.Id="layout";
      menuItem.Title="Layout";
      menuItem.SubMenu=new Array<SubMenuItemFirstLevel>();
      
      Id=MenuIdentification.Load;
      subMenuItemFirstLevel=new SubMenuItemFirstLevel(Id);
      subMenuItemFirstLevel.Id=Id;
      subMenuItemFirstLevel.Title="Load";
      menuItem.SubMenu.push(subMenuItemFirstLevel);
  
      this.menuItems.push(menuItem);
      /************tools Menu Item section closed***********************/  



      
      /************Options Menu Item section***********************/    
      Id=MenuIdentification.Options;  
      menuItem=new MenuItem(Id); 
      menuItem.Id="options";
      menuItem.Title="Options";
      menuItem.SubMenu=new Array<SubMenuItemFirstLevel>();
      
      Id=MenuIdentification.Comingsoon;
      subMenuItemFirstLevel=new SubMenuItemFirstLevel(Id);
      subMenuItemFirstLevel.Id=Id;
      subMenuItemFirstLevel.Title="Coming Soon..";
      menuItem.SubMenu.push(subMenuItemFirstLevel);
  
      this.menuItems.push(menuItem);
      /************options Menu Item section closed***********************/  


      
      
      /************Support Menu Item section***********************/    
      Id=MenuIdentification.Support;  
      menuItem=new MenuItem(Id); 
      menuItem.Id=Id;
      menuItem.Title="Support";
      menuItem.SubMenu=new Array<SubMenuItemFirstLevel>();
      
  
      Id=MenuIdentification.Logasupporticket;
      subMenuItemFirstLevel=new SubMenuItemFirstLevel(Id);
      subMenuItemFirstLevel.Id=Id;
      subMenuItemFirstLevel.Title="Log a support ticket";
      menuItem.SubMenu.push(subMenuItemFirstLevel);
  
      this.menuItems.push(menuItem);
      /************Support Menu Item section closed***********************/ 


      /************Logout menu item***********************/    
      Id=MenuIdentification.Logout;  
      menuItem=new MenuItem(Id); 
      menuItem.Id=Id;
      menuItem.Title="Logout";
      menuItem.SubMenu=new Array<SubMenuItemFirstLevel>();          
  
      this.menuItems.push(menuItem);
      /************Support Menu Item section closed***********************/ 

   

    }
}