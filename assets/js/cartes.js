async function loadCartes() {
  const container = document.getElementById("cartes-list");
  if (!container) return;

  try {
    const res = await fetch("/cartes/index.json?v=20260107-1", {
      cache: "no-store"
    });

    if (!res.ok) {
      throw new Error("HTTP " + res.status);
    }

    const cartes = await res.json();

    if (!Array.isArray(cartes) || cartes.length === 0) {
      container.innerHTML = "<p>Aucune carte disponible.</p>";
      return;
    }

    container.innerHTML = cartes.map(c => {
      return `
        <div class="card">
          <h2>${c.titre}</h2>
          <p class="meta">
            ${c.commune} — Échelle ${c.echelle} — ${c.date}
          </p>

          <img
            src="${c.image}"
            alt="${c.titre}"
            style="max-width:100%; border:1px solid #ccc; border-radius:8px"
          />

          <p>
            <a class="btn" href="${c.pgw}">
              Télécharger le fichier PGW
            </a>
          </p>
        </div>
      `;
    }).join("");

  } catch (e) {
    container.innerHTML =
      "<p>Erreur lors du chargement des cartes : " + e.message + "</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadCartes);
