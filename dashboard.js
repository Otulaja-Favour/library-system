let loginSession = document.getElementById('login')
let signSession = document.getElementById('sign')
loginSession.addEventListener('click', () => {
    document.getElementById('signupdiv').style.display = 'none'
    document.getElementById('logindiv').style.display = 'block'
    // document.getElementById('part2').style.display = 'none'

})

signSession.addEventListener('click', () => {
    document.getElementById('signupdiv').style.display = 'block'
    document.getElementById('logindiv').style.display = 'none'
})

//signupsession

let fname = document.getElementById('fname')
let lname = document.getElementById('lname')
let email = document.getElementById('email')
let pswd = document.getElementById('pswd')
let cpswd = document.getElementById('cpswd')

let users = JSON.parse(localStorage.getItem('user')) || []

function saveToLocal() {
    localStorage.setItem('user', JSON.stringify(users))
}




fname.addEventListener('keypress', () => {
    if (fname.value.length < 3) {
        fname.style.border = '1px solid red'

        document.getElementById('fnameval').innerText = 'Pls enter a correct name'
    } else {
        document.getElementById('fnameval').style.display = ' none'
        fname.style.border = '1px solid green'

    }

})

lname.addEventListener('keypress', () => {
    if (lname.value.length < 3) {
        lname.style.border = '1px solid red'
        document.getElementById('lnameval').innerText = 'Pls enter a correct name'
    } else {
        lname.style.border = '1px solid green'
        document.getElementById('lnameval').style.display = ' none'
    }

})

let mailreg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let paswdreg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

email.addEventListener('keypress', () => {

    if ((mailreg.test(email.value))) {
        document.getElementById('emailval').textContent = ''
        email.style.border = '1px solid green'

    } else if (!(mailreg.test(email.value))) {
        document.getElementById('emailval').textContent = 'invalid mail'
        email.style.border = '1px solid red'

    }
})

pswd.addEventListener('keypress', () => {

    if (paswdreg.test(pswd.value)) {
        document.getElementById('pasval').textContent = ''
        pswd.style.border = '1px solid green'
    } else {
        document.getElementById('pasval').textContent = 'pls enter a valid password'
        pswd.style.border = '1px solid red'

    }
})

cpswd.addEventListener('input', () => {

    if (pswd.value === cpswd.value) {
        document.getElementById('cpassval').textContent = ''
        pswd.style.border = '1px solid green'
    } else {
        document.getElementById('cpassval').textContent = 'pls enter a valid password'
        pswd.style.border = '1px solid red'

    }
})


function sign() {
    if (!(fname.value && lname.value && email.value && pswd.value && cpswd.value)) {
        alert('okay')
    } else {

        // fetchExternalData();

        users.push({
            fname: fname.value,
            lname: lname.value,
            email: email.value,
            pswd: pswd.value,
            date: new Date().toLocaleDateString()
        })

        saveToLocal()

        alert('login succesfuly')

        document.getElementById('part2').style.display = 'block'
        document.getElementById('signupdiv').style.display = 'none'


    }



}

let loginemail = document.getElementById('loginemail')
let loginpswd = document.getElementById('loginpswd')

function Login() {
    if (loginemail.value === 'otulajafavour14@gmail.com' && loginpswd.value === 'qwerty12345we') {
        alert('login succesfully')
        document.getElementById('part3').style.display = 'block'
        document.getElementById('logindiv').style.display = 'none'

        return
    }
    let savedUsers = JSON.parse(localStorage.getItem('user')) || [];
    // console.log(savedUsers);

    let foundData = savedUsers.find(user => user.email === loginemail.value && user.pswd === loginpswd.value)
    if (foundData) {
        alert('Login Successfully')
        document.getElementById('part2').style.display = 'block'
        document.getElementById('logindiv').style.display = 'none'

        return
    } else {
        alert('Invalid Email or Password')
    }

}


//for the members page functionality

