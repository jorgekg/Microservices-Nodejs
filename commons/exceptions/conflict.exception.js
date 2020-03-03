module.exports = class ConflictException extends Error {
  constructor(message) {
    super(message);
  }
}