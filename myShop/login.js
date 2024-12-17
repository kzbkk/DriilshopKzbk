document.addEventListener('DOMContentLoaded',function(){
    const loginForm = document.querySelector('.loginForm')
    loginForm.addEventListener('submit', function(event){
        event.preventDefault()
        const email = document.querySelector('.email').value
        const password = document.querySelector('.password').value
        const users = JSON.parse(localStorage.getItem('users')) || []
        const user = users.find(user => user.email === email && user.password === password)
        if(user){
            localStorage.setItem('currentUser',JSON.stringify(user))
            alert('You are logged into your account.')
            window.location.href = 'index.html'
        } else {
            $(".alert").html("<p>Account not found! Try again</p>");

        }
    })
})
