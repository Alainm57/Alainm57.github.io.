async function loadCartes() {
  const container = document.getElementById("cartes-list");
  if (!container) return;

  try {
    const res = await fetch("/cartes/index.json", { cache: "no-store" });
    if (!res.ok) throw new Error("HTTP " + res.status);

    const cartes = await res.json();
    if (!Array.isArray(cartes) || cartes.length === 0) {
      container.innerHTML = "<p>Aucune carte pour le moment.</p>";
      return;
    }

    container.innerHTML = cartes.map(c => {
      const titre = c.titre ?? "Carte";
      const meta = [
        c.region ? `<strong>${c.region}</strong>` : "",
        c.commune ?? "",
        c.date ?? "",
        c.echelle ? `Échelle ${c.echelle}` : ""
      ].filter(Boolean).join(" — ");

      const formats = (c.formats || []).map(f =>
        `<a class="btn" href="${f.url}">${f.label}</a>`
      ).join(" ");

      return `
        <div class="card">
          <h2>${titre}</h2>
          <p>${meta}</p>
          <p>${formats}</p>
        </div>
      `;
    }).join("");

  } catch (e) {
    container.innerHTML = `<p>Impossible de charger <code>/cartes/index.json</code> (${e}).</p>`;
  }
}

document.addEventListener("DOMContentLoaded", loadCartes);
