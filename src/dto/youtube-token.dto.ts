export class YoutubbeTokenDto{
    private _access_token:string;
    private _scope:string;
    private _token_type:string;
    private _id_token:string;

    get getAccessToken(){
        return this._access_token;
    }
    set setAccessToken(access_token:string){
        this._access_token=access_token;
    }

    get getScope(){
        return this._scope;
    }
    set setScope(scope:string){
        this._scope=scope;
    }

    get get_token_type(){
        return this._token_type;
    }
    set setTokenType(tokenType:string){
        this._token_type=tokenType;
    }

    get get_id_token(){
        return this._id_token;
    }
    set setIdToken(idToken:string){
        this._id_token=idToken;
    }

}