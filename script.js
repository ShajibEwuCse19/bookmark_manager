
 const bookmarkManager = document.getElementById('bookmark-manager');
 const addBookmarkButton = document.getElementById('add-bookmark-button');
 const addBookmarkModal = document.getElementById('add-bookmark-modal');
 const bookmarkForm = document.getElementById('bookmark-form');
 const newCategoryButton = document.getElementById('new-category-button');
 const newCategoryName = document.getElementById('new-category-name');

 addBookmarkButton.addEventListener('click', openAddBookmarkModal);
 bookmarkForm.addEventListener('submit', addBookmark);
 newCategoryButton.addEventListener('click', toggleNewCategoryField);

 function openAddBookmarkModal() {
     addBookmarkModal.style.display = 'block';
     const categories = JSON.parse(localStorage.getItem('categories')) || [];
     const categorySelect = document.getElementById('category');
     categorySelect.innerHTML = '<option value="">Select Category</option>';
     categories.forEach((category) => {
         const option = document.createElement('option');
         option.value = category;
         option.textContent = category;
         categorySelect.appendChild(option);
     });
 }

 function toggleNewCategoryField() {
     const newCategoryField = document.getElementById('new-category-name');
     const categorySelect = document.getElementById('category');

     if (newCategoryButton.textContent === '+') {
         categorySelect.style.display = 'none';
         newCategoryField.style.display = 'block';
         newCategoryButton.textContent = '-';
     } else {
         categorySelect.style.display = 'block';
         newCategoryField.style.display = 'none';
         newCategoryButton.textContent = '+';
     }
 }

 function addBookmark(event) {
     event.preventDefault();

     const title = document.getElementById('title').value;
     const url = document.getElementById('url').value;
     let category = document.getElementById('category').value;
     const newCategory = document.getElementById('new-category-name').value;

     if (newCategoryButton.textContent === '+') {
         if (!category) {
             alert('Please select or enter a category.');
             return;
         }
     } else {
         category = newCategory;
     }

     let categories = JSON.parse(localStorage.getItem('categories')) || [];
     if (!categories.includes(category)) {
         categories.push(category);
         localStorage.setItem('categories', JSON.stringify(categories));
     }

     const bookmark = {
         title,
         url,
         category,
     };

     const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
     bookmarks.push(bookmark);
     localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

     document.getElementById('title').value = '';
     document.getElementById('url').value = '';
     category = '';
     document.getElementById('category').value = '';
     document.getElementById('new-category-name').value = '';

     addBookmarkModal.style.display = 'none';

     displayCategoriesAndBookmarks();
 }

 function displayCategoriesAndBookmarks() {
     bookmarkManager.innerHTML = '';

     const categories = JSON.parse(localStorage.getItem('categories')) || [];
     const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

     categories.forEach((category) => {
         const categoryBox = document.createElement('div');
         categoryBox.className = 'category-box';
         categoryBox.textContent = category;

         const categoryBookmarks = bookmarks.filter((bookmark) => bookmark.category === category);

         if (categoryBookmarks.length > 0) {
             categoryBookmarks.forEach((bookmark) => {
                 const bookmarkItem = document.createElement('div');
                 bookmarkItem.className = 'bookmark-item';
                 bookmarkItem.innerHTML = `<a href="${bookmark.url}" target="_blank">${bookmark.title}</a> <button class="details-button">Details</button>`;
                 
                 bookmarkItem.querySelector('.details-button').addEventListener('click', () => {
                     displayBookmarkDetails(bookmark);
                 });

                 categoryBox.appendChild(bookmarkItem);
             });
         } else {
             categoryBox.textContent += ' (No bookmarks)';
         }

         bookmarkManager.appendChild(categoryBox);
     });
 }

 function displayBookmarkDetails(bookmark) {
    const detailsContainer = document.getElementById('bookmark-details-container');
    detailsContainer.innerHTML = `
        <h2>Bookmark Details</h2>
        <p><strong>Title:</strong> ${bookmark.title}</p>
        <p><strong>URL:</strong> <a href="${bookmark.url}" target="_blank">${bookmark.url}</a></p>
        <p><strong>Category:</strong> ${bookmark.category}</p>
    `;
    detailsContainer.style.display = 'block';
}

 displayCategoriesAndBookmarks();

const exampleBookmarks = [
    {
        title: "Facebook",
        url: "https://www.facebook.com",
        category: "Tech",
    },
    {
        title: "SELISE",
        url: "https://selisegroup.com/",
        category: "Coding",
    },
    {
        title: "AngularJS",
        url: "https://www.angularjs.com",
        category: "Search",
    },
    {
        title: "ReactJS",
        url: "https://www.reactjs.com",
        category: "Search",
    },
    {
        title: "Instagram",
        url: "https://www.instagram.com",
        category: "Search",
    },
    {
        title: "openAI",
        url: "https://www.openai.com",
        category: "Search",
    },
    {
        title: "GitHub",
        url: "https://github.com",
        category: "Coding",
    },
    {
        title: "Google",
        url: "https://www.google.com",
        category: "Search",
    },
    
];

function displayExampleBookmarks() {
    const bookmarkManager = document.getElementById('bookmark-manager');

    exampleBookmarks.forEach((bookmark) => {
        const categoryBox = document.createElement('div');
        categoryBox.className = 'category-box';

        const bookmarkItem = document.createElement('div');
        bookmarkItem.className = 'bookmark-item';
        bookmarkItem.innerHTML = `<a href="${bookmark.url}" target="_blank">${bookmark.title}</a>`;
        
        categoryBox.appendChild(bookmarkItem);
        bookmarkManager.appendChild(categoryBox);
    });
}

document.getElementById('contact-button').addEventListener('click', function () {
    document.getElementById('bookmark-manager').style.display = 'none';
    
    document.getElementById('contact-page').style.display = 'block';
});

displayExampleBookmarks();
