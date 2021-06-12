const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const err = document.getElementById('error')
const msgUpdate = document.getElementById('weather-update')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    err.textContent = 'Loading.....'
    msgUpdate.textContent = ''
    const location = search.value
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data)=> {
            if(data.error) {
                 return err.textContent = data.error
            }
            err.textContent = ''
            msgUpdate.innerHTML = "Query Location: "+data.location+"<br/>"+data.forecastData
        });
    })
})