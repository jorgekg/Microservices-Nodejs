module.exports = class Service {

  constructor(model) {
    this.model = model;
  }

  retreave(id) {
    return new Promise((resolve, reject) => {
      this.model.findByPk(id)
        .then(data => resolve(data))
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  }

  get(params) {
    const size = params.size ? parseInt(params.size) : 100;
    const offset = params.offset ? parseInt(params.offset) - 1 : 0;
    delete params.size;
    delete params.offset;
    return new Promise((resolve, reject) => {
      this.model.findAndCountAll({
        where: params,
        offset: offset,
        limit: size
      })
        .then(data => resolve(data))
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  }

  async create(body) {
    if (this.doCreate) {
      body = await this.doCreate(body);
    }
    return new Promise((resolve, reject) => {
      this.model.create(body)
        .then(data => resolve(data))
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  }

  async update(id, body) {
    if (this.doUpdate) {
      body = await this.doUpdate(body);
    }
    return new Promise(async (resolve, reject) => {
      const item = await this.retreave(id);
      if (item) {
        item.update(body)
          .then(data => resolve(data))
          .catch(err => {
            console.log(err);
            reject(err);
          });
      }
    });
  }

  delete(id) {
    return new Promise(async (resolve, reject) => {
      const item = await this.retreave(id);
      if (item) {
        item.destroy()
          .then(data => resolve(data))
          .catch(err => {
            console.log(err);
            reject(err);
          });
      }
    });
  }

}