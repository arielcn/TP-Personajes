import config from './dbconfig.js';
import sql from 'mssql';

export default class PeliYSerieService {
    static getPeliSerie = async () => {
        let pool = await sql.connect(config);
        let result = await pool.request().query("SELECT Imagen, Titulo, Id, FechaCreacion FROM PELICULASYSERIES");
        return result.recordsets[0];
    }

    static getPeliserieById = async (id) => {
        let returnEntity = null;
        console.log('Estoy en: peliserie.getById(id)');
        try {
            let pool   = await sql.connect(config);
            let result = await pool.request()
                                .input('pId', sql.Int, id)
                                .query('SELECT * FROM PERSONAJES WHERE Id = @pId');
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }
}