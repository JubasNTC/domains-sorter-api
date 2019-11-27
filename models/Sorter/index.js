const { EMAIL_PASS_REGEX, SEPARTOR_KEY, SYMBOL_AT } = require('./constants');

class Sorter {
  constructor() {
    this.sortResult = {};
  }

  getSortResult() {
    return this.sortResult;
  }

  getDomain(_email) {
    return _email.split(SYMBOL_AT)[1];
  }

  addLine(_line) {
    if (this.isEmailPass(_line)) {
      const email = _line.split(SEPARTOR_KEY)[0];
      const domain = this.getDomain(email);
      if (this.isExistDomain(domain)) {
        this.sortResult[domain].push(_line);
      } else {
        this.sortResult[domain] = [_line];
      }
    }
  }

  isEmailPass(_line) {
    return _line.match(EMAIL_PASS_REGEX);
  }

  isExistDomain(domain) {
    // eslint-disable-next-line no-prototype-builtins
    return this.sortResult.hasOwnProperty(domain);
  }
}

module.exports = Sorter;
