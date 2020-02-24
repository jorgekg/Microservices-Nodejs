module.exports = class RegisterController {

  constructor(server) {
    server.get('/register', (req, res) => {
      res.send('registered');
    });
  }

}