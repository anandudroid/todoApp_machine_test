

import { IModel } from "./imodel";
 
interface ITokenData extends IModel {
    token: string;
    expiresIn: number;
  }
   
  export default ITokenData;