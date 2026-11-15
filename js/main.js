document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const tagButtons = document.querySelectorAll('.tag-btn');
  const gameCards = document.querySelectorAll('.game-card');
  const noResults = document.getElementById('noResults');

  if (!searchInput || gameCards.length === 0) return;

  let activeTag = 'all';

  function filterGames() {
    const keyword = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    gameCards.forEach((card) => {
      const title = (card.dataset.title || '').toLowerCase();
      const tags = (card.dataset.tags || '').toLowerCase();
      const textContent = card.textContent.toLowerCase();

      const matchesKeyword =
        keyword === '' || title.includes(keyword) || textContent.includes(keyword);
      const matchesTag =
        activeTag === 'all' || tags.split(',').map(t => t.trim()).includes(activeTag.toLowerCase());

      if (matchesKeyword && matchesTag) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  searchInput.addEventListener('input', filterGames);

  tagButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      tagButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeTag = btn.dataset.tag || 'all';
      filterGames();
    });
  });
});
