const input_link = document.getElementById('link-input')
const btn_link = document.getElementById('link-btn')
const short_links = document.getElementById('short_links')

//-------------------------------------------------------

const cancel_btn = document.getElementById('cancel-btn')
const error_box = document.querySelector('.error')
const title_error = document.getElementById('error-title')
const text_error = document.getElementById('text-error')

//-------------------------------------------------------

btn_link.addEventListener('click', createShortLink)
cancel_btn.addEventListener('click', cancelBtn)

function createShortLink() {
    if(input_link.value == '') {
        title_error.textContent = "input is emtpy"
        text_error.textContent = "you must fill the input by an URL to get the short link of this URL!!!!"
        error_box.style.display = "flex"
        return
    } 
    // API from  https://developers.rebrandly.com/reference/getaccount  (drisskhattabi666)
    const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          apikey: '9c2232d4762040a0a0c97c702e75d9ee'
        },
        body: JSON.stringify({destination: `${input_link.value}`})
      };

      var p = document.createElement('p')
      
      fetch('https://api.rebrandly.com/v1/links', options)
        .then(response => response.json())
        .then(response => { 
            //console.log(response)
            console.log(`Long URL was ${response.destination},\n short URL is ${response.shortUrl}`)
            p.textContent = response.shortUrl
        }).catch(err => {
            console.error(err)
            title_error.textContent = "API Request error"
            text_error.textContent = "sorry, but there is an error to get the short link URL, PLZ make sure that's the URL is Correct !!!!"
            error_box.style.display = "flex"
        });

    let div1 = document.createElement('div')
    let div2 = document.createElement('div')
    let div3 = document.createElement('div')
    let button = document.createElement('button')
    
    div1.classList.add('shorten-link')
    div2.classList.add('link-source')
    div3.classList.add('link-short')
    button.classList.add('btn','greenbtn')

    button.addEventListener('click', function () {
        navigator.clipboard.writeText(p.textContent)
        button.textContent = "Copied!"
        button.style.backgroundColor = "#323232"
        setTimeout(function () {
            button.textContent = "Copy"
            button.style.backgroundColor = "#09b0b0"
        },2000)
    })

    div2.textContent = input_link.value
    button.textContent = "Copy"

    div3.appendChild(p)
    div3.appendChild(button)

    div1.appendChild(div2)
    div1.appendChild(div3)

    short_links.appendChild(div1)
    input_link.value = ''
}

function cancelBtn() {
    error_box.style.display = "none"
}