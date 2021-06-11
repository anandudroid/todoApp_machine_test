
import App from './app'
import DatabaseConfig from './config/database'; 
import AppMiddleware from './middlewares/app_middleware';
import AppRoutes from './router/app.router';
import { AppCallBack } from './app.callback';
import { ILogger } from './ilogger';
 
ILogger.log("initializing..", "");

process.title = "TodoApp";

let port = 3001;

const dbConfig = new DatabaseConfig("mongodb", "localhost", "", "todo_app_db", "", "" ); 
 
const app: App = new App(dbConfig, new AppMiddleware(), new AppRoutes(), new AppCallBack());
app.start(port);

 export default app;