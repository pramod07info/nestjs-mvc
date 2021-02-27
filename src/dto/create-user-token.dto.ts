export class CreateUsersTokenDto {
    private  _userId: string;
    private  _tokenData: string;
    private  _isActive: boolean;

    public get user_id() {
      return this._userId;
    }

    public set user_id(theUserId: string) {
        this._userId = theUserId;
    }

    public get token_data() {
      return this._tokenData;
    }

    public set token_data(theTokenData: string) {
        this._tokenData = theTokenData;
    }

    public get is_active() {
      return this._isActive;
    }

    public set is_active(theIsActive: boolean) {
        this._isActive = theIsActive;
    }

  }