document.addEventListener('DOMContentLoaded', function(){
    const cartContainer = document.querySelector('.element')
    const cartPrice = document.querySelector('.price')
    let curUser = JSON.parse(localStorage.getItem('currentUser'))
    if (!curUser){
        alert('Register to view your cart.')
        window.location.href = 'register.html'
        return
    }
    let cart = JSON.parse(localStorage.getItem(`${curUser.email}-cart`)) || []
    function renderCart(){
        cartContainer.innerHTML = ''
        let totalPrice = 0

        cart.forEach(item => {
            const elemContainer = document.createElement('div')
            elemContainer.classList.add('elemContainer')
            
            const image = document.createElement('img')
            image.classList.add('imageSneaker')
            image.src = item.thumbnail
            const name = document.createElement('h2')
            name.textContent = item.brand
            const model = document.createElement('p')
            model.textContent = item.make
            const price = document.createElement('p')
            price.textContent = `$${item.retailPrice}`
            const quantityCont = document.createElement('div')
            quantityCont.classList.add('quanCont')
            const minusbtn = document.createElement('button')
            minusbtn.textContent = '-'
            minusbtn.classList.add('quanbtn');
            minusbtn.addEventListener('click', () => quanChange(item._id, -1))
            const quantity = document.createElement('p')
            quantity.textContent = item.count
            const plusbtn = document.createElement('button')
            plusbtn.textContent = '+'
            plusbtn.classList.add('quantity-btn');
            plusbtn.addEventListener('click', () => quanChange(item._id, 1))
            quantityCont.append(plusbtn,quantity,minusbtn)
            elemContainer.append(image, name, model, price, quantityCont)
            cartContainer.append(elemContainer)
            totalPrice += item.retailPrice * item.count
        });
        cartPrice.textContent = `$${totalPrice.toFixed(2)}`
    }
    function quanChange(productId, newt) {
        const cartItem = cart.find(item => item._id === productId)
        if (cartItem) {
            cartItem.count += newt
        if (cartItem.count <= 0) {
            cart = cart.filter(item => item._id !== productId)
        }
            localStorage.setItem(`${curUser.email}-cart`, JSON.stringify(cart))
            renderCart()
        }
    }
    renderCart()
})



