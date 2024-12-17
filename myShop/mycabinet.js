const oldpass  = document.querySelector('.oldpass')
const newpass  = document.querySelector('.newpass')
const currentUser = JSON.parse(localStorage.getItem('currentUser'))
console.log(currentUser)
if (currentUser) {
    document.querySelector('.nameP').textContent = `Assalamaleikum ${currentUser.name}!`
    document.querySelector('.emailP').textContent = `Email: ${currentUser.email}`
    document.querySelector('.reset').addEventListener('click',()=>{
        if(currentUser.password == oldpass.value){
            currentUser.password = newpass.value
            $(".alert").html("<p>Successfully changed</p>")
        }else{
            $(".alert").html("<p>Incorrect password!</p>")
        }
    })
    document.querySelector('.exit').addEventListener('click',()=>{
        localStorage.removeItem('currentUser')
        alert('You have been logged out.')
        window.location.href = 'index.html'
    })
} else {
    $('.btnRegis').text('Login')
}  
