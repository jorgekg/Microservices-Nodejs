const ConflictException = require('./exceptions/conflict.exception');
const ForbbidenException = require('./exceptions/forbidden.exception');

module.exports = class CaptureError {

  map(err) {
    let code = 500;
    let message = '';
    if (err instanceof ConflictException) {
      code = 409;
      message = err.message;
    }
    if (err instanceof ForbbidenException) {
      code = 403;
      message = err.message;
    }
    if (err.original && err.original.code) {
      switch (err.original.code) {
        case 'ER_BAD_FIELD_ERROR':
        case 'ER_PARSE_ERROR':
        case 'ER_NO_DEFAULT_FOR_FIELD':
          code = 400;
          message = 'Algum campo não está correto! Verifique os parâmetros e tente novamente';
          break;
      }
    }
    return {
      code: code, message: {
        code: code,
        message: message
      }
    };
  }

}