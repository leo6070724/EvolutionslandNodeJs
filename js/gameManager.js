var HashMap = require('hashmap');
var Net = require('./net.js');
var Player = require('./player.js');
class GameManager {

    constructor()
    {
        this.net = new Net(this);
        this.players = new HashMap();
        this.records = new HashMap();
    }

    addPlayer(id,ws) { this.players.set(id,new Player(ws)); }
    removePlayer(id,ws) { this.players.delete(id); }   
    getPlayer(id){return this.players.get(id)}
}


GameManager.instance = null;
GameManager.getInstance = function(){
    if(this.instance === null){
        this.instance = new GameManager();
    }
    return this.instance;
}

module.exports = { gameManager:GameManager,instance:GameManager.getInstance() };