import * as express from 'express';
import * as mongoose from 'mongoose';
import DatabaseConfig from './config/database';
import AppMiddleware from './middlewares/app_middleware';
import { AppCallBack } from './app.callback';
import AppRoutes from './router/app.router';
import { ILogger } from './ilogger';



class App {

    private static appCallBack: AppCallBack;

    private static server: express.Application = express();

    constructor(public dbConfig: DatabaseConfig,
        public middleware: AppMiddleware, public routes: AppRoutes, appCallBack: AppCallBack) {

        App.appCallBack = appCallBack;
        this.middleware.forward(App.server);
        this.routes.forward(App.server); 
    }

    private _connectMongoDB() :Promise<void> {

        return new Promise((resolve, reject) => {
 
            try { 
                if (this.dbConfig == undefined || this.dbConfig == null) { 
                
                    resolve();
                    return;
                }
    
                let path = this.dbConfig.dpPath;
                let callBack = App.appCallBack;
         
                callBack.connectingDataBase(path, App.server);
        
                let options = {
                    useNewUrlParser: true,
                    socketTimeoutMS: 0,
                    keepAlive: true,
                    reconnectTries: 30
                }
         
                mongoose.connect('' + path, options).then(() => {
        
                    callBack.didConnectDataBase(path, App.server); 
                    resolve();
                }).catch(err => {
        
                    callBack.failedToConnectDataBase(err, path, App.server);
                    reject(err); 
                });
            } catch (error) {
                reject(error); 
            }
         }); 
    }

    public start(port: number) {

        let callBack = App.appCallBack;
        callBack.willStartedServerAtPort(port, App.server); 
         
        setTimeout(() => {
 
            process.on('uncaughtException', function (err) {

                try {

                    ILogger.log('uncaughtException', JSON.stringify(err));
                } catch (error) {
                    ILogger.log('uncaughtException', error);
                }

                App.appCallBack.didReceiveServerError("uncaughtException", err, App.server);
            });

            process.on('SIGINT', function () {

                App.appCallBack.didReceiveServerError("SIGINT", "SIGINT", App.server);
            });

            App.server.listen(port, () => {

                this._connectMongoDB().then(result => {
                    
                    callBack.didStartedServerAtPort(port, App.server);
                }).catch(e => {
                    App.appCallBack.didReceiveServerError(e, e, App.server);
                });
            });  

        }, 6000);

    }
} 

export default App; 