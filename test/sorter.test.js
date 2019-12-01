import { assert } from 'chai';
import { describe, it } from 'mocha';
import { Sorter } from '../src/models/Sorter';

describe('Class Sorter', () => {
  const testSorter = new Sorter();
  const gmailLine = 'kombat1996@gmail.com:30i12i03z';
  const mailruLine = 'vrednaya_svinka@mail.ru:343956';
  testSorter.addLine(gmailLine);
  testSorter.addLine(mailruLine);

  describe('Method checkExistDomain', () => {
    const makeTest = (value, expected) => {
      it(`accepts input ${value} and must return ${expected}`, () => {
        const actual = testSorter.checkExistDomain(value);
        assert.equal(expected, actual);
      });
    };

    const arranges = [
      { value: 'yandex.ru', expected: false },
      { value: 'gmail.com', expected: true },
      { value: 'mail.ru', expected: true },
      { value: 'rambler.ru', expected: false },
    ];

    arranges.forEach(arrange => {
      makeTest(arrange.value, arrange.expected);
    });
  });

  describe('Method isEmailPass', () => {
    const makeTest = (value, expected) => {
      it(`accepts input ${value} and must return ${expected}`, () => {
        const actual = testSorter.isEmailPass(value);
        assert.equal(expected, actual);
      });
    };

    const arranges = [
      { value: 'FFFke2@GMAIL.com:dawdaw', expected: true },
      { value: 'FFFke1@gmail.com:dawdaw', expected: true },
      { value: 'fake444@gmail.com:asdasdd', expected: true },
      { value: 'tas-tis6889@mail.ru:li868892s', expected: true },
      { value: 'tas-tis6889@mail.ru:li868892s', expected: true },
      { value: '8a-a@mail.ru:8a1286', expected: true },
      { value: 'mosenok@mail.ru:16354v', expected: true },
      { value: 'iiyttyyhjklhgyghhgg@mail.ru:1533355ddddd', expected: true },
      { value: 'LOVE.IVAN@mail.ru:ivan123', expected: true },
      { value: 'fake1@gmail.co', expected: false },
      { value: ':ivan123', expected: false },
      { value: 'ds7@gmail.com;asdasdd', expected: false },
      { value: 'rustam8926@mail.ru:', expected: false },
      { value: 'maksim-gladunmail.ru:mg200899', expected: false },
    ];

    arranges.forEach(arrange => {
      makeTest(arrange.value, arrange.expected);
    });
  });

  describe('Method normalizeLine', () => {
    const makeTest = (value, expected) => {
      it(`accepts input ${value} and must return normalized line`, () => {
        const actual = testSorter.normalizeLine(value);
        assert.deepEqual(expected, actual);
      });
    };

    const arranges = [
      {
        value: 'faddd1@gmail.com:asdasdd',
        expected: {
          domain: 'gmail.com',
          normalizedLine: 'faddd1@gmail.com:asdasdd',
        },
      },
      {
        value: 'valerijafomina1981@inbox.ru:4aHjbIhL66F5I',
        expected: {
          domain: 'inbox.ru',
          normalizedLine: 'valerijafomina1981@inbox.ru:4aHjbIhL66F5I',
        },
      },
      {
        value: 'AssKatov@mail.ru:vaNo2011',
        expected: {
          domain: 'mail.ru',
          normalizedLine: 'asskatov@mail.ru:vaNo2011',
        },
      },
      {
        value: 'rinat.rafisovich@BK.ru:hfabc789',
        expected: {
          domain: 'bk.ru',
          normalizedLine: 'rinat.rafisovich@bk.ru:hfabc789',
        },
      },
      {
        value: 'Alzhbeta.Belobusova79@mail.Ru:45M2DO5BS',
        expected: {
          domain: 'mail.ru',
          normalizedLine: 'alzhbeta.belobusova79@mail.ru:45M2DO5BS',
        },
      },
    ];

    arranges.forEach(arrange => {
      makeTest(arrange.value, arrange.expected);
    });
  });

  describe('Method getSortResult', () => {
    it('should return the result of sorting domains', () => {
      const actual = testSorter.getSortResult();
      const expected = {
        'gmail.com': ['kombat1996@gmail.com:30i12i03z'],
        'mail.ru': ['vrednaya_svinka@mail.ru:343956'],
      };
      assert.deepEqual(expected, actual);
    });
  });

  describe('Method addLine', () => {
    const makeTest = (value, expected) => {
      it(`should add a line ${value} to sort`, () => {
        testSorter.addLine(value);
        const actual = testSorter.getSortResult();
        assert.deepEqual(expected, actual);
      });
    };

    const arranges = [
      {
        value: 'faddd1@gmail.com:asdasdd',
        expected: {
          'gmail.com': [
            'kombat1996@gmail.com:30i12i03z',
            'faddd1@gmail.com:asdasdd',
          ],
          'mail.ru': ['vrednaya_svinka@mail.ru:343956'],
        },
      },
      {
        value: 'valerijafomina1981@inbox.ru:4aHjbIhL66F5I',
        expected: {
          'gmail.com': [
            'kombat1996@gmail.com:30i12i03z',
            'faddd1@gmail.com:asdasdd',
          ],
          'mail.ru': ['vrednaya_svinka@mail.ru:343956'],
          'inbox.ru': ['valerijafomina1981@inbox.ru:4aHjbIhL66F5I'],
        },
      },
      {
        value: 'AssKatov@mail.ru:vaNo2011',
        expected: {
          'gmail.com': [
            'kombat1996@gmail.com:30i12i03z',
            'faddd1@gmail.com:asdasdd',
          ],
          'mail.ru': [
            'vrednaya_svinka@mail.ru:343956',
            'asskatov@mail.ru:vaNo2011',
          ],
          'inbox.ru': ['valerijafomina1981@inbox.ru:4aHjbIhL66F5I'],
        },
      },
      {
        value: 'AssKatov@mail.ru:',
        expected: {
          'gmail.com': [
            'kombat1996@gmail.com:30i12i03z',
            'faddd1@gmail.com:asdasdd',
          ],
          'mail.ru': [
            'vrednaya_svinka@mail.ru:343956',
            'asskatov@mail.ru:vaNo2011',
          ],
          'inbox.ru': ['valerijafomina1981@inbox.ru:4aHjbIhL66F5I'],
        },
      },
      {
        value: ':OverDrivesd11',
        expected: {
          'gmail.com': [
            'kombat1996@gmail.com:30i12i03z',
            'faddd1@gmail.com:asdasdd',
          ],
          'mail.ru': [
            'vrednaya_svinka@mail.ru:343956',
            'asskatov@mail.ru:vaNo2011',
          ],
          'inbox.ru': ['valerijafomina1981@inbox.ru:4aHjbIhL66F5I'],
        },
      },
      {
        value: ':OverDrivesd11',
        expected: {
          'gmail.com': [
            'kombat1996@gmail.com:30i12i03z',
            'faddd1@gmail.com:asdasdd',
          ],
          'mail.ru': [
            'vrednaya_svinka@mail.ru:343956',
            'asskatov@mail.ru:vaNo2011',
          ],
          'inbox.ru': ['valerijafomina1981@inbox.ru:4aHjbIhL66F5I'],
        },
      },
      {
        value: 'zudavmail.ru:ghblehjr',
        expected: {
          'gmail.com': [
            'kombat1996@gmail.com:30i12i03z',
            'faddd1@gmail.com:asdasdd',
          ],
          'mail.ru': [
            'vrednaya_svinka@mail.ru:343956',
            'asskatov@mail.ru:vaNo2011',
          ],
          'inbox.ru': ['valerijafomina1981@inbox.ru:4aHjbIhL66F5I'],
        },
      },
    ];

    arranges.forEach(arrange => {
      makeTest(arrange.value, arrange.expected);
    });
  });
});
