module.exports = class BridgeService {

    initializer(server) {
        server.use((_, res) => {
            return res.send('teste');
        });
        console.log('Bridge has started!');
    }

}