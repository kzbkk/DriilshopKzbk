const url = 'https://sneaker-database-stockx.p.rapidapi.com/getproducts?keywords=nike&limit=150';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '82e48b536cmsh59b953cabc5f382p192d47jsn44f799a8ec75',
		'x-rapidapi-host': 'sneaker-database-stockx.p.rapidapi.com'
	}
};
const catalog = document.querySelector('.catalog')

data = []


function saveToLocalStorage(data) {
    localStorage.setItem('sneakerData', JSON.stringify(data));
}

function loadFromLocalStorage() {
    return JSON.parse(localStorage.getItem('sneakerData')) || [];
}

let savedData = loadFromLocalStorage();
if (savedData.length > 0) {
    data = savedData;
    render(data);
} else {
   
    fetch(url, options)
        .then(data => data.json())
        .then(answer => {
            console.log(answer);
            data = data.concat(answer);
            saveToLocalStorage(data);
            render(data);
        });
}


// //Добав в корз
function addToBasket(product_id) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (!currentUser) {
        alert('Пожалуйста, зарегистрируйтесь, чтобы добавить товар в корзину.')
        window.location.href = 'register.html'
        return
    }
    const prod = data.find(element => element._id === product_id)
    const cart = JSON.parse(localStorage.getItem(`${currentUser.email}-cart`)) || []
    const cartItem = cart.find(elem => elem._id === product_id)
    if (cartItem) {
        cartItem.count++
    } else {
        cart.push({ ...prod, count: 1 })
    }
    localStorage.setItem(`${currentUser.email}-cart`, JSON.stringify(cart))
    $('.added').text('added').fadeIn(300).delay(1500).fadeOut(300)
}

//Карусель
$(document).ready(function(){
    const track = $(".carousel-trakcer")
    const items = $(".carousel-item")
    const itemWidth = $(".carousel-item").outerWidth()
    let curIndex = 0
    function updateCarousel(){
        const position = -curIndex*itemWidth
        track.css("transform",`translateX(${position}px)`)
    }
        setInterval( function(){
        
            if (curIndex<items.length-1){
                curIndex++
                updateCarousel()
            }else{
                curIndex = 0
                updateCarousel()
            }} , 3000)

        })
//функ ренд
function render(data){  
    catalog.innerHTML = '' 
    data.forEach(elem => {
        const block = document.createElement('div')
        block.classList.add('elemContainer')
        block.setAttribute('data-price', elem.retailPrice)
        const image = document.createElement('img')
        image.classList.add('imageSneaker')
        image.src = elem.thumbnail
        const name = document.createElement('h2')
        name.textContent = elem.brand
        const model = document.createElement('P')
        model.textContent = elem.make
        const price = document.createElement('P')
        price.textContent = `$${elem.retailPrice}`
        const butBasket = document.createElement('button')
        butBasket.classList.add('butBas')
        const imageBas = document.createElement('img')
        imageBas.classList.add('imageBas')
        imageBas.src = 'img/371979.svg'
        butBasket.append(imageBas)
        block.append(image)
        block.append(name)
        block.append(model)
        block.append(price)
        block.append(butBasket)
        catalog.append(block) 
        butBasket.addEventListener('click', () => addToBasket(elem._id))
            })
        }

//поиск
document.querySelector('.search').addEventListener('input',(event)=>{
    const query = event.target.value.toLowerCase()
    const filt = data.filter(item => item.make.toLowerCase().includes(query))
    render(filt)})
function Sort(){
    let container = document.querySelector('.catalog')
    let tov = Array.from(container.children)
    tov.sort((a,b) =>{
        return a.getAttribute('data-price') - b.getAttribute('data-price')})
    container.innerHTML = ''
    tov.forEach(tov => container.appendChild(tov))}
function SortD(){
    let container = document.querySelector('.catalog')
    let tov = Array.from(container.children)
    tov.sort((a, b) => {
        return b.getAttribute('data-price') - a.getAttribute('data-price')
    })
    container.innerHTML = ''
    tov.forEach(tov => container.appendChild(tov))
    }
document.querySelector('select').addEventListener('change',(event)=>{
    const value = event.target.value
    if (value === 'Цена по возрастанию'){
        Sort()}
    else if (value === 'Цена по убыванию'){
        SortD()}
    else{
        render(data)}
})
//Чек регис
const currentUser = JSON.parse(localStorage.getItem('currentUser'))
console.log(currentUser);

if (currentUser) {
    $('.btnRegis').text('mycabinet').click(function(){
        window.location.href = 'mycabinet.html'
    })
} else {
    $('.btnRegis').text('Login').click(function() { 
        window.location.href = 'register.html'
    })
}  




