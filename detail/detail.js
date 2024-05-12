// Funzione che viene eseguita quando la finestra è completamente caricata
window.onload = async () => {
    // Definizione della costante url che contiene l'endpoint dell'API per i prodotti
    const url = 'https://striveschool-api.herokuapp.com/api/product/' +id;

    // Definizione della costante token contenente la chiave di autorizzazione per l'API
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNmNjQ2NDAwYzFjMjAwMTU3ZTk5ZTciLCJpYXQiOjE3MTU0MzA1MDEsImV4cCI6MTcxNjY0MDEwMX0.59cbRvlhFuyF2Rj7zYDrzhKbCILlo42wzUVaSAjNF4M";

    // estrai l'id dal permalink
    const urlParams = new URLSearchParams(location.search);
    const id = urlParams.get('id');

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
                <div class="col-12">
                    <img src="${product.imageUrl}" width="80px" height="100px">
                    <div class="">
                        <h4>${product.name}</h4>
                        <p>${product.description}</p> 
                        <div class="">
                            <h6 class="mb-0 pe-1">${product.brand}</h6>
                            <small><b>${product.price},00 €</b></small>
                        </div>
                    </div>
                </div>
            `).join("");
        }
    };

    showProducts();
}

