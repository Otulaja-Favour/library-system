
// DOM Elements - Authentication
const loginSession = document.getElementById('login');
const signSession = document.getElementById('sign');
const signupdiv = document.getElementById('signupdiv');
const logindiv = document.getElementById('logindiv');
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const email = document.getElementById('email');
const pswd = document.getElementById('pswd');
const cpswd = document.getElementById('cpswd');
const loginemail = document.getElementById('loginemail');
const loginpswd = document.getElementById('loginpswd');

// DOM Elements - User Dashboard
const part2 = document.getElementById('part2');
const part3 = document.getElementById('part3');
const userNames = document.getElementById('userNames');
const userSearchInput = document.getElementById('userSearchInput');
const task = document.getElementById('task');
const pagination = document.getElementById('pagination');
const borrowedBooks = document.getElementById('borrowedBooks');
const historyBooks = document.getElementById('historyBooks');
const refreshCatalog = document.getElementById('refreshCatalog');
const editProfileBtns = document.getElementById('editProfileBtns');
const logoutBtn = document.getElementById('logoutBtn');
const Profiles = document.getElementById('Profiles');

// DOM Elements - Admin Dashboard
const amount = document.getElementById('amount');
const totalBooks = document.getElementById('totalBooks');
const totalMembers = document.getElementById('totalMembers');
const booksBorrowed = document.getElementById('booksBorrowed');
const activedueBooks = document.getElementById('activedueBooks');
const recentActivities = document.getElementById('recentActivities');
const adminpro = document.getElementById('adminpro');
const membersTableBody = document.getElementById('membersTableBody');
const booksTableBody = document.getElementById('booksTableBody');

// Load users from localStorage
let users = JSON.parse(localStorage.getItem('user')) || [];

console.log(users);
console.log(users.length);
totalMembers.innerHTML = users.length;



// Toggle between login and signup forms
loginSession.addEventListener('click', () => {
    document.getElementById('signupdiv').style.display = 'none';
    document.getElementById('logindiv').style.display = 'block';
});

signSession.addEventListener('click', () => {
    document.getElementById('signupdiv').style.display = 'block';
    document.getElementById('logindiv').style.display = 'none';
});


// Form validation for signup
fname.addEventListener('keypress', () => {
    if(fname.value.length < 4){
        fname.style.border = '2px solid red';
        document.getElementById('fnameval').innerText = 'Please enter a valid name';
    } else {
        fname.style.border = '2px solid green';
        document.getElementById('fnameval').innerText = '';
    }
});

lname.addEventListener('keypress', () => {
    if (lname.value.length < 4) {
        lname.style.border = '2px solid red';
        document.getElementById('lnameval').innerText = 'Please enter a correct name';
    } else {
        lname.style.border = '2px solid green';
        document.getElementById('lnameval').innerText = '';
    }
});

email.addEventListener('keypress', () => {
    const mailreg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (mailreg.test(email.value)) {
        email.style.border = '2px solid green';
        document.getElementById('emailval').innerText = '';
    } else {
        email.style.border = '2px solid red';
        document.getElementById('emailval').innerText = 'Invalid email';
    }
});

pswd.addEventListener('keypress', () => {
    if (pswd.value.length >= 6) {
        pswd.style.border = '2px solid green';
        document.getElementById('pasval').innerText = '';
    } else {
        pswd.style.border = '2px solid red';
        document.getElementById('pasval').innerText = 'Password must be at least 6 characters';
    }
});

cpswd.addEventListener('keypress', () => {
    if (pswd.value === cpswd.value) {
        cpswd.style.border = '2px solid green';
        document.getElementById('cpassval').innerText = '';
    } else {
        cpswd.style.border = '2px solid red';
        document.getElementById('cpassval').innerText = 'Passwords do not match';
    }
});

// Save user data to localStorage
function saveToLocalstorage() {
    localStorage.setItem('user', JSON.stringify(users));
}

