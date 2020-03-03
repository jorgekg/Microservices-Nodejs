const CaptureError = require('./../../commons/capture-error');

module.exports = class Controller {

  constructor(express, service, endpoint) {
    this.express = express;
    this.service = service;
    this.endpoint = endpoint;
    this.captureError = new CaptureError();
    this.get();
    this.post();
    this.put();
    this.delete();
  }

  get() {
    this.express.get(this.endpoint, async (req, res) => {
      try {
        if (this.doGet) {
          await this.doGet(req, res);
        }
        res.send(await this.service.get(req.query));
      } catch (err) {
        const error = this.captureError.map(err);
        res.status(error.code).send(error.message);
      }
    })
  }

  post() {
    this.express.post(this.endpoint, async (req, res) => {
      try {
        if (this.doPost) {
          res.body = await this.doPost(req, res);
        }
        req.body.updatedBy = 'Sistema';
        res.send(await this.service.create(req.body));
      } catch (err) {
        const error = this.captureError.map(err);
        res.status(error.code).send(error.message);
      }
    })
  }

  put() {
    this.express.put(`${this.endpoint}/:id`, async (req, res) => {
      try {
        if (this.doPut) {
          await this.doPut(req, res);
        }
        res.send(await this.service.update(req.params.id, req.body));
      } catch (err) {
        const error = this.captureError.map(err);
        res.status(error.code).send(error.message);
      }
    });
  }

  delete() {
    this.express.delete(`${this.endpoint}/:id`, async (req, res) => {
      try {
        if (this.doDelete) {
          await this.doDelete(req, res);
        }
        res.send(await this.service.delete(req.params.id));
      } catch (err) {
        const error = this.captureError.map(err);
        res.status(error.code).send(error.message);
      }
    })
  }

}