async function loadGames() {
  try {
    const response = await fetch('games.json');
    const games = await response.json();

    const container = document.getElementById('game-container');
    const search = document.getElementById('search');

    function render(filter = '') {
      container.innerHTML = '';
      games
        .filter(game => game.name.toLowerCase().includes(filter.toLowerCase()))
        .forEach(game => {
          const card = document.createElement('div');
          card.className = 'bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center';
          
          card.innerHTML = `
            <img src="${game.image}" alt="${game.name}" class="w-full h-40 object-cover rounded">
            <h2 class="mt-4 text-lg font-bold">${game.name}</h2>
            <p class="text-gray-400">${game.category}</p>
            <a href="${game.path}" class="mt-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">Play Now</a>
          `;

          container.appendChild(card);
        });
    }

    render();

    search.addEventListener('input', (e) => {
      render(e.target.value);
    });

  } catch (error) {
    console.error('Error loading games:', error);
  }
}

loadGames();
