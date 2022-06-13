class Album {
    constructor(id, nombre, artista, descrip, imgUrl, audio, esDestacado, categoria) {
        this.id = id;
        this.nombre = nombre;
        this.artista = artista;
        this.descrip = descrip;
        this.imgUrl = imgUrl;
        this.audio = audio;
        this.esDestacado = esDestacado;
        this.categoria = categoria;
    }
}

export default Album;