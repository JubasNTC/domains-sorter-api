const _ = require('lodash');
const { EMAIL_PASS_REGEXP, SEPARTOR_KEY, SYMBOL_AT } = require('./constants');

class Sorter {
  constructor(domainsList) {
    this.domains = [];
    this.sortResult = {};
    if (_.isArray(domainsList)) {
      this.domains = domainsList;
    }
  }

  sortDomains() {
    const length = this.domains.length;
    for (let i = 0; i < length; i++) {
      if (this.isEmailPass(this.domains[i])) {
        const email = this.domains[i].split(SEPARTOR_KEY)[0];
        const domain = this.getDomain(email);
        if (this.isExistDomain(domain)) {
          this.sortResult[domain].push(this.domains[i]);
        } else {
          this.sortResult[domain] = [this.domains[i]];
        }
      }
    }
  }

  getSortResult() {
    return this.sortResult;
  }

  getDomain(_email) {
    return _email.split(SYMBOL_AT)[1];
  }

  setDomains(_domains) {
    this.domains = _domains;
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
