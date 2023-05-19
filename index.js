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
    let svc = new PersonajeService();
    res.send(await svc.getById(req.params.id));
})

app.post('/characters/insert', async (req, res) => {
    let svc = new PersonajeService();
    let nuevoPersonaje = new Personaje();

    nuevoPersonaje.imagen = 'https://static.wikia.nocookie.net/disney/images/6/6d/BillCipher.png/revision/latest/scale-to-width-down/350?cb=20160304120312&path-prefix=es'
    nuevoPersonaje.nombre = 'Bill Cipher'
    let devol = res.send(await svc.insertPersonaje(nuevoPersonaje));
    console.log(devol);
})

app.put('/characters/update'), async (req, res) => {
    try{
        await PersonajeService.update(req.body)
        res.status(200).json({message: 'Personaje updated'});
    }catch(error){
        console.error(error);
        res.status(500).json({error: 'Fallo el update'});
    }
}

app.delete('/characters/:id'), async (req, res) => {
    let svc = new PersonajeService();
    res.send(await svc.deletePersonaje(req.params.id));
}

// PELISERIE

app.get('/movies', async (req, res) => {
    let devol = await PeliYSerieService.getPeliSerie();
    res.send(devol);
})

app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`)
})