// Register a new user
function sign() {
    // Creates a new user account and adds to users array
    if(!(fname.value && lname.value && email.value && pswd.value && cpswd.value)){
        alert('Invalid credentials - all fields are required');
        return;
    }
    
    // Check if passwords match
    if(pswd.value !== cpswd.value) {
        alert('Passwords do not match');
        return;
    }
    
    // Check if email already exists
    const emailExists = users.some(user => user.email === email.value);
    if(emailExists) {
        alert('An account with this email already exists');
        return;
    }
    
    // Create new user
    const newUser = {
        firstname: fname.value,
        lastname: lname.value,
        email: email.value,
        password: pswd.value,
        date: new Date().toDateString(),
        borrowedBook: [],
        returnedbook: [],
        wishlistBook: [],
        active: navigator.onLine
    };
    
    // Add user to array
    users.push(newUser);
    
    // Save updated users array
    saveToLocalstorage();
    
    // Store the new user's index
    const newUserIndex = users.length - 1;
    localStorage.setItem('loggedInUserIndex', newUserIndex);
    
    alert('Registration successful! You are now logged in.');

    // Show user dashboard
    document.getElementById('part2').style.display = 'block';
    document.getElementById('signupdiv').style.display = 'none';
    
    // Display user name and borrowed books
    displayUserNames();
    displayBorrowedBooks();
}

// Login user authentication
function Login() {
    // Authenticates user login credentials and directs to appropriate dashboard
    if (loginemail.value === 'otulajafavour14@gmail.com' && loginpswd.value === 'qwerty12345we') {
        alert('login succesfully');
        document.getElementById('part3').style.display = 'block';
        document.getElementById('logindiv').style.display = 'none';
        return;
    }
    console.log(loginemail.value);
    console.log(loginpswd.value);
    
    let foundUserIndex = users.findIndex(user => user.email === loginemail.value && user.password === loginpswd.value);
    if (foundUserIndex !== -1) {

        // Store the logged-in user's index in localStorage for later reference
        localStorage.setItem('loggedInUserIndex', foundUserIndex);
        
        // index position of each users
        if (!users[foundUserIndex].borrowedBook) {
            users[foundUserIndex].borrowedBook = [];
        }
        if (!users[foundUserIndex].returnedbook) {
            users[foundUserIndex].returnedbook = [];
        }
        
        
        // Save any updates to user structure
        saveToLocalstorage();
        
        alert('Login Successfully');
        document.getElementById('part2').style.display = 'block';
        document.getElementById('logindiv').style.display = 'none';
        
        // Display user name on dashboard
        displayUserNames();
        // Display user's borrowed books
        displayBorrowedBooks();
        
        // Update book borrowing statistics
        if (booksBorrowed) {
            booksBorrowed.innerHTML = getTotalBorrowedBooks();
        }
        
        return;
    } else {
        alert('Invalid Email or Password');
    }
}


// Fetch books data from JSON file
async function fetchingData() {
    // Fetches books data from external JSON file
    try {
        const reponse = await fetch('data.json');
        const result = await reponse.json();

        totalBooks.innerHTML = result.novels.length;
        manipulateData(result);

        return result; 
    } catch (error) {
        console.error('error', error);
        return null;
    }
}

// Display books in catalog
function manipulateData(result) {
    // Renders book data in the UI catalog
    // Clear existing content to prevent duplicates
    booksTableBody.innerHTML = '';
    task.innerHTML = '';
    
    result.novels.forEach(novel => {
        console.log(novel);
        let noveldiv = document.createElement('div');
        let row = document.createElement('tr');
        
        // Check if the current user has already borrowed this book
        const loggedInUserIndex = localStorage.getItem('loggedInUserIndex');
        let borrowButtonHtml = `<button class="btn btn-primary borrow-btn" data-book-id="${novel.id}" data-book-title="${novel.title}" data-book-author="${novel.author}" data-book-image="${novel.image}">Borrow Book</button>`;
        
        
        
        noveldiv.innerHTML = `
        <div class="card" style="width: 18rem;">
          <img src="${novel.image}" alt="...">
          <div class="card-body">
            <h5 class="card-title">${novel.author}</h5>
            <p class="card-text">${novel.title}</p>
            <p class="card-text">${novel.genre}</p>
            <p class="card-text">${novel.status}</p>
            <a href="#" class="btn btn-primary">Details</a>
            ${borrowButtonHtml}
          </div>
        </div>
        `;
        row.innerHTML = `
         <td>${novel.id}</td>
          <td>${novel.author}</td>
        <td>${novel.title}</td>
        <td>${novel.genre}</td>
        <td>${novel.status}</td>
        <td>Limited</td>
    
        `;
        booksTableBody.appendChild(row);
        task.appendChild(noveldiv);
    });
    
    // Add event listeners to all borrow buttons
    document.querySelectorAll('.borrow-btn').forEach(button => {
        button.addEventListener('click', function() {
            borrowBook(
                this.getAttribute('data-book-id'),
                this.getAttribute('data-book-title'),
                this.getAttribute('data-book-author'),
                this.getAttribute('data-book-image')
            );
        });
    });
}

