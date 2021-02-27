export interface IResponse{
    statusCode: string;
    message: string;
    data?: any;
    uuid?:any;
    error?: any;
    token?:any;
}