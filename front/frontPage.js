// Definizione della costante url che contiene l'endpoint dell'API per i prodotti
const url = "https://striveschool-api.herokuapp.com/api/product/";

// Definizione della costante token contenente la chiave di autorizzazione per l'API
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNmNjQ2NDAwYzFjMjAwMTU3ZTk5ZTciLCJpYXQiOjE3MTU0MzA1MDEsImV4cCI6MTcxNjY0MDEwMX0.59cbRvlhFuyF2Rj7zYDrzhKbCILlo42wzUVaSAjNF4M";

// Funzione che viene eseguita quando la finestra è completamente caricata
window.onload = async () => {
    // Chiamata alla funzione che mostra i prodotti
    await showProducts();
}


const showProducts = async () => {
    // Chiamata all'API per ottenere i prodotti
    const res = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });

    // Converte la risposta in formato JSON
    const products = await res.json();

    // Selezione del contenitore dei prodotti
    const productsContainer = document.getElementById("products-list");

    // Se il contenitore dei prodotti esiste
    if (productsContainer) {
        // Popola il contenitore con le card dei prodotti
        productsContainer.innerHTML = products.map((product) => `
            <div class="col-12 box">
                <img src="${product.imageUrl}">
                <div class="mt-1 text-center">
                    <h4>${product.name}</h4>
                    <h5 class="pe-1">${product.brand}</h5>
                    <small><b>${product.price} €</b></small>
                </div>
                <div class="mt-2"> 
                    <button class="submitbtn detail mb-1"><a class="text-decoration-none text-white" href="/detail/detail.html?id=${product._id}">Dettaglio</a></button>
                </div>
            </div>
        `).join("");
    }
};
