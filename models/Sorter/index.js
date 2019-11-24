const _ = require('lodash');
const { EMAIL_PASS_REGEXP, SEPARTOR_KEY, SYMBOL_AT } = require('./constants');

class Sorter {
  constructor(domainsList) {
    this.domains = [];
    this.sortResult = {};
    if (_.isArray(domainsList)) {
      this.tests = domainsList;
    }
  }

  sortDomains(_domains) {
    this.domains.forEach(line => {
      if (this.isEmailPass(line)) {
        const [email] = line.split(SEPARTOR_KEY);
        const domain = this.getDomain(email);
        if (this.isExistDomain(domain)) {
          this.sortResult[domain].push(line);
        } else {
          this.sortResult[domain] = [line];
        }
      }
    });
  }

  getSortResult() {
    return this.sortResult;
  }

  getDomain(_email) {
    const [, domain] = _email.split(SYMBOL_AT);
    return domain;
  }

  isEmailPass(_line) {
    return _line.match(EMAIL_PASS_REGEXP);
  }

  isExistDomain(domain) {
    // eslint-disable-next-line no-prototype-builtins
    return this.sortResult.hasOwnProperty(domain);
  }
}

module.exports = Sorter;