// ---------- USER BOOK MANAGEMENT FUNCTIONS ----------





// Borrow a book
function borrowBook(bookId, bookTitle, bookAuthor, bookImage) {
    const loggedInUserIndex = localStorage.getItem('loggedInUserIndex');
    
    if (loggedInUserIndex === null) {
        alert('Please login to borrow books');
        return;
    }
    
    const user = users[parseInt(loggedInUserIndex)];
    
    // Initialize borrowedBook array if it doesn't exist
    if (!user.borrowedBook) {
        user.borrowedBook = [];
    }
    
    // Check if book is already borrowed by this user (handle both formats)
    const isAlreadyBorrowed = user.borrowedBook.some(book => {
        if (typeof book === 'string') {
            return book === bookId;
        } else {
            return book.id === bookId;
        }
    });
    
    if (isAlreadyBorrowed) {
        alert('You have already borrowed this book!');
        return;
    }
    
    // Convert old format (string IDs) to new format (book objects)
    if (user.borrowedBook.some(book => typeof book === 'string')) {
        // If we find any string IDs, convert all to new format
        const convertedBorrowedBooks = [];
        
        // Process existing string IDs asynchronously
        const processExistingBooks = async () => {
            for (const item of user.borrowedBook) {
                if (typeof item === 'string') {
                    const bookDetails = await fetchBookDetails(item);
                    if (bookDetails) {
                        convertedBorrowedBooks.push(bookDetails);
                    }
                } else {
                    convertedBorrowedBooks.push(item);
                }
            }
            
            // Add the new book
            convertedBorrowedBooks.push({
                id: bookId,
                title: bookTitle,
                author: bookAuthor,
                image: bookImage,
                borrowDate: new Date().toLocaleDateString()
            });
            
            
            // Update user's borrowed books with converted list
            user.borrowedBook = convertedBorrowedBooks;
            
            // Save updated user data
            saveToLocalstorage();
            
            // Complete the process
            finalizeBorrowProcess(bookTitle);
        };
        
        processExistingBooks();
    } else {
        // Directly add new book if no conversion needed
        user.borrowedBook.push({
            id: bookId,
            title: bookTitle, 
            author: bookAuthor,
            image: bookImage,
            borrowDate: new Date().toLocaleDateString()
        });
        
        // Save updated user data
        saveToLocalstorage();
        
        // Complete the process
        finalizeBorrowProcess(bookTitle);
    }
}

// Helper function to finalize the borrowing process
function finalizeBorrowProcess(bookTitle) {
    // Update display
    displayUserNames();
    displayBorrowedBooks();
    
    // Update book borrowing statistics
    if (booksBorrowed) {
        booksBorrowed.innerHTML = getTotalBorrowedBooks();
    }
    
    // Show success alert
    alert(`"${bookTitle}" has been borrowed successfully!`);
    
    // Refresh book catalog to show updated borrow status
    fetchingData();
}

// Return a book
function returnBook(bookIndex) {
    const loggedInUserIndex = localStorage.getItem('loggedInUserIndex');
    
    if (loggedInUserIndex === null) {
        alert('Please login to return books');
        return;
    }
    
    const user = users[parseInt(loggedInUserIndex)];
    
    if (!user.borrowedBook || bookIndex >= user.borrowedBook.length) {
        alert('Book not found in your borrowed list');
        return;
    }
    
    // Get book details before removing
    const returnedBook = user.borrowedBook[bookIndex];
    
    // Handle both string IDs and full book objects
    if (typeof returnedBook === 'string') {
        // For old format (just ID strings)
        fetchBookDetails(returnedBook).then(bookDetails => {
            if (bookDetails) {
                completeReturnProcess(user, bookIndex, bookDetails);
            } else {
                alert('Error retrieving book details. Please try again later.');
            }
        });
    } else {
        // For new format (full book objects)
        completeReturnProcess(user, bookIndex, returnedBook);
    }
}

