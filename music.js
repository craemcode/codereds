async function getMusicData(){
    const url = 'https://theaudiodb.p.rapidapi.com/discography.php'
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    
}

getMusicData()