export const getOutPokemon = async (pokemon) => {
    const response = await fetch(
        'http://localhost:4444/pokemon/delete', {
            method: 'DELETE', 
            headers: {
                'Accept': 'application/json', 
                'Content-Type':'application/json'
            },
            body:JSON.stringify(pokemon)
        }
    )
    const pokemons = await response.json()
    return pokemons
}