var map = L.map('issmap').setView([0, 0], 2);
const issIcon = L.icon({
    iconUrl: 'iss.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16]
   
});




const marker = L.marker([0, 0], {icon: issIcon}).addTo(map);


const attribution = '&copy <a href="https://www.openstreetmap.org/copyright">Open Street Map>'
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const tiles = L.tileLayer(tileUrl,{attribution})

tiles.addTo(map)


async function getIss(){
   const url = 'https://api.wheretheiss.at/v1/satellites/25544'
    const response = await fetch(url)
    data = await response.json()
    
    //object destructuring!!
    const {longitude, latitude, velocity, visibility, altitude} = data
    return {longitude, latitude, velocity, visibility, altitude}
} 

//i need to set the view only once so the zoom stays stable
let virgin = true

async function givePosition(){
    const position = await getIss()
    const lon = position.longitude
    const lat = position.latitude
    document.querySelector('#latitude').textContent = lat.toFixed(2)
    document.querySelector('#longitude').textContent = lon.toFixed(2)
    document.querySelector('#velocity').textContent = position.velocity.toFixed(2)
    document.querySelector('#visibility').textContent = position.visibility
    document.querySelector('#altitude').textContent = position.altitude.toFixed(2)
    


    marker.setLatLng([lat,lon])
    if(virgin){
    map.setView([lat,lon], 4)
    virgin = false
    }
    
    
}
getIss()
givePosition()

setInterval(givePosition, 2000)






//next we have to specify a tile provider(whatever those are)