// Helper function to complete the book return process
function completeReturnProcess(user, bookIndex, returnedBook) {
    // Initialize returnedbook array if it doesn't exist
    if (!user.returnedbook) {
        user.returnedbook = [];
    }
    
    // Add to returned books history
    user.returnedbook.push({
        ...returnedBook,
        returnDate: new Date().toLocaleDateString()
    });
    
    // Store the title before removing the book
    const bookTitle = returnedBook.title;
    
    // Remove from borrowed books
    user.borrowedBook.splice(bookIndex, 1);
    
    // Save updated user data
    saveToLocalstorage();
    
    // Update display
    displayUserNames();
    displayBorrowedBooks();
    
    // Update book borrowing statistics
    if (booksBorrowed) {
        booksBorrowed.innerHTML = getTotalBorrowedBooks();
    }
    
    // Show success alert
    alert(`"${bookTitle}" has been returned successfully!`);
    
    // Refresh book catalog to show updated borrow status
    fetchingData();
}

// Display borrowed books for the current user
function displayBorrowedBooks() {
    const borrowedContainer = document.getElementById('borrowedBooks');
    if (!borrowedContainer) {
        console.error('Borrowed books container not found!');
        return;
    }

    const loggedInUserIndex = localStorage.getItem('loggedInUserIndex');

    if (loggedInUserIndex === null) {
        borrowedContainer.innerHTML = '<h3>Borrowed Books</h3><p>Please login to view your borrowed books.</p>';
        return;
    }

    const user = users[parseInt(loggedInUserIndex)];

    // Clear the container before adding content
    borrowedContainer.innerHTML = '<h3>Borrowed Books</h3>';

    // Check if the user has a borrowedBook array
    if (!user.borrowedBook) {
        user.borrowedBook = [];
        saveToLocalstorage();
    }

    // If no books borrowed, show a message
    if (user.borrowedBook.length === 0) {
        borrowedContainer.innerHTML += '<p>No books borrowed yet.</p>';
        return;
    }

    // Create a container for the books
    const booksContainer = document.createElement('div');
    booksContainer.className = 'borrowed-books-container';
    borrowedContainer.appendChild(booksContainer);

    // Add each borrowed book to the container
    user.borrowedBook.forEach((book, index) => {
        const coverUrl = book.image || 'placeholder.jpg';

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
                        <p class="card-text"><small class="text-muted">Borrowed on: ${book.borrowDate || 'Unknown date'}</small></p>
                        <button class="btn btn-warning return-btn" data-index="${index}">Return Book</button>
                    </div>
                </div>
            </div>
        </div>
        `;
        booksContainer.appendChild(borrowedItem);

        // Add event listener to the return button
        const returnBtn = borrowedItem.querySelector('.return-btn');
        returnBtn.addEventListener('click', () => {
            returnBook(index);
        });
    });
}
users.forEach((user, userIndex) => {
    if (user.borrowedBook && user.borrowedBook.length > 0) {
        user.borrowedBook.forEach((book, bookIndex) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.firstname} ${user.lastname}</td> 
                <td>${book.title}</td>
                <td>${book.author}</td> 
                <td>${book.borrowDate }</td> 
                <td>${navigator.onLine }</td> 
            `;
            document.getElementById('borrowingsTableBody').appendChild(row);
        });
    }
});
    // Add event listeners to return buttons
    setTimeout(() => {
        document.querySelectorAll('.return-btn').forEach(button => {
            button.addEventListener('click', function() {
                const bookIndex = parseInt(this.getAttribute('data-index'));
                returnBook(bookIndex);
            });
        });
    }, 100); // Short timeout to ensure all books are rendered
// }

// Helper function to fetch book details by ID
async function fetchBookDetails(bookId) {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        
        // Find the book with matching ID
        const book = data.novels.find(novel => novel.id === bookId);
        
        if (book) {
            return {
                id: book.id,
                title: book.title,
                author: book.author,
                image: book.image,
                borrowDate: new Date().toLocaleDateString() // Assuming borrow date is now
            };
        } else {
            console.error(`Book with ID ${bookId} not found`);
            return null;
        }
    } catch (error) {
        console.error('Error fetching book details:', error);
        return null;
    }
}

