const fetchCharacters = async () => {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();
    return data
}

const wrapper = document.createElement("div")
wrapper.setAttribute("class", "wrapper")
document.body.append(wrapper)

const sortCharacters = (characters) => {

   const mostScreentime = characters.sort((a, b) => {
        a.episode.length > b.episode.length ? 1 : -1
    })
    console.log(`Character with most screentime ${mostScreentime[0].name}`)

    characters.sort((a,b) => {
        return a.name > b.name ? 1 : -1
    }).slice(0, 10).forEach(element => {
        const characterName = document.createElement("h2")
        characterName.textContent = element.name

        const howItLooks = document.createElement("img")
        howItLooks.src  = element.image

        const species = document.createElement("p")
        species.textContent = element.species

        const origin = document.createElement("p")
        origin.textContent = element.origin.name === "unknown" ? "-" : element.origin.name

        const card = document.createElement("div")
        card.setAttribute("class", "card")
        

        card.addEventListener("click", () => {
            console.log(element.name)
            localStorage.setItem(element.name, JSON.stringify(element));
            const characterID = element.id;

            const fetchSingleCharacter = async () => {
                
                const response = await fetch(`https://rickandmortyapi.com/api/character/${characterID}`)
                const data = await response.json();
                console.log(data)
            }

            fetchSingleCharacter()

        })
        wrapper.append(card)
        card.append(characterName)
        card.append(howItLooks)
        card.append(species)
        card.append(origin)
    })

}

const initCharactersPage = async () => {
    const characters = await fetchCharacters();
    sortCharacters(characters.results)
    console.log(characters.results);
  };




const fetchLocations = async () => {
   const response = await fetch("https://rickandmortyapi.com/api/location");
   const data = await response.json();
    console.log(data.results)
   return data.results
}

const mostPopulated = (locations) => {
    locations.sort((a,b) => {
    return a.residents.length < b.residents.length ? 1 : -1
    })
    console.log(locations[0])
}

const initMostPopulated = async () => {
    const locations = await fetchLocations();
    mostPopulated(locations)
    
}


    initCharactersPage()
    initMostPopulated()
