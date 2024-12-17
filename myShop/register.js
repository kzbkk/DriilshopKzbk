document.addEventListener('DOMContentLoaded',function(){
    const registerForm = document.querySelector('.registerForm')
    registerForm.addEventListener('submit', function(event){
        event.preventDefault()
        const name = document.querySelector('.name').value
        const email = document.querySelector('.email').value
        const password = document.querySelector('.password').value
        let users = JSON.parse(localStorage.getItem('users')) || []
        const user = {
            name,
            email,
            password
        }
        if (password.length>7 && password.length<16){ 
            const users = JSON.parse(localStorage.getItem('users')) || []
            const createduser = users.find(user => user.email === email && user.password === password)
            if(createduser){
                $(".alert").html("<p>You already have an account. Log in!</p>");
            }else{
                users.push(user)
                localStorage.setItem('users', JSON.stringify(users))
                localStorage.setItem('currentUser', JSON.stringify(user))
                alert('Registration successful')
                window.location.href = 'index.html'
            }
            
        }else{
            $(".alert").html("<p>Incorrect password length! Password must be more than 8 and less than 16 characters</p>");
        }
    })
})
