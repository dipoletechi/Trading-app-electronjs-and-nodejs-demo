export class StockModel {
    constructor(backgroundColor:string,textColor:string)
    {
        this.BackgroundColor=backgroundColor;
        this.TextColor=textColor;
    }

    public Symbol:string;
    public Price:string;
    public Percentage:string;
    public Name:string;
    public TextColor:string;
    public BackgroundColor:string;
    public IsDefault:string;

}