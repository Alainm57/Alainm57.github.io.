container.innerHTML = cartes.map(c => {
  const titre = c.titre ?? "Carte";
  const meta = [
    c.commune ?? "",
    c.echelle ? `Échelle ${c.echelle}` : "",
    c.date ?? ""
  ].filter(Boolean).join(" — ");

  return `
    <div class="card">
      <h2>${titre}</h2>
      <p class="meta">${meta}</p>

      <img
        src="${c.image}"
        alt="${titre}"
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
