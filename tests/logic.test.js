'use strict';

const assert = require('node:assert/strict');
const { clockSnapshot, penaltiesAtSnapshot } = require('../axono-logic.js');

const now = Date.parse('2026-09-10T20:00:30.000Z');

assert.deepEqual(
  clockSnapshot({ clock_seconds: 1200, clock_running: true, clock_started_at: '2026-09-10T20:00:00.000Z' }, now),
  { seconds: 1170, running: true, startedAt: Date.parse('2026-09-10T20:00:00.000Z'), startSeconds: 1200 }
);

assert.equal(clockSnapshot({ clock_seconds: 0, clock_running: false }, now).seconds, 0);
assert.equal(clockSnapshot({ clock_seconds: 10, clock_running: true, clock_started_at: '2026-09-10T19:59:00.000Z' }, now).running, false);
assert.equal(clockSnapshot({ clock_seconds: 1200, clock_running: true, clock_started_at: '2026-09-10T20:01:00.000Z' }, now).seconds, 1200);

const resumed = penaltiesAtSnapshot([
  { id: 'old', mins: 2, remaining: 90, expired: false, created_at: '2026-09-10T19:50:00.000Z' },
  { id: 'new', mins: 2, remaining: 120, expired: false, created_at: '2026-09-10T20:00:20.000Z' },
  { id: 'game', mins: 0, remaining: -1, expired: false }
], { clock_running: true, clock_started_at: '2026-09-10T20:00:00.000Z' }, now);

assert.equal(resumed[0].remaining, 60, 'existing penalty continues from the clock restart');
assert.equal(resumed[1].remaining, 110, 'new penalty counts only from its creation');
assert.equal(resumed[2].remaining, -1, 'game misconduct does not count down');

const expired = penaltiesAtSnapshot([
  { mins: 2, remaining: 5, expired: false, created_at: '2026-09-10T19:00:00.000Z' }
], { clock_running: true, clock_started_at: '2026-09-10T20:00:00.000Z' }, now)[0];
assert.equal(expired.remaining, 0);
assert.equal(expired.expired, true);

const paused = penaltiesAtSnapshot([
  { mins: 2, remaining: 75, expired: false }
], { clock_running: false, clock_started_at: null }, now)[0];
assert.equal(paused.remaining, 75, 'paused clock preserves the stored penalty time');

console.log('AXONO logic scenarios passed');
