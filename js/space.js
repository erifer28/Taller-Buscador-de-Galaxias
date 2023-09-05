document.addEventListener("DOMContentLoaded", function () {
    let boton = document.getElementById("btnBuscar");

    boton.addEventListener('click', function () {
        let input = document.getElementById("inputBuscar").value;
        let NASA_URL = 'https://images-api.nasa.gov/search?q=' + input;

        fetch(NASA_URL)
            .then(resp => resp.json())
            .then(data => showData(data.collection.items))
    })

    function showData(itemsArray) {
        let htmlContentToAppend = "";
        for (let i = 0; i < itemsArray.length; i++) {
            if (itemsArray[i].links && itemsArray[i].links[0] && itemsArray[i].data && itemsArray[i].data[0]) {
                htmlContentToAppend += `
                    <div class="list-group-item list-group-item-action cursor-active">
                        <div class="row">
                            <div class="col-3">
                                <img src="${itemsArray[i].links[0].href}" alt="${itemsArray[i].data[0].title}" class="img-thumbnail">
                            </div>
                            <div class="col">
                                <div class="d-flex w-100 justify-content-between">
                                    <h4 class="mb-1">${itemsArray[i].data[0].title}</h4>
                                    <small class="text-muted">${itemsArray[i].data[0].date_created || ''} </small>
                                </div>
                                <p class="mb-1">${itemsArray[i].data[0].description || ''}</p>
                            </div>
                        </div>
                    </div>
                    `;
            }
        }
    
        document.getElementById("contenedor").innerHTML = htmlContentToAppend;
    }
});