{


    let currentPage = 1;
    const itemsPerPage = 12;

    // Store borrowed books in localStorage to persist between sessions
    let borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
    console.log(borrowedBooks.length);

    function saveBorrowedBooks() {
        let users = JSON.parse(localStorage.getItem('user')) || [];
        let currentUser = users[0];
        let borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
      
        if (currentUser) {
          if (!currentUser.borrowedBooks) {
            currentUser.borrowedBooks = borrowedBooks;
          } else {
            currentUser.borrowedBooks = borrowedBooks;
          }
          
          users[0] = currentUser;
          localStorage.setItem('user', JSON.stringify(users));
        } else {
          console.error('No current user found');
        }
        
        document.querySelector('#amount').innerHTML = borrowedBooks.length;
      }
      
      
    console.log(users);

    let books = JSON.parse(localStorage.getItem('books')) || [];
    console.log(books[0][0].length);

    document.getElementById('totalBooks').innerHTML = books[0][0].length
    function saveBooks() {
        localStorage.setItem('books', JSON.stringify(books));

    }



    document.querySelector('#amount').innerHTML = borrowedBooks.length;
document.getElementById('booksBorrowed').innerHTML = borrowedBooks.length

    const userSearchInput = document.getElementById('userSearchInput');
    let allBooks = []; // to store all fetched books for search
    console.log(allBooks);


    console.log(books[0][0]);

    async function gettingData() {
        try {

          

            const response = await fetch("https://openlibrary.org/search.json?q=book");
            const result = await response.json();
            allBooks = result.docs; // store all books for search
            console.log(result.docs);
            books.push([result.docs])
            saveBooks()

            setupPagination(allBooks);
            displayPage(allBooks, currentPage);
            displayBorrowedBooks();
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    }
    userSearchInput.addEventListener('input', () => {
        const searchTerm = userSearchInput.value.toLowerCase();

        const filteredBooks = allBooks.filter(book => {
            const title = book.title?.toLowerCase() || '';
            const author = book.author_name?.[0]?.toLowerCase() || '';
            return title.includes(searchTerm) || author.includes(searchTerm);
        });

        currentPage = 1;
        setupPagination(filteredBooks);
        displayPage(filteredBooks, currentPage);
    });

    function displayPage(data, page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedData = data.slice(startIndex, endIndex);

        const container = document.getElementById('task');
        container.innerHTML = '';
        console.log(books);

        paginatedData.forEach((element) => {
            // Handle cases where data might be missing
            const title = element.title;
            const author = element.author_name[0];
            const coverId = element.cover_i;
            const coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
            saveBooks()
            let storydiv = document.createElement('div');
            storydiv.className = 'book-item';
            storydiv.innerHTML = `
            <div class="card" style="width: 18rem; margin: 10px;">
                <img src="${coverUrl}" class="card-img-top" alt="${title}">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${author}</p>
                    <a href="https://openlibrary.org${element.key}" class="btn btn-primary" target="_blank">View Book</a>
                    <button class="btn btn-success borrow-btn">Borrow Book</button>
                </div>
            </div>
            
        `;
            saveBooks()
            container.appendChild(storydiv);

            // Add event listener to borrow button
            const borrowBtn = storydiv.querySelector('.borrow-btn');

          borrowBtn.addEventListener('click', () => {
  // Check if book is already borrowed
  const isAlreadyBorrowed = borrowedBooks.some(book => book.title === title && book.author === author);
  if (!isAlreadyBorrowed) {
    borrowedBooks.push({
      id: element.key || Date.now().toString(),
      title: title,
      author: author,
      coverId: coverId,
      borrowDate: new Date().toLocaleDateString()
    });
    saveBorrowedBooks();
    displayBorrowedBooks();
    // Show toast notification instead of alert
    const toastEl = document.querySelector('.toast');
    const toastBody = toastEl.querySelector('.toast-body');
    toastBody.textContent = `"${title}" has been borrowed!`;
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  } else {
    // Show toast notification for already borrowed
    const toastEl = document.querySelector('.toast');
    const toastBody = toastEl.querySelector('.toast-body');
    toastBody.textContent = 'You have already borrowed this book!';
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  }
});

        });
    }

    function displayBorrowedBooks() {
        const borrowedContainer = document.getElementById('borrowedBooks');
        if (!borrowedContainer) {
            console.error('Borrowed books container not found!');
            return;
        }

        borrowedContainer.innerHTML = '<h3>Borrowed Books</h3>';

        if (borrowedBooks.length === 0) {
            borrowedContainer.innerHTML += '<p>No books borrowed yet.</p>';
            return;
        }

        borrowedBooks.forEach((book, index) => {
            const coverUrl = book.coverId ?
                `https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg` :
                'placeholder.jpg';

            const borrowedItem = document.createElement('div');
            borrowedItem.className = 'borrowed-item';
            borrowedItem.innerHTML = `
            <div class="card mb-3 container" style="display-flex;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${coverUrl}" class="img-fluid rounded-start" alt="${book.title}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <p class="card-text">${book.author}</p>
                            <p class="card-text"><small class="text-muted">Borrowed on: ${book.borrowDate}</small></p>
                            <button class="btn btn-warning return-btn" data-index="${index}">Return Book</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
            borrowedContainer.appendChild(borrowedItem);

            // Add event listener to return button
            const returnBtn = borrowedItem.querySelector('.return-btn');
            returnBtn.addEventListener('click', () => {
                const bookIndex = parseInt(returnBtn.getAttribute('data-index'));
                const removedBook = borrowedBooks.splice(bookIndex, 1)[0];
                saveBorrowedBooks();
                displayBorrowedBooks();
                // Show toast notification instead of alert
                const toastEl = document.querySelector('.toast');
                const toastBody = toastEl.querySelector('.toast-body');
                toastBody.textContent = `"${removedBook.title}" has been returned!`;
                const toast = new bootstrap.Toast(toastEl);
                toast.show();
            });
        });
    }

    function setupPagination(data) {
        const totalPages = Math.ceil(data.length / itemsPerPage);
        const paginationContainer = document.getElementById('pagination');
        if (!paginationContainer) {
            console.error('Pagination container not found!');
            return;
        }

        paginationContainer.innerHTML = '';

        // Create Previous Button
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.className = 'btn btn-primary me-2';
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                displayPage(data, currentPage);
                setupPagination(data);
            }
        });
        paginationContainer.appendChild(prevButton);

        // Add page indicator
        const pageIndicator = document.createElement('span');
        pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
        pageIndicator.className = 'mx-2';
        paginationContainer.appendChild(pageIndicator);

        // Create Next Button
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.className = 'btn btn-primary ms-2';
        nextButton.disabled = currentPage === totalPages;
        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                displayPage(data, currentPage);
                setupPagination(data);
            }
        });
        paginationContainer.appendChild(nextButton);
    }

    // Initialize the application
    document.addEventListener('DOMContentLoaded', () => {

        gettingData();

    });


    let savedUsersname = JSON.parse(localStorage.getItem('user')) || [];
    console.log(savedUsersname);
    console.log(savedUsersname.length);

    //getting total stored books

    document.getElementById('totalMembers').innerHTML = savedUsersname.length

    //showing admin the total stored books 

    savedUsersname.forEach((value, index) =>{
        document.getElementById('userNames').innerHTML = `Welcome ${value.fname}`
        saveToLocal()
    
        document.getElementById('Profiles').innerHTML = `
           <td>${value.date}</p>
          <h1>${value.fname} ${value.lname}</h1>
          <p>${value.email}</p>
        `
    
    
    
        let borrowedBooks = JSON.parse(localStorage.getItem(`borrowedBooks_${value.email}`)) || [];
        const row = document.createElement('tr')
        row.innerHTML = `
          <td>${value.date}</td>
          <td>${value.fname} ${value.lname}</td>
          <td>${value.email}</td>
          <td>${borrowedBooks.length}</td>
          <td>
            <button class="btn btn-success m-1" onclick="viewUser(${index})">View</button>
            <button class="btn btn-success m-1 " onclick="editUser(${index})">Edit</button>
            <button class="btn btn-success m-1" onclick="deleteUser(${index})">Delete</button>
          </td>
        `;
        const rows = document.createElement('tr')
        rows.innerHTML = `
          <td>${value.date}</td>
          <td>${value.fname} ${value.lname}</td>
          <td>${value.email}</td>
          <td>${borrowedBooks.length}</td>
          <td>
            <button class="btn btn-success m-1" onclick="viewUser(${index})">View</button>
            <button class="btn btn-success m-1 " onclick="editUser(${index})">Edit</button>
            <button class="btn btn-success m-1" onclick="deleteUser(${index})">Delete</button>
          </td>
        `;
        document.getElementById('recentActivities').appendChild(row)
        document.getElementById('membersTableBody').appendChild(rows)

    })

//showing the user their name so they can feel alive

   


}




{
    document.querySelectorAll('.list-group-item').forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const sections = ['dashboardSection', 'booksSection', 'membersSection', 'borrowingsSection', 'settingsSection'];
            sections.forEach(section => {
                document.getElementById(section).classList.add('d-none');
            });

            const targetSection = this.id.replace('Nav', 'Section');
            document.getElementById(targetSection).classList.remove('d-none');
        });
    });


    document.getElementById('logoutBtn').addEventListener('click', function () {
        if (confirm('Are you sure you want to logout?')) {
            window.location.href = 'login.html';
        }
    });
}