// Helper function to add a borrowed book to the display
function addBorrowedBookToDisplay(book, index, container) {
    const coverUrl = book.image || 'placeholder.jpg';
    
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
                    <p class="card-text"><small class="text-muted">Borrowed on: ${book.borrowDate || 'Unknown date'}</small></p>
                    <button class="btn btn-warning return-btn" data-index="${index}">Return Book</button>
                </div>
            </div>
        </div>
    </div>
    `;
    container.appendChild(borrowedItem);
}

// Display user name on dashboard
function displayUserNames() {
    // Shows the currently logged in user's name on the dashboard
    const loggedInUserIndex = localStorage.getItem('loggedInUserIndex');
    if (loggedInUserIndex === null) {
        userNames.innerText = 'Welcome, Guest';
        return;
    }
   
    const user = users[parseInt(loggedInUserIndex)];
    userNames.innerText = `Welcome, ${user.firstname} ${user.lastname}`;
    
    // Show user's book statistics
    if (borrowedBooks) {
        user
        borrowedBooks.innerText = user.borrowedBook ? user.borrowedBook.length : 0;

        amount.innerText = user.borrowedBook.length
       
    }
    
    if (historyBooks) {
        console.log(user)
        console.log(user.returnedbook );
       
        
        document.getElementById('hamount').innerText = user.returnedbook.length
    }
    
  
}
console.log(users);

users.forEach(value =>{
    console.log(value);
    
    value.returnedbook.forEach(element => {
    console.log(element, 55);
    console.log(element.title);
    
    
    historyBooks.innerHTML = `${element.title}  `;
});
})

// ---------- ADMIN FUNCTIONS ----------

// Display all users in admin dashboard
function renderUsers() {
    // Displays all registered users in the admin dashboard
    membersTableBody.innerHTML = '';
    recentActivities.innerHTML = '';
    
    users.forEach((user, index) => {
        const row = document.createElement('tr');
        const rows = document.createElement('tr');
        row.innerHTML = `
          <td>${user.firstname}</td>
          <td>${user.lastname}</td>
        <td>${user.email}</td>
        <td>${user.active}</td>
        <td>${user.date}</td>

        <td>
        <button class="btn" onclick="viewUser(${index})">View</button>
        <button class="btn " onclick="editUser(${index})">Edit</button>
        <button class="btn" onclick="deleteUser(${index})">Delete</button>
        </td>
        `;

        rows.innerHTML = `
        <td>${user.firstname}</td>
        <td>${user.lastname}</td>
      <td>${user.email}</td>
      <td>${user.date}</td>
      <td>${user.borrowedBook ? user.borrowedBook.length : 0}</td>
      `;
        membersTableBody.appendChild(row);
        recentActivities.appendChild(rows);
    });
}

// Delete user (admin function)
function deleteUser(index) {
    // Removes a user from the system
    if (confirm('Are you sure ?')) {
        users.splice(index, 1);
        saveToLocalstorage();
        renderUsers();
    }
}

// View user details (admin function)
function viewUser(index) {
    // Displays detailed information about a specific user
    const user = users[index];
    
    const existingModal = document.getElementById('exampleModal');
    if (existingModal) {
        existingModal.remove();
    }

    const modals = `<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <p>${user.firstname}</p>
    <p>${user.lastname}</p>
    <p>${user.email}</p>
    <p>${user.active ? 'Online' : 'Offline'}</p>
    <p>${user.date}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>`;

    document.body.insertAdjacentHTML('beforeend', modals);

    const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.show();
}

// Edit user profile
function editUser(index) {
    // Opens a modal to edit user information
    const user = users[index];
    console.log(user);

    // Remove any existing modal to avoid duplicates
    const existingModal = document.getElementById('exampleModal');
    if (existingModal) {
        existingModal.remove();
    }

    const modals = `
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Profile</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <label for="editFirstname">First Name:</label>
                        <input type="text" id="editFirstname" class="form-control" value="${user.firstname}">
                        <label for="editLastname" class="mt-2">Last Name:</label>
                        <input type="text" id="editLastname" class="form-control" value="${user.lastname}">
                        <label for="editEmail" class="mt-2">Email:</label>
                        <input type="email" id="editEmail" class="form-control" value="${user.email}">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onclick="editagain(${index})" type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>`;

    document.body.insertAdjacentHTML('beforeend', modals);

    const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.show();
}

// Save edited user information
function editagain(index) {
    // Saves updated user information to the system
    const updatedFirstname = document.getElementById('editFirstname').value.trim();
    const updatedLastname = document.getElementById('editLastname').value.trim();
    const updatedEmail = document.getElementById('editEmail').value.trim();

    if (!updatedFirstname || !updatedLastname || !updatedEmail) {
        alert('All fields are required!');
        return;
    }

    users[index].firstname = updatedFirstname;
    users[index].lastname = updatedLastname;
    users[index].email = updatedEmail;

    saveToLocalstorage();

    // renderUsers();
    displayUserNames()
    displayBorrowedBooks()

    const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
    modal.hide();
    renderUsers()


    document.getElementById('exampleModal').remove();

    alert('Profile updated successfully!');
}

// ---------- DASHBOARD STATISTICS FUNCTIONS ----------

// Get total borrowed books count
function getTotalBorrowedBooks() {
    // Calculates the total number of books borrowed across all users
    const totalBorrowed = users.reduce((total, user) => {
        if (user.borrowedBook && Array.isArray(user.borrowedBook)) {
            return total + user.borrowedBook.length;
        }
        return total;
    }, 0);
    console.log(`Total Borrowed Books: ${totalBorrowed}`);
    return totalBorrowed;
}

// Get count of active users with due books
function activedueBook() {
    // Counts the number of online users who have borrowed books
    const activeUsers = users.filter(user => 
        user.active === true || user.active === 'online' || user.active === navigator.onLine
    );
    
    const activeUsersWithBooks = activeUsers.filter(user => 
        user.borrowedBook && user.borrowedBook.length > 0
    );
    
    return activeUsersWithBooks.length;
}

// ---------- EVENT LISTENERS ----------

// Edit profile button event
document.getElementById('editProfileBtns').addEventListener('click', () => {
    const loggedInUserIndex = localStorage.getItem('loggedInUserIndex');
    if (loggedInUserIndex === null) {
        alert('Please login to edit your profile.');
        return;
    }
    editUser(parseInt(loggedInUserIndex));
});

// Navigation menu events
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

// Logout button event
document.getElementById('logoutBtn').addEventListener('click', function () {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('loggedInUserIndex');
        window.location.href = 'login.html';
    }
});

// ---------- INITIALIZATION ----------

// Check if user is logged in and display username
if (localStorage.getItem('loggedInUserIndex') !== null) {
    displayUserNames();
    displayBorrowedBooks();
}

// Initialize statistics displays
booksBorrowed.innerHTML = getTotalBorrowedBooks();
activedueBooks.innerHTML = activedueBook();

// Render users list and fetch books catalog
renderUsers();
fetchingData();

// Add event for refresh catalog button
if (refreshCatalog) {
    refreshCatalog.addEventListener('click', () => {
        fetchingData();
    });
}

function clearLocalStorage() {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
        localStorage.clear();
        alert('Local storage has been cleared.');
        window.location.reload(); 
    }
}

function toggleDarkMode() {
    const isDarkMode = document.getElementById('darkModeToggle').checked; // Check if the toggle is checked

    if (isDarkMode) {
        document.body.classList.add('dark-mode'); // Add dark mode class to the body
        localStorage.setItem('darkMode', 'enabled'); // Save preference to local storage
    } else {
        document.body.classList.remove('dark-mode'); // Remove dark mode class from the body
        localStorage.setItem('darkMode', 'disabled'); // Save preference to local storage
    }
}

// Initialize Dark Mode on Page Load
function initializeDarkMode() {
    const darkModePreference = localStorage.getItem('darkMode'); // Get preference from local storage

    if (darkModePreference === 'enabled') {
        document.body.classList.add('dark-mode'); // Enable dark mode
        document.getElementById('darkModeToggle').checked = true; // Set the toggle to checked
    } else {
        document.body.classList.remove('dark-mode'); // Disable dark mode
        document.getElementById('darkModeToggle').checked = false; // Set the toggle to unchecked
    }
}