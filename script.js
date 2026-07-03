document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const terminalLine = document.getElementById('terminal-line');
  const terminalStatus = document.getElementById('terminal-status');

  if (!terminalLine || !terminalStatus) return;

  const sequence = [
    ['reviewing backend project...', 'Keep API behavior predictable.'],
    ['checking Hono route behavior...', 'Return clear responses for invalid access.'],
    ['checking Prisma and SQLite rules...', 'Make data rules visible in the model.'],
    ['checking EPG logic per live channel...', 'Schedules should stay scoped and safe.'],
  ];

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let itemIndex = 0;
  let timer;

  const render = () => {
    const [line, status] = sequence[itemIndex];
    terminalStatus.textContent = status;

    if (reduceMotion) {
      terminalLine.textContent = line;
      return;
    }

    let charIndex = 0;
    terminalLine.textContent = '';
    window.clearInterval(timer);
    timer = window.setInterval(() => {
      terminalLine.textContent = line.slice(0, charIndex + 1);
      charIndex += 1;

      if (charIndex >= line.length) {
        window.clearInterval(timer);
        window.setTimeout(() => {
          itemIndex = (itemIndex + 1) % sequence.length;
          render();
        }, 1800);
      }
    }, 34);
  };

  render();
});
