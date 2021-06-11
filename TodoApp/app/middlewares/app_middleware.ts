
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { LogMiddleware } from './log_middleware';
import * as helmet from 'helmet';
import * as cors from 'cors';


class AppMiddleware {

  constructor() {
  }

  public forward(app: express.Application): void {

    app.use(cors());
    app.use(helmet());
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(new LogMiddleware().exe)
  }

}

export default AppMiddleware;