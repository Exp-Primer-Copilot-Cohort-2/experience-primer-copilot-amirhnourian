const seasons = {
  winter: { wind: '8.2', direction: 'SW', windP90: '14.6', wave: '1.4', waveMax: '3.8', current: '0.32', currentMax: '0.71', ice: '42' },
  spring: { wind: '6.7', direction: 'W', windP90: '11.8', wave: '0.9', waveMax: '2.7', current: '0.27', currentMax: '0.58', ice: '8' },
  summer: { wind: '5.4', direction: 'SW', windP90: '9.3', wave: '0.6', waveMax: '2.1', current: '0.22', currentMax: '0.49', ice: '0' },
  autumn: { wind: '8.9', direction: 'W', windP90: '15.8', wave: '1.6', waveMax: '4.2', current: '0.35', currentMax: '0.76', ice: '0' }
};

document.querySelectorAll('[data-season]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-season]').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const values = seasons[button.dataset.season];
    Object.entries(values).forEach(([key, value]) => {
      const element = document.querySelector(`[data-value="${key}"]`);
      if (element) element.textContent = value;
    });
    document.querySelector('[data-icebar]').style.width = `${values.ice}%`;
  });
});

document.querySelectorAll('[data-print]').forEach((button) => button.addEventListener('click', () => window.print()));

const heatmapData = {
  Winter: [1.8,1.7,1.6,1.5,1.4,1.2,1.1,1.0,1.7,1.6,1.5,1.4,1.3,1.1,.9,.8,1.5,1.5,1.4,1.3,1.2,1.0,.8,.7,1.2,1.3,1.3,1.2,1.0,.8,.7,.6,.9,1.0,1.1,1.0,.9,.7,.6,.5],
  Spring: [1.2,1.1,1.0,.9,.9,.8,.7,.6,1.1,1.0,.9,.9,.8,.7,.6,.5,1.0,.9,.9,.8,.7,.6,.5,.4,.8,.8,.8,.7,.6,.5,.4,.4,.6,.7,.7,.6,.5,.4,.3,.3],
  Summer: [.8,.8,.7,.7,.6,.5,.5,.4,.8,.7,.7,.6,.6,.5,.4,.4,.7,.7,.6,.6,.5,.4,.4,.3,.6,.6,.6,.5,.4,.4,.3,.3,.5,.5,.5,.4,.4,.3,.3,.2],
  Autumn: [2.1,2.0,1.9,1.8,1.6,1.5,1.3,1.2,2.0,1.9,1.8,1.7,1.5,1.4,1.2,1.0,1.8,1.8,1.7,1.5,1.4,1.2,1.0,.9,1.5,1.6,1.5,1.4,1.2,1.0,.9,.8,1.2,1.3,1.3,1.2,1.0,.9,.8,.7]
};

const heatColor = (value) => {
  const colors = ['#d9eee8', '#a7d8ce', '#54b3a8', '#087f79', '#075261', '#ed6848'];
  return colors[Math.min(colors.length - 1, Math.floor((value - 0.2) / 0.36))];
};

const heatmapContainer = document.querySelector('[data-heatmaps]');
Object.entries(heatmapData).forEach(([season, values]) => {
  const cells = values.map((value, index) => `<rect x="${(index % 8) * 28}" y="${Math.floor(index / 8) * 25}" width="27" height="24" rx="1" fill="${heatColor(value)}"><title>${value.toFixed(1)} m</title></rect>`).join('');
  const article = document.createElement('article');
  article.className = 'heatmap-card';
  article.innerHTML = `<div><b>${season}</b><span>P90 Hs · ${Math.max(...values).toFixed(1)} m peak</span></div><svg viewBox="0 0 224 125" role="img" aria-label="${season} sample wave height heatmap">${cells}<path d="M0 107C35 96 49 112 76 104s43-16 73-9 46-5 75-15v45H0Z" fill="#f6f7f3" opacity=".72"/></svg><small>HANKO&nbsp;&nbsp; ← WEST · EAST → &nbsp;&nbsp;HAMINAKOTKA</small>`;
  heatmapContainer.appendChild(article);
});

const sections = [...document.querySelectorAll('main section[id]')];
const links = [...document.querySelectorAll('nav a')];
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { rootMargin: '-30% 0px -60%' });
sections.forEach((section) => observer.observe(section));
