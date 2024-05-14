// Definizione dell'URL dell'API per i prodotti
const url = "https://striveschool-api.herokuapp.com/api/product/";

// Definizione del token di autorizzazione per l'API
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNmNjQ2NDAwYzFjMjAwMTU3ZTk5ZTciLCJpYXQiOjE3MTU0MzA1MDEsImV4cCI6MTcxNjY0MDEwMX0.59cbRvlhFuyF2Rj7zYDrzhKbCILlo42wzUVaSAjNF4M";

// Variabile per gestire lo stato del clic sulla lente di ingrandimento
let cliccato = false;

// Seleziono la barra di ricerca
const ricerca = document.getElementById("ricerca");

// Seleziono la lente di ingrandimento
const lente = document.querySelector(".bi");

// Funzione che si attiva quando la pagina è completamente caricata
window.onload = async () => {
    // Carico i prodotti
    await showProducts();
}

// Funzione per ottenere e mostrare i prodotti
const showProducts = async () => {
    // Effettuo una chiamata all'API per ottenere i prodotti
    const res = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });

    // Converto la risposta in formato JSON
    const products = await res.json();

    // Seleziono il contenitore dei prodotti
    const productsContainer = document.getElementById("products-list");

    // Se il contenitore dei prodotti esiste
    if (productsContainer) {
        // Popolo il contenitore con le card dei prodotti
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

        // Aggiungo l'evento di input al campo di ricerca
        const srcInput = document.querySelector("input[type='search']");

        // Aggiungo un event listener per l'evento di input
        srcInput.addEventListener("input", () => {
            // Ottengo il testo inserito nel campo di ricerca
            const searchText = srcInput.value.toLowerCase();

            // Se il testo inserito è lungo almeno due caratteri
            if (searchText.length >= 2) {
                // Filtra i prodotti in base al testo di ricerca
                const filteredItems = products.filter(item => item.name.toLowerCase().includes(searchText));
                // Visualizzo i prodotti filtrati
                displayItems(filteredItems);
            } else if (searchText.length === 0) {
                // Se il campo di ricerca è vuoto, visualizzo tutti i prodotti
                displayItems(products);
            }
        });
    }
};

// Funzione per mostrare gli elementi filtrati
const displayItems = (items) => {
    // Seleziono il contenitore dei prodotti
    const productsContainer = document.getElementById("products-list");

    // Popolo il contenitore con le card dei prodotti filtrati
    productsContainer.innerHTML = items.map((product) => `
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
};

// Aggiungo un event listener per il clic sulla lente di ingrandimento
lente.addEventListener("click", function () {
    // Verifico se è già stato cliccato
    if (!cliccato) {
        // Se non è stato ancora cliccato, aggiungo la classe e imposto lo stato del clic a true
        ricerca.classList.add("animazione");
        ricerca.classList.remove("dissolvenza");
        cliccato = true;
    } else {
        // Se è già stato cliccato, rimuovo la classe e imposto lo stato del clic a false
        ricerca.classList.remove("animazione");
        ricerca.classList.add("dissolvenza");
        cliccato = false;
    }
});
