(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.AxonoLogic = api;
})(typeof globalThis !== 'undefined' ? globalThis : window, function () {
  'use strict';

  function finiteSeconds(value, fallback = 0) {
    const number = Number(value);
    return Number.isFinite(number) && number >= 0 ? number : fallback;
  }

  function timestamp(value) {
    if (!value) return null;
    const time = new Date(value).getTime();
    return Number.isFinite(time) ? time : null;
  }

  function elapsedSince(value, now = Date.now()) {
    const start = timestamp(value);
    if (start === null) return 0;
    return Math.max(0, Math.floor((now - start) / 1000));
  }

  function clockSnapshot(match, now = Date.now(), fallbackSeconds = 1200) {
    const startSeconds = finiteSeconds(match?.clock_seconds, fallbackSeconds);
    const startedAt = timestamp(match?.clock_started_at);
    if (!match?.clock_running || startedAt === null) {
      return { seconds: startSeconds, running: false, startedAt: null, startSeconds };
    }
    const elapsed = Math.max(0, Math.floor((now - startedAt) / 1000));
    const seconds = Math.max(0, startSeconds - elapsed);
    return { seconds, running: seconds > 0, startedAt, startSeconds };
  }

  function penaltiesAtSnapshot(penalties, match, now = Date.now()) {
    const clockStart = match?.clock_running ? timestamp(match.clock_started_at) : null;
    return (penalties || []).map((penalty) => {
      const mins = Number(penalty.mins) || 0;
      let remaining = penalty.remaining == null
        ? (mins > 0 ? mins * 60 : -1)
        : Number(penalty.remaining);
      if (!Number.isFinite(remaining)) remaining = mins > 0 ? mins * 60 : -1;
      let expired = Boolean(penalty.expired);

      if (!expired && remaining > 0 && clockStart !== null) {
        const createdAt = timestamp(penalty.created_at || penalty.createdAt);
        const anchor = createdAt === null ? clockStart : Math.max(clockStart, createdAt);
        const elapsed = Math.max(0, Math.floor((now - anchor) / 1000));
        remaining = Math.max(0, remaining - elapsed);
        if (remaining === 0) expired = true;
      }

      return { ...penalty, remaining, expired };
    });
  }

  return { finiteSeconds, timestamp, elapsedSince, clockSnapshot, penaltiesAtSnapshot };
});
