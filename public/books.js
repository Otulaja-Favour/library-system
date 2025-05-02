
async function gettingData() {
    try {
        const response = await fetch("https://openlibrary.org/search.json?q=book");
        const result = await response.json();
        console.log(result);
        displayPage(result); 
    } catch (error) {
        console.error('error', error);
    }
}

function displayPage(result) {

    const container = document.getElementById('all');
    container.classList.add('conc')
    container.innerHTML = ''; // Clear previous content

    result.docs.forEach((element) => {
        let storydiv = document.createElement('div');
        storydiv.innerHTML = `
            <div class="card border m-3" style="width: 18rem;">
                <img src="https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.author_name[0]}</p>
                    <a href="./login.html" class="btn btn-primary" target="_blank">View Book</a>
                </div>
            </div>
        `;
        container.appendChild(storydiv);
    });
}



gettingData();