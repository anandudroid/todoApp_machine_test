
export class TestedOK {
  
    status = "OK"; 

    public static create(object :Object) :TestedOK {

        let obj = new TestedOK()
        let status = 'NOK'

        try {
            
            status = object['status'] 
        } catch (error) {
            status = 'NOK'
        }

        obj.status = status; 
        return obj; 
    }
}