import { ILogger } from '../ilogger';

class DatabaseConfig {

    public dpPath: String; // 
    public scheme: String; //mongodb://
    public domain: String; //localhost
    public dbName: String; // dbname
    public userName: String; // userName
    public password: String; // password
    public port: String;

    constructor(scheme: String, domain: String, port: String, dbName: String, userName: String, password: String) {

        if (scheme == null || scheme === "") {
            this.scheme = '';
        } else {
            this.scheme = scheme + '://';
        }
        if (userName == null || userName === "") {
            this.userName = ''
        } else {
            this.userName = userName + ':';
        }
        if (password == null || password === "") {
            this.password = ''
        } else {
            this.password = password + '@';
        }
        if (domain == null || domain === "") {
            this.domain = ''
        } else {
            this.domain = domain;
        }
        if (dbName == null || dbName === "") {
            this.dbName = '/';
        } else {
            this.dbName = '/' + dbName;
        }
        if (port == null || port === "" || port == "_") {
            this.port = '';
        } else {
            this.port = ':' + port;
        }


        this.dpPath = '' + this.scheme + this.userName + this.password + this.domain + this.port + this.dbName;
    }

    public static buildFromEnv(): DatabaseConfig {
  
        let scheme: String = process.env['MONGO_SCHEME'];  
        let domain: String = process.env['MONGO_DOMAIN']; 
        let dbName: String = process.env['MONGO_DBNAME']; 
        let userName: String = process.env['MONGO_USERNAME'];  
        let password: String = process.env['MONGO_PASSWORD'];  
        let port: String = process.env['MONGO_PORT'];

        ILogger.log('scheme', scheme);
        ILogger.log('domain', domain);
        ILogger.log('dbName', dbName);
        ILogger.log('userName', userName);
        ILogger.log('password', password);
        ILogger.log('port', port);

        if (scheme == null || scheme == undefined || scheme == ''  || scheme == ' ' || scheme == '-') return null;
        if (domain == null || domain == undefined || domain == '' || domain == ' ' || domain == '-') return null;
        if (dbName == null || dbName == undefined || dbName == '' || dbName == ' ' || dbName == '-') return null;
        if (userName == null || userName == undefined || userName == '' || userName == ' ' || userName == '-') { userName = '';  }  
        if (password == null || password == undefined || password == '' || password == ' ' || password == '-') { password = '';  }  
        if (port == null || port == undefined || port == '' || port == ' ' || port == '-') { port = '';  } 

        const dbConfig = new DatabaseConfig(
            scheme, 
            domain,
            port,
            dbName,
            userName,
            password
            );

        return dbConfig;
    } 
}

export default DatabaseConfig;
