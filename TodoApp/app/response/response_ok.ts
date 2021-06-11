export class IResponseOK {

    public ststusCode :200;
    public message :string = null;

    constructor(message :string = 'OK') { 

        this.message = message;
    }  
}