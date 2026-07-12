document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const terminalLine = document.getElementById('terminal-line');
  const terminalStatus = document.getElementById('terminal-status');

  if (!terminalLine || !terminalStatus) return;

  const sequence = [
    ['reviewing SaatCMS middleware...', 'Keep API behavior predictable.'],
    ['checking CMS authentication and roles...', 'Fail closed and authorize every mutation.'],
    ['checking PostgreSQL migrations...', 'Keep schema changes durable and repeatable.'],
    ['checking concurrent EPG writes...', 'Block schedule overlaps even when requests race.'],
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
