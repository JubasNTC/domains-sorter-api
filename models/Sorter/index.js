const { EMAIL_PASS_REGEX, SEPARTOR, SYMBOL_AT } = require('./constants');

class Sorter {
  constructor() {
    this.sortResult = {};
  }

  getSortResult() {
    return this.sortResult;
  }

  addLine(_line) {
    if (this.isEmailPass(_line)) {
      const { domain, normalizedLine } = this.normalizeLine(_line);

      if (
        this.checkExistDomain(domain) &&
        !this.sortResult[domain].includes(normalizedLine)
      ) {
        this.sortResult[domain].push(normalizedLine);
      } else {
        this.sortResult[domain] = [normalizedLine];
      }
    }
  }

  normalizeLine(_line) {
    const [email, password] = _line.trim().split(SEPARTOR);
    const lowerEmail = email.toLowerCase();
    const [, domain] = lowerEmail.split(SYMBOL_AT);
    const normalizedLine = `${lowerEmail}:${password}`;

    return {
      domain,
      normalizedLine,
    };
  }

  checkExistDomain(_domain) {
    return _domain in this.sortResult;
  }

  isEmailPass(_line) {
    return _line.trim().match(EMAIL_PASS_REGEX);
  }
}

module.exports = Sorter;
