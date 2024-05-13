// Definizione della costante url che contiene l'endpoint dell'API per i prodotti
const url = "https://striveschool-api.herokuapp.com/api/product/";

// Definizione della costante token contenente la chiave di autorizzazione per l'API
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNmNjQ2NDAwYzFjMjAwMTU3ZTk5ZTciLCJpYXQiOjE3MTU0MzA1MDEsImV4cCI6MTcxNjY0MDEwMX0.59cbRvlhFuyF2Rj7zYDrzhKbCILlo42wzUVaSAjNF4M";

// Selezione del form HTML tramite l'ID "product-form"
const form = document.getElementById("product-form");

// Selezione del bottone di modifica HTML tramite l'ID "modify"
const modify = document.getElementById("modify");

// Selezione del bottone di aggiunta HTML tramite l'ID "add"
const add = document.getElementById("add");

// Funzione che viene eseguita quando la finestra è completamente caricata
window.onload = async () => {
    // Chiamata alla funzione che mostra i prodotti
    await showProducts();

    // Chiamata alla funzione che recupera i dati del prodotto per la modifica
    getValueForm();
}

// Funzione che crea un nuovo prodotto
const createProducts = async (event) => {
    // Impedisce il comportamento predefinito del form
    event.preventDefault();

    // Recupero dei valori inseriti dall'utente nel form
    const constName = document.getElementById("name").value;
    const constdDscription = document.getElementById("description").value;
    const constBrand = document.getElementById("brand").value;
    const constImageUrl = document.getElementById("image-img").value;
    const constPrice = document.getElementById("price").value;
      

    // Creazione di un nuovo oggetto prodotto
    const newProduct = {
        name: constName,
        description: constdDscription,
        brand: constBrand,
        imageUrl: constImageUrl,
        price: constPrice,
    };

    // Chiamata all'API per aggiungere un nuovo prodotto
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "content-type": "application/json",
        },
        body: JSON.stringify(newProduct),
    });

    // Se la chiamata ha successo, mostra un messaggio di successo e aggiorna i prodotti visualizzati
    if (res.ok) {
        mostraSpinner();
        mostraMessaggio("Prodotto creato con successo");
        await showProducts();
    } else {
        // Altrimenti mostra un messaggio di errore
        mostraMessaggio("Errore, ritenta sarai più fortunato");
    }
};

// Funzione per visualizzare i prodotti
const showProducts = async () => {
    // Resetta il form
    form.reset();

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
            <div class="col-12 d-flex justify-content-between align-items-center ">
                <img class="img-back" src="${product.imageUrl}">
                <div class="d-flex flex-column justify-content-center text-center">
                    <h4>${product.name}</h4>
                    <h5 class="pe-1">${product.brand}</h5>
                    <small><b>${product.price} €</b></small>
                </div>
                <div class="d-flex flex-column justify-content-center"> 
                    <button class="submitbtn mod mb-1" onclick="getValueForm('${product._id}')"><a class="text-decoration-none text-white" href="#">Modifica</a></button>
                    <button class="submitbtn delete mt-1" onclick="deleteProduct('${product._id}')">Cancella</button>
                </div>
            </div>
            <div><hr clss="bg-dark"></div>
        `).join("");
    }
    // Nasconde lo spinner una volta caricati i prodotti
    nascondiSpinner();
};

// Funzione per ottenere i valori del prodotto selezionato per la modifica
const getValueForm = async (idInInput) => {
    // Se è stato passato un ID
    if (idInInput) {
        // Chiamata all'API per ottenere i dettagli del prodotto
        const res = await fetch(url + idInInput, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });

        // Converte la risposta in formato JSON
        const product = await res.json();

        // Popola i campi del form con i dettagli del prodotto
        document.getElementById("name").value = product.name;
        document.getElementById("description").value = product.description;
        document.getElementById("brand").value = product.brand;
        document.getElementById("image-img").value = product.imageUrl;
        document.getElementById("price").value = product.price;
        document.getElementById("id").value = product._id;

        // Mostra il bottone di modifica e nasconde il bottone di aggiunta
        modify.classList.remove("d-none");
        add.classList.add("d-none");
    }
};

// Funzione per modificare un prodotto
const modifyProduct = async (event) => {
    // Impedisce il comportamento predefinito del form
    event.preventDefault();
    // Recupero dei valori dal form
    const constName = document.getElementById("name").value;
    const constdDscription = document.getElementById("description").value;
    const constBrand = document.getElementById("brand").value;
    const constImageUrl = document.getElementById("image-img").value;
    const constPrice = document.getElementById("price").value;
    const id = document.getElementById("id").value;

    // Creazione dell'oggetto prodotto modificato
    const modifyProduct = {
        name: constName,
        description: constdDscription,
        brand: constBrand,
        imageUrl: constImageUrl,
        price: constPrice,
    };
    console.log(modifyProduct);

    // Chiamata all'API per modificare il prodotto
    const res = await fetch(url + id, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "content-type": "application/json",
        },
        body: JSON.stringify(modifyProduct),
    });

    // Se la chiamata ha successo, mostra un messaggio di successo e aggiorna i prodotti visualizzati
    if (res.ok) {
        mostraSpinner();
        mostraMessaggio("Prodotto aggiornato con successo");
        // Mostra il bottone di aggiunta e nasconde il bottone di modifica
        modify.classList.add("d-none");
        add.classList.remove("d-none");
        await showProducts();
    } else {
        // Altrimenti mostra un messaggio di errore
        mostraMessaggio("Errore, ritenta sarai più fortunato");
    }
};

// Funzione per eliminare un prodotto
const deleteProduct = async (id) => {
    // Chiamata all'API per eliminare il prodotto
    const res = await fetch(url + id, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    // Se la chiamata ha successo, mostra un messaggio di successo e aggiorna i prodotti visualizzati
    if (res.ok) {
        mostraSpinner();
        mostraMessaggio("Prodotto eliminato con successo");
        await showProducts();
    } else {
        // Altrimenti mostra un messaggio di errore
        mostraMessaggio("Errore, ritenta sarai più fortunato");
    }
};

// Funzione per mostrare lo spinner
function mostraSpinner() {
    document.getElementById("spinner").style.display = "block";
};

// Funzione per nascondere lo spinner
function nascondiSpinner() {
    document.getElementById("spinner").style.display = "none";
};

// Funzione per mostrare un messaggio
function mostraMessaggio(messaggio) {
    const messageBox = document.getElementById("message-box");
    messageBox.textContent = messaggio;
    messageBox.style.display = "block";

    // Il messaggio scompare dopo 3 secondi
    setTimeout(() => {
        messageBox.style.display = "none";
    }, 3000);
};
