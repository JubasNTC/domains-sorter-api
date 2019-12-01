import { EMAIL_PASS_REGEX, SEPARTOR, SYMBOL_AT } from './constants';

class Sorter {
  sortResult = {};

  getSortResult = () => this.sortResult;

  addLine = _line => {
    if (this.isEmailPass(_line)) {
      const { domain, normalizedLine } = this.normalizeLine(_line);
      if (this.checkExistDomain(domain)) {
        if (!this.sortResult[domain].includes(normalizedLine)) {
          this.sortResult[domain].push(normalizedLine);
        }
      } else {
        this.sortResult[domain] = [normalizedLine];
      }
    }
  };

  normalizeLine = _line => {
    const [email, password] = _line.trim().split(SEPARTOR);
    const lowerEmail = email.toLowerCase();
    const [, domain] = lowerEmail.split(SYMBOL_AT);
    const normalizedLine = `${lowerEmail}:${password}`;

    return {
      domain,
      normalizedLine,
    };
  };

  checkExistDomain = _domain => _domain in this.sortResult;

  isEmailPass = _line => !!_line.trim().match(EMAIL_PASS_REGEX);
}

export { Sorter };
