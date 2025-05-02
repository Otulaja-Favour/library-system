
async function gettingData() {
    try {
        const response = await fetch("https://openlibrary.org/search.json?q=book");
        const result = await response.json();
        console.log(result);
        displayRandomImages(result.docs); // Call the function to display random images
    } catch (error) {
        console.error('error', error);
    }
}

function displayRandomImages(data) {
    // Shuffle the array and pick the first 5 items
    const shuffled = data.sort(() => 0.3 - Math.random());
    const selected = shuffled.slice(0, 3);

    const container = document.getElementById('stories');
    container.innerHTML = ''; // Clear previous content

    selected.forEach((element) => {
        let storydiv = document.createElement('div');
        storydiv.innerHTML = `
            <div class="card m-2 " style="width: 93%;">
                <img src="https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.author_name[0]}</p>
                    <a href="https://openlibrary.org${element.key}" class="btn btn-primary" target="_blank">View Book</a>
                </div>
            </div>
            
        `;
        container.appendChild(storydiv);
    });
}

gettingData();



const timeoutModal = new bootstrap.Modal(document.getElementById('exampleModal'))

function showModal(){
    timeoutModal.show()
}

setTimeout(showModal, 2000)

