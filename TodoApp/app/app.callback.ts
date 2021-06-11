

import * as express from 'express';
import { IPInfo } from "./components/ip_info";
import { ILogger } from './ilogger';
import { EndRoutes } from './router/end.router';


export class AppCallBack {

    public willStartedServerAtPort(port: Number, app: express.Application) {

        let ip = IPInfo.getIPAddress();
        let path = ip + ":" + port;

        ILogger.log("=========================== <= *", "===========================");
        ILogger.log("startingServer...", path);

    }

    public didStartedServerAtPort(port: Number, app: express.Application) {

        let ip = IPInfo.getIPAddress();
        let path = ip + ":" + port;

        ILogger.log("ServerStarted", path);
        ILogger.log("=========================== <= *", "===========================");

        ILogger.log('ServiceRegistery...', "Registering..");

        app.use("*", new EndRoutes(app).router); 
    }  

    public didReceiveServerError(reason: string, error: any, app: express.Application) {

        ILogger.log("ServerError", reason + ", " + error);
        ILogger.log("=========================== <= *", "===========================");

        AppCallBack._exit();
    }

    public connectingDataBase(path: String, app: express.Application) {

        // ILogger.log("**********************", "**********************"); 
        ILogger.log("connecting database ", path);
    }

    public didConnectDataBase(path: String, app: express.Application) {

        ILogger.log("Successfully connected database", path);
        //  ILogger.log("**********************", "**********************"); 
    }

    public failedToConnectDataBase(error: any, path: String, app: express.Application) {

        try {

            ILogger.log("Failed to connect the database", path + ", error => " + JSON.stringify(error));
        } catch (error) {
            ILogger.log("Failed to connect the database", path + ", error => " + error);
        }

        // ILogger.log("**********************", "**********************");  

        AppCallBack._exit();
    }

    private static _exit() {

            process.exit(1);
    }
}

