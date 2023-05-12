import config from './dbconfig.js';
import sql from 'mssql';

export default class PeliYSerieService {
    static getPeliSerie = async () => {
        let pool = await sql.connect(config);
        let result = await pool.request().query("SELECT Imagen, Titulo, Id, FechaCreacion FROM PELICULASYSERIES");
        return result.recordsets[0];
    }
}