// git
let btn = document.getElementById("dmo_btn")
let dmo = document.getElementById("demo")
let rpo = document.getElementById("repos")

// nasa
let nasa = document.getElementById("nasa_pic_btn")
let nasa_pic = document.getElementById("nasa_pic")

let neb = document.getElementById("near_earth_btn")


// BUTTON CLICKERS
btn.onclick = function(e){
    e.preventDefault()
    btn.style.display="none";
    fetch("https://api.github.com/users/xtina-lt")
    .then(response => response.json() )
    .then(data => {
        console.log(`${data['login']}, ${data['public_repos']}, ${data["avatar_url"]}`)
        dmo.innerHTML += `<img src="${data["avatar_url"]}" alt="user"> <p><h1>${data['login']}</h1></p> <p><h3>${data['public_repos']} total repos</h3></p>`
    })

    fetch("https://api.github.com/users/xtina-lt/repos")
    .then(response => response.json() )
    .then(data => {
        for (let i of data){
            dmo.innerHTML += `<ul><li>${i['name']}</li><li>${i['language']}</li><li>${i['description']}</li><li>${i['git_url']}</li></li></ul>`
        }
        // var repos = [];
        // for (let i of data) {
        //     i = {
        //         name: i['name'],
        //         language: i['language'],
        //         description: i['description'],
        //         git_url: i['git_url']
        //     }
        //     repos.push(i)
        // }
    })    
}


nasa.onclick = function(e){
    e.preventDefault()
    nasa.style.display="none";
    fetch("https://api.nasa.gov/planetary/apod?api_key=3KkgRlwnICH7iFypbZUahiaipjBkihVfzvYbVB3P")
    .then(response => response.json() )
    .then(data => {
        nasa_pic.innerHTML += `<ul><li><img src="${data['url']}"></img></li><li>${data['title']}</li><li>${data['date']}</li><li>${data['explanation']}</li></ul>`
    }) 
}

neb.onclick = function(e){
    e.preventDefault()
    neb.style.display="none";
    fetch("https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=3KkgRlwnICH7iFypbZUahiaipjBkihVfzvYbVB3P")
    .then(response => response.json() )
    .then(data => {
        let start_date = '2015-09-07'
        let end_date='2015-09-08'

        const body = document.getElementById("near_earth")
        let tbl = document.createElement('table')
        const tr = tbl.insertRow()
            const td = tr.insertCell()
                td.appendChild(document.createTextNode(`Name`))
            const td2 = tr.insertCell()
                td2.appendChild(document.createTextNode(`Diameter(feet)`))
            const td3 = tr.insertCell()
                td3.appendChild(document.createTextNode(`Miss Distance(miles)`))
            const td4 = tr.insertCell()
                td4.appendChild(document.createTextNode(`Relative Velocity(Miles Per Hour)`))
    
        for (let i of data['near_earth_objects'][end_date]){
            const tr = tbl.insertRow()
                const td = tr.insertCell()
                    td.appendChild(document.createTextNode(`${i['name']}`))
                const td2 = tr.insertCell()
                    td2.appendChild(document.createTextNode(`${i['estimated_diameter']['feet']['estimated_diameter_min']}`))
                const td3 = tr.insertCell()
                    td3.appendChild(document.createTextNode(`${i['close_approach_data'][0]['miss_distance']['miles']}`))
                const td4 = tr.insertCell()
                    td4.appendChild(document.createTextNode(`${i['close_approach_data'][0]['relative_velocity']['miles_per_hour']}`))

        }
        body.appendChild(tbl)
    }) 
}