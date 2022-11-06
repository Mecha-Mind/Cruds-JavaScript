let title = document.getElementById('title');
let price = document.getElementById('price');
let tax = document.getElementById('tax');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('create');
let byTitle = document.getElementById('byTitle');
let byCategory = document.getElementById('byCategory');

let mood = 'Create';
let pesudoI;

//get total

function getTotal() {
  if (price.value != '') {
    let result = (+price.value + +tax.value + +ads.value) - +discount.value;
    total.innerHTML = result;
    total.style.cssText = 'background-color: #040; font-weight: bold; padding: 3px 6px; border-radius: 8px;'
  }else {
    total.style.cssText = 'background-color: red; font-weight: bold; padding: 3px 6px; border-radius: 8px;'
    
  }
}

// create new product

let dataPro;

if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
}else {
  dataPro = [];
}

create.onclick = function() {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    tax: tax.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  }

// count creating product

  if(title.value != '' && price.value != '' && category.value != '' && newProduct.count < 100){
    if (mood === 'Create'){
      if (newProduct.count > 1) {
        for(let i=0; i<newProduct.count; i++) {
          dataPro.push(newProduct);
        }
      }else{
        dataPro.push(newProduct);
      }
    }else {
      dataPro[pesudoI] = newProduct;
      count.style.display = 'block';
      create.innerHTML = 'Create';
    }
    // clear inputs data
    clearData();
  }
  // save localstorage
  localStorage.setItem('product', JSON.stringify(dataPro));
  // console.log(dataPro)


  // show products data
  showData();
}
// clear inputs
function clearData() {
  title.value = '';
  price.value = '';
  tax.value = '';
  ads.value = '';
  discount.value = '';
  total.innerHTML = '';
  count.value = '';
  category.value = '';
}

// read
function showData() {
  let table = '';
  for(let i = 0; i<dataPro.length; i++) {
    table += `
      <tr>
        <td>${i +1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].tax}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateItem(${i})" id="update">update</button></td>
        <td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
      </tr>
    `
    getTotal();
  }

  document.getElementById('tbody').innerHTML = table;
  // delete all checking
  let delAllDiv = document.querySelector('#delete-all');
  // delAllDiv.id = 'delete-all';
  // where to place the button
  // document.querySelector('.inputs').append(delAllDiv);
  // there's issue for append method the div not deleted directly needed a refresh page.

  
  if(dataPro.length > 0) {
    delAllDiv.innerHTML = `<button onclick="deleteAll()">Delete All (${dataPro.length}) Items</button>`;
  }else {
    delAllDiv.innerHTML = '';
  }
}
showData()

// update
function updateItem(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  tax.value = dataPro[i].tax;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  getTotal();
  count.style.display = 'none';
  category.value = dataPro[i].category;
  create.innerHTML = 'Update';
  mood = 'update';
  pesudoI = i;
  scroll({
    top: 0,
    behavior: 'smooth',
  })
}


// delete
function deleteItem(i) {
  dataPro.splice(i,1);
  localStorage.product = JSON.stringify(dataPro);
  showData()
}

// delete All
function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}
// search
let searchMood = 'title';

function getSearchId(id) {
  let search = document.querySelector('#search');
  if (id == 'byTitle') {
    searchMood = 'title';
    byCategory.style.backgroundColor = '';
    byTitle.style.backgroundColor = '#f90';
    
  }else {
    byTitle.style.backgroundColor = '';
    byCategory.style.backgroundColor = '#f90';
    searchMood = 'category';
  }
  search.placeholder = 'Search By ' + searchMood.toUpperCase();
  search.focus()
  search.value = '';
  showData();
}

/////////////

function searchItem(value) {
  let table = '';
  for(let i=0; i<dataPro.length; i++){
    if(searchMood == 'title') {
        if(dataPro[i].title.includes(value.toLowerCase())){
          table += `
            <tr>
              <td>${i +1}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].tax}</td>
              <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].category}</td>
              <td><button onclick="updateItem(${i})" id="update">update</button></td>
              <td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
            </tr>
        `
        }
      
    }else {
        if(dataPro[i].category.includes(value.toLowerCase())){
          table += `
            <tr>
              <td>${i +1}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].tax}</td>
              <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].category}</td>
              <td><button onclick="updateItem(${i})" id="update">update</button></td>
              <td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
            </tr>
        `
        }
      
    }
  }
  document.getElementById('tbody').innerHTML = table;
  
}

// clean data
