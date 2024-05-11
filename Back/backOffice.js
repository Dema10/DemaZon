const url = "https://striveschool-api.herokuapp.com/api/product/";
// chiave autorizzazione api
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNmNjQ2NDAwYzFjMjAwMTU3ZTk5ZTciLCJpYXQiOjE3MTU0MzA1MDEsImV4cCI6MTcxNjY0MDEwMX0.59cbRvlhFuyF2Rj7zYDrzhKbCILlo42wzUVaSAjNF4M";
const form = document.getElementById("product-form");
const modify = document.getElementById("modify");
const add = document.getElementById("add");
// funzione che parte e chiama le sue funzioni all'avvio della pagina
window.onload = async () => {
    // chiamo la funzione per la visualizzazione a video dei prodotti con await in modo tale che si attende il suo svolgimento
    // prima del prossimo step
    await showProducts(); // funzione mostra prodotti
    getValueForm(); // recupera i dati del prodotto da modificare
}

const createProducts = async (event) => {
    event.preventDefault();
    const constName = document.getElementById("name").value;
    const constdDscription = document.getElementById("description").value;
    const constBrand = document.getElementById("brand").value;
    const constImageUrl = document.getElementById("image-img").value;
    const constPrice = document.getElementById("price").value;

    const newProduct = {
        name: constName,
        description: constdDscription,
        brand: constBrand,
        imageUrl: constImageUrl,
        price: constPrice,
    };

    const res = await fetch (url, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "content-type": "application/json",
        },
        body: JSON.stringify(newProduct),
    })
    

    if (res.ok) {
        mostraSpinner();
        mostraMessaggio("Prodotto creato con successo");
        await showProducts();
    }else {
        mostraMessaggio("Erorre, ritenta sarai più fortunato");
    }
};
 

// funzione per creare la card del prodotto
const showProducts = async () => {
    form.reset();
    const res = await fetch (url, {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });
    const products = await res.json();
    const productsContainer = document.getElementById("products-list");
    if (productsContainer) {
        productsContainer.innerHTML = products.map((product) => `
            <div class="col-12 d-flex justify-content-between align-items-center ">
                <img src="${product.imageUrl}" width="80px" height="100px">
                <div class="d-flex flex-column justify-content-center">
                    <h4>${product.name}</h4>
                    <p>${product.description}</p> 
                    <div class="d-flex flex-row align-items-center">
                        <h6 class="mb-0 pe-1">${product.brand}</h6>
                        <small><b>${product.price}</b></small>
                    </div>
                </div>
                <div class="d-flex flex-column justify-content-center"> 
                    <button class="submitbtn mod mb-1" onclick="getValueForm('${product._id}')"><a class="text-decoration-none text-white" href="#">Modifica</a></button>
                    <button class="submitbtn delete mt-1" onclick="deleteProduct('${product._id}')">Cancella</button>
                </div>
            </div>
        `).join("");
    }
    nascondiSpinner();
};

const getValueForm = async (idInInput) => {
    if (idInInput) {
        const res = await fetch (url +idInInput, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });
        const product = await res.json();
        document.getElementById("name").value = product.name;
        document.getElementById("description").value = product.description;
        document.getElementById("brand").value = product.brand;
        document.getElementById("image-img").value = product.imageUrl;
        document.getElementById("price").value = product.price;
        document.getElementById("id").value = product._id;
        modify.classList.remove("d-none");
        add.classList.add("d-none");
    }
};


//funzione per modificare i prodotti
const modifyProduct = async () => {
    const constName = document.getElementById("name").value;
    const constdDscription = document.getElementById("description").value;
    const constBrand = document.getElementById("brand").value;
    const constImageUrl = document.getElementById("image-img").value;
    const constPrice = document.getElementById("price").value;
    const id = document.getElementById("id").value;

    const modifyProduct = {
        name: constName,
        description: constdDscription,
        brand: constBrand,
        imageUrl: constImageUrl,
        price: constPrice,
    };

    const res = await fetch (url + id, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "content-type": "application/json",
        },
        body: JSON.stringify(modifyProduct),
    });
    

    if (res.ok) {
        mostraSpinner();
        mostraMessaggio("Prodotto aggiornato con successo");
        await showProducts();
    }else {
        mostraMessaggio("Erorre, ritenta sarai più fortunato");
    }
};


const deleteProduct = async (id) => {
    const res = await fetch (url + id, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    if (res.ok) {
        mostraSpinner();
        mostraMessaggio("Prodotto eliminato con successo");
        await showProducts();
    }else {
        mostraMessaggio("Erorre, ritenta sarai più fortunato");
    }
}; 



function mostraSpinner() {
    document.getElementById("spinner").style.display = "block";
};
  
function nascondiSpinner() {
    document.getElementById("spinner").style.display = "none";
};

function mostraMessaggio(messaggio) {
    const messageBox = document.getElementById("message-box");
    messageBox.textContent = messaggio;
    messageBox.style.display = "block";

    setTimeout(() => {
        messageBox.style.display = "none";
    }, 3000); // Il messaggio scompare dopo 3 secondi
};