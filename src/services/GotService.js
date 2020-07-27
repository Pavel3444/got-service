export default class GotService {
    constructor() {
        this._apibase = 'https://anapioficeandfire.com/api'
    }

    async getResource(url) {
        const res = await fetch(`${this._apibase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    };
    async getAllCharacters(){
        const res = await this.getResource('/characters?page=5&pageSize=10')
        return res.map(this._transformChar)
    }
    async getCharacter(id){
        const character = await this.getResource(`/characters/${id}`);
        return this._transformChar(character)

    }
    async getAllHouses(){
        const res = await this.getResource('/characters?page=5&pageSize=10')
        return res.map(this._transformHouse())
    }
    async getHouse(id){
        const house = await this.getResource(`/characters/${id}`);
        return this._transformHouse(house)
    }
    async getAllBooks(){
        const res = await this.getResource('/characters?page=5&pageSize=10')
        return res.map(this._transformHouse())
    }
    async getBook(id){
        const book = await this.getResource(`/characters/${id}`);
        return this._transformHouse(book)
    }

    _transformChar(char){
     return    {
         name: char.name,
         gender: char.gender,
         born: char.born,
         died: char.died,
         culture: char.culture
        }
    }
    _transformHouse(house){
        return    {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        }
    }
    _transformBook(book){
        return    {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publiser: book.publiser,
            released: book.released
        }
    }
}


