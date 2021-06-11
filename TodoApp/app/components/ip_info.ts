
 
export class IPInfo {

    'use strict'; 

    public static getIPAddress() {

        var os = require('os');
        var ifaces = os.networkInterfaces();
        let v = "";
        Object.keys(ifaces).forEach(function (ifname) {
            var alias = 0;

            ifaces[ifname].forEach(function (iface) {
                if ('IPv4' !== iface.family || iface.internal !== false) {
                    // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                    return ;
                }

                if (alias >= 1) { 
                    // v = v + ifname + ':' + alias, iface.address;
                    // console.log("IPInfo -1 : " + v);
                    v = iface.address;
                } else { 
                    // v = v + ifname + ':' + alias, iface.address;
                    // console.log("IPInfo -2 : " + ifname + ':' + alias, iface.address);
                    v = iface.address;
                }
                ++alias;
            });
        });
        return v;
    }
}