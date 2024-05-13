// Funzione che viene eseguita quando la finestra è completamente caricata
window.onload = async () => {
    // estrai l'id dal permalink
    const urlParams = new URLSearchParams(location.search);
    const id = urlParams.get('id');
    // Definizione della costante url che contiene l'endpoint dell'API per i prodotti
    const url = 'https://striveschool-api.herokuapp.com/api/product/' +id;

    // Definizione della costante token contenente la chiave di autorizzazione per l'API
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNmNjQ2NDAwYzFjMjAwMTU3ZTk5ZTciLCJpYXQiOjE3MTU0MzA1MDEsImV4cCI6MTcxNjY0MDEwMX0.59cbRvlhFuyF2Rj7zYDrzhKbCILlo42wzUVaSAjNF4M";

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
    
            // Popola il contenitore con le card dei prodotti
            productsContainer.innerHTML =`
                <div class="col-12 box-detail">
                    <img src="${products.imageUrl}" >
                    <div class="mt-3 text-center">
                        <h4>${products.name}</h4>
                        <p>${products.description}</p> 
                        <div class="">
                            <h6 class="">${products.brand}</h6>
                            <small><b>${products.price} €</b></small>
                        </div>
                    </div>
                </div>
            `
    };

    showProducts();
}

