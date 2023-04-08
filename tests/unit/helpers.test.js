const { getLicenseValidity, transformArryToString } = require('../../src/helpers/utils');

const it = require('ava').default;

const sinon = require('sinon');

it('transformArryToString returns a string joined with delimiter', t => {
    const array = ['my', 'funny', 'bone'];
    const delimiter = ',';
    const result = transformArryToString(delimiter, array);
    t.is(result, 'my,funny,bone');
});


it('transformArryToString throws an error for invalid delimiter', t => {
    const array = ['my', 'funny', 'bone'];
    const delimiter = ';';
    const error = t.throws(() => {
        transformArryToString(delimiter, array);
    }, { instanceOf: Error });
    t.is(error.message, 'invalid delimeter');
});

it('transformArryToString returns an empty string for empty array', t => {
    const array = [];
    const delimiter = ',';
    const result = transformArryToString(delimiter, array);
    t.is(result, '');
});

it('transformArryToString returns undefined for non-array input', t => {
    const array = 'my,funny,bone';
    const delimiter = ',';
    const result = transformArryToString(delimiter, array);
    t.is(result, undefined);
});

// hint useFakeTimer
// it("getLicenseValidity", () => {
//     getLicenseValidity()
// })

test('getLicenseValidity should pass when called with current year', (t) => {
  const currentDate = new Date('2023-04-08');
  const clock = sinon.useFakeTimers(currentDate.getTime());
  const result = getLicenseValidity();
  t.is(result, 'valid');
  clock.restore();
});

test('getLicenseValidity should pass when called with future year', (t) => {
  const currentDate = new Date('2025-04-08');
  const clock = sinon.useFakeTimers(currentDate.getTime());
  const result = getLicenseValidity();
  t.is(result, 'valid');
  clock.restore();
});

test('getLicenseValidity should give invalid when called with year 2026', (t) => {
  const currentDate = new Date('2026-01-01');
  const clock = sinon.useFakeTimers(currentDate.getTime());
  const result = getLicenseValidity();
  t.is(result, 'invalid');
  clock.restore();
});

test('getLicenseValidity should be valid when called with past year', (t) => {
  const currentDate = new Date('2022-04-08');
  const clock = sinon.useFakeTimers(currentDate.getTime());
  const result = getLicenseValidity();
  t.is(result, 'valid');
  clock.restore();
});

test('getLicenseValidity should give invalid when called with invalid date', (t) => {
  const currentDate = new Date('invalid date');
  const clock = sinon.useFakeTimers(currentDate.getTime());
  const error = t.throws(() => {
    getLicenseValidity();
  });
  t.is(error.message, 'Invalid Date');
  clock.restore();
});