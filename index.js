import express from 'express';
import Personaje from './models/personaje.js';
import PersonajeService from './personajes-services.js';
import PeliYSerieService from './peliSerie-services.js';
import PeliYSerie from './models/peli-serie.js';

const app = express();
const port = 3000;
app.use(express.json());

//CHARACTERS

app.get('/characters', async (req, res) => {
    try{
        let devol = await PersonajeService.getPersonaje();
        res.send(devol);
    }catch(error){
        console.error(error);
    }
})

app.get('/characters/:id', async (req, res) => {
    res.send(await PersonajeService.getPersonajeById(req.params.id));
})

app.post('/characters/insert', async (req, res) => {
    let nuevoPersonaje = new Personaje();
    nuevoPersonaje.imagen = 'https://static.wikia.nocookie.net/disney/images/6/6d/BillCipher.png/revision/latest/scale-to-width-down/350?cb=20160304120312&path-prefix=es'
    nuevoPersonaje.nombre = 'Bill Cipher'
    res.send(await PersonajeService.insertPersonaje(nuevoPersonaje));
})

app.put('/characters/:id'), async (req, res) => {
    try{
        await PersonajeService.update(req.body)
        res.status(200).json({message: 'Personaje updated'});
    }catch(error){
        console.error(error);
        res.status(500).json({error: 'Fallo el update'});
    }
}

app.delete('/characters/:id', async (req, res) => {
    res.send(await PersonajeService.deletePersonaje(req.params.id));
})

// PELISERIE

app.get('/movies', async (req, res) => {
    let devol = await PeliYSerieService.getPeliSerie();
    res.send(devol);
})

app.get('/movies/:id', async (req, res) => {
    res.send(await PeliYSerieService.getPeliSerieById(req.params.id));
})

app.post('/movies/insert', async (req, res) => {
    let nuevaPeliSerie = new PeliYSerie();
    nuevaPeliSerie.imagen = 'https://es.web.img3.acsta.net/c_310_420/pictures/14/05/28/11/24/435900.jpg'
    nuevaPeliSerie.titulo = 'Cars'
    res.send(await PeliYSerieService.insertPeliSerie(nuevaPeliSerie));
})

app.put('/movies/:id'), async (req, res) => {
    try{
        await PeliYSerieService.updatePeliSerie(req.body)
        res.status(200).json({message: 'PeliSerie updated'});
    }catch(error){
        console.error(error);
        res.status(500).json({error: 'Fallo el update'});
    }
}

app.delete('/movies/:id', async (req, res) => {
    res.send(await PeliYSerieService.deletePeliSerie(req.params.id));
})

//  Búsqueda de Personajes

app.get('/characters?name=nombre', async (req, res) => {
    res.send(await PersonajeService.getPersonajeByNombre(req.params.nombre))
})

app.get('/characters?age=edad', async (req, res) => {
    res.send(await PersonajeService.getPersonajeByEdad(req.params.edad))
})

app.get('/characters?movies=idMovie', async (req, res) => {
    res.send(await PersonajeService.getPeliSerieById(req.params.id))
})

//  Búsqueda de PeliSerie

app.get('/movies?name=nombre', async (req, res) => {
    res.send(await PeliYSerieService.getMovieByNombre(req.params.nombre))
})

app.get('movies?order=ASC | DESC', async (req, res) => {
    res.send(await PeliYSerieService.getMovieByOrder(req.params.id))
})

// Levantar el puerto

app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`)
})