const url = "https://striveschool-api.herokuapp.com/api/product/";
// chiave autorizzazione api
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNmNjQ2NDAwYzFjMjAwMTU3ZTk5ZTciLCJpYXQiOjE3MTU0MzA1MDEsImV4cCI6MTcxNjY0MDEwMX0.59cbRvlhFuyF2Rj7zYDrzhKbCILlo42wzUVaSAjNF4M";

// funzione che parte e chiama le sue funzioni all'avvio della pagina
/*window.onload = async () => {
    // chiamo la funzione per la visualizzazione a video dei prodotti con await in modo tale che si attende il suo svolgimento
    // prima del prossimo step
    //await showProducts(); // funzione mostra prodotti
    //getValueForm(); // recupera i dati del prodotto da modificare
}*/

const createProducts = async () => {
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const brand = document.getElementById("brand").value;
    const itemUrl = document.getElementById("item-img").value;
    const price = document.getElementById("price").value;

    const newProducts = {
        name: name,
        description: description,
        brand: brand,
        itemUrl: itemUrl,
        price: price,
    };

    const res = await fetch (url, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "content-type": "application/json",
        },
        body: JSON.stringify(newProducts),
    });
    console.log(newProducts);
    //mostraSpinner();

    if (res.ok) {
        //nascondiSpinner();
        //mostraMessaggio("Prodotto creato con successo");
        //await showProducts();
    }else {
        //mostraMessaggio("Errore, il prodotto non è stato creato correttamente");
    }
};
 












/* 
function mostraSpinner() {
    document.getElementById("spinner").style.display = "block";
  }
  
  function nascondiSpinner() {
    document.getElementById("spinner").style.display = "none";
  }

  function mostraMessaggio(messaggio) {
    const messageBox = document.getElementById("message-box");
    messageBox.textContent = messaggio;
    messageBox.style.display = "block";
  
    setTimeout(() => {
      messageBox.style.display = "none";
    }, 3000); // Il messaggio scompare dopo 3 secondi
  } */