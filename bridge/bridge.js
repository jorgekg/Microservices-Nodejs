const BridgeService = require('./src/service/bridge.service')

module.exports = class Bridge {

    constructor(express) {
        (new BridgeService()).initializer(express);
    }

}
