export class ResponseModel{
    Data:string;
    Type:string;
    Message:string;
}
export enum ResponseType {
    Error = "Error",
    Success="Success",
    Warning="Warning"    
}