class Net {
    constructor(manager) {
        this.express = require('express');
        this.app = this.express();
        this.http = require('http').Server(this.app);
        this.webSocketServer = require('ws').Server;
        this.wss = new this.webSocketServer({ port: 8881 });
        this.app.use(this.express.static('public/bin'));

        this.manager = manager;

        this.broadcast = function broadcast(data) {
            this.manager.players.forEach(function each(player) {
                player.client.send(data);
            });
        };

        this.wss.on('connection', function (ws, req) {
            this.manager.addPlayer(req.connection.remoteAddress + req.connection.remotePort, ws);

            ws.on('message', function (msg) {
                console.log('Connect' + req.connection.remoteAddress + ":" + req.connection.remotePort);
                //this.sendBettingOver(this.manager.getPlayer(req.connection.remoteAddress + req.connection.remotePort).client);

            }.bind(this));


            ws.on('close', function () {
                console.log('Close' + req.connection.remoteAddress + ":" + req.connection.remotePort);
                this.manager.removePlayer(req.connection.remoteAddress + req.connection.remotePort);
            }.bind(this));

        }.bind(this));


        this.http.listen(80, function () {
            console.log('listening on *:80');
        });
    }


}
function getJson(type, data) {
    let j = {};
    j.ContentType = type;
    j.Data = data;
    return JSON.stringify(j);
}
module.exports = Net;