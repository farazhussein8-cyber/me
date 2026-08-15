/* ==========================================================================
   Opening hours — live "Open Now" / "Closed Now" badge (NZ local time)
   ========================================================================== */
(() => {
  const badge = document.getElementById('hoursStatus');
  if (!badge) return;

  // Minutes-from-midnight ranges per weekday (0 = Sunday ... 6 = Saturday).
  const HOURS = {
    0: [[11 * 60 + 30, 19 * 60 + 30]],
    1: [],
    2: [[11 * 60, 19 * 60 + 30]],
    3: [[11 * 60, 19 * 60 + 30]],
    4: [[11 * 60, 21 * 60 + 30]],
    5: [[11 * 60, 12 * 60 + 30], [13 * 60 + 30, 21 * 60 + 30]],
    6: [[11 * 60 + 30, 21 * 60 + 30]],
  };
  const WEEKDAY_INDEX = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

  function getNZNow() {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Pacific/Auckland',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).formatToParts(new Date());

    const map = {};
    parts.forEach((p) => { map[p.type] = p.value; });

    let hour = parseInt(map.hour, 10);
    if (hour === 24) hour = 0;
    const minute = parseInt(map.minute, 10);

    return { day: WEEKDAY_INDEX[map.weekday], minutes: hour * 60 + minute };
  }

  function updateBadge() {
    const { day, minutes } = getNZNow();
    const ranges = HOURS[day] || [];
    const isOpen = ranges.some(([start, end]) => minutes >= start && minutes < end);

    badge.textContent = isOpen ? 'Open Now' : 'Closed Now';
    badge.classList.toggle('hours-status-open', isOpen);
    badge.classList.toggle('hours-status-closed', !isOpen);
    badge.hidden = false;
  }

  updateBadge();
  setInterval(updateBadge, 60 * 1000);
})();
