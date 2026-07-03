document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const terminalLine = document.getElementById('terminal-line');
  const terminalStatus = document.getElementById('terminal-status');
  const terminalSequence = [
    {
      line: 'checking cache boundaries...',
      status: 'Reduce uncertainty before scale.',
    },
    {
      line: 'diffing SSR output against hydrated UI...',
      status: 'Make rendering bugs visible early.',
    },
    {
      line: 'scoring jobs with saved reasons...',
      status: 'Every recommendation needs evidence.',
    },
    {
      line: 'writing audit trail for the next review...',
      status: 'Automation should leave receipts.',
    },
  ];

  if (terminalLine && terminalStatus && terminalSequence.length) {
    let terminalIndex = 0;
    let terminalTimer;

    const renderTerminalLine = () => {
      const item = terminalSequence[terminalIndex];
      terminalStatus.textContent = item.status;

      if (prefersReducedMotion) {
        terminalLine.textContent = item.line;
        return;
      }

      let charIndex = 0;
      terminalLine.textContent = '';
      window.clearInterval(terminalTimer);
      terminalTimer = window.setInterval(() => {
        terminalLine.textContent = item.line.slice(0, charIndex + 1);
        charIndex += 1;

        if (charIndex >= item.line.length) {
          window.clearInterval(terminalTimer);
          window.setTimeout(() => {
            terminalIndex = (terminalIndex + 1) % terminalSequence.length;
            renderTerminalLine();
          }, 1800);
        }
      }, 34);
    };

    renderTerminalLine();
  }

  const flowData = {
    scrape: {
      label: 'Scrape',
      title: 'Normalize messy source data before any decisions happen.',
      copy:
        'The scraper turns listings into a consistent shape so downstream scoring is based on known fields instead of brittle page assumptions.',
      points: [
        'Capture role, location, company, and apply URL as separate fields.',
        'Handle missing data before it reaches scoring logic.',
        'Store raw and cleaned values for later debugging.',
      ],
      log: ['source parsed: linkedin/search', 'fields normalized: 7', 'fallbacks used: location, salary'],
    },
    score: {
      label: 'Score',
      title: 'Rank fit with reasons attached, not just a number.',
      copy:
        'Scoring compares the listing against the target profile, then saves the evidence so a high score can be challenged or trusted later.',
      points: [
        'Separate hard filters from softer preference signals.',
        'Attach human-readable reasons to each recommendation.',
        'Keep the profile rules editable without touching scraper code.',
      ],
      log: ['profile match: frontend systems', 'evidence count: 12', 'confidence band: strong'],
    },
    apply: {
      label: 'Apply',
      title: 'Prepare the action without hiding the judgment.',
      copy:
        'Application steps stay controlled: answers can be drafted, reviewed, and traced back to the source listing before anything moves forward.',
      points: [
        'Generate answer drafts with source context nearby.',
        'Keep manual review in the path for risky flows.',
        'Separate browser automation from scoring decisions.',
      ],
      log: ['answers drafted: 4', 'manual checkpoint: enabled', 'browser action: queued'],
    },
    log: {
      label: 'Log',
      title: 'Make every run reviewable after the fact.',
      copy:
        'The engine saves decisions, artifacts, and exceptions so the workflow can be improved from evidence instead of memory.',
      points: [
        'Persist decisions, scores, generated answers, and run metadata.',
        'Surface exceptions as product feedback, not hidden noise.',
        'Use history to tune the pipeline instead of guessing.',
      ],
      log: ['artifacts saved: 9', 'exceptions grouped: 2', 'next review: ready'],
    },
  };

  const flowButtons = Array.from(document.querySelectorAll('[data-flow-step]'));
  const flowLabel = document.getElementById('flow-label');
  const flowTitle = document.getElementById('flow-title');
  const flowCopy = document.getElementById('flow-copy');
  const flowPoints = document.getElementById('flow-points');
  const flowLogLines = document.getElementById('flow-log-lines');

  const renderList = (target, items) => {
    if (!target) return;
    const nodes = items.map((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      return li;
    });
    target.replaceChildren(...nodes);
  };

  const selectFlowStep = (step) => {
    const data = flowData[step];
    if (!data) return;

    flowButtons.forEach((button) => {
      const isSelected = button.dataset.flowStep === step;
      button.classList.toggle('is-active', isSelected);
      button.setAttribute('aria-selected', String(isSelected));
    });

    if (flowLabel) flowLabel.textContent = data.label;
    if (flowTitle) flowTitle.textContent = data.title;
    if (flowCopy) flowCopy.textContent = data.copy;
    renderList(flowPoints, data.points);
    renderList(flowLogLines, data.log);
  };

  flowButtons.forEach((button) => {
    button.addEventListener('click', () => selectFlowStep(button.dataset.flowStep));
  });

  const skillData = {
    junior: {
      label: 'October 2023 - March 2025',
      title: 'Junior Full Stack Developer',
      copy:
        'Learned to ship across SSR and client-rendered surfaces while keeping reusable components, maps, carousels, and AI content blocks production-safe.',
      clusters: ['React', 'Next.js', 'Reusable UI', 'Rendering awareness'],
    },
    engineer: {
      label: 'March 2025 - March 2026',
      title: 'Software Engineer',
      copy:
        'Owned SEO-sensitive products, shared CMS-driven templates, analytics fixes, and production issues where reliability affected conversion.',
      clusters: ['CMS systems', 'SEO integrity', 'Caching fixes', 'Production debugging'],
    },
    systems: {
      label: 'Independent systems work',
      title: 'Automation and reverse engineering',
      copy:
        'Connected scraping, scoring, browser control, persistence, and review workflows into tools that reduce decision friction without hiding complexity.',
      clusters: ['Playwright', 'Prisma', 'OpenAI workflows', 'Audit trails'],
    },
  };

  const skillButtons = Array.from(document.querySelectorAll('[data-skill-stage]'));
  const skillLabel = document.getElementById('skill-stage-label');
  const skillTitle = document.getElementById('skill-stage-title');
  const skillCopy = document.getElementById('skill-stage-copy');
  const skillClusters = document.getElementById('skill-stage-clusters');

  const selectSkillStage = (stage) => {
    const data = skillData[stage];
    if (!data) return;

    skillButtons.forEach((button) => {
      const isSelected = button.dataset.skillStage === stage;
      button.classList.toggle('is-active', isSelected);
      button.setAttribute('aria-selected', String(isSelected));
    });

    if (skillLabel) skillLabel.textContent = data.label;
    if (skillTitle) skillTitle.textContent = data.title;
    if (skillCopy) skillCopy.textContent = data.copy;

    if (skillClusters) {
      const nodes = data.clusters.map((cluster) => {
        const span = document.createElement('span');
        span.textContent = cluster;
        return span;
      });
      skillClusters.replaceChildren(...nodes);
    }
  };

  skillButtons.forEach((button) => {
    button.addEventListener('click', () => selectSkillStage(button.dataset.skillStage));
  });
});
