module.exports = class ForbbidenException extends Error {
  constructor(message) {
    super(message);
  }
}