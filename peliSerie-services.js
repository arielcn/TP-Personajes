import config from './dbconfig.js';
import sql from 'mssql';

export default class PeliYSerieService {
    static getPeliSerie = async () => {
        let pool = await sql.connect(config);
        let result = await pool.request().query("SELECT Imagen, Titulo, Id, FechaCreacion FROM PELICULASYSERIES");
        return result.recordsets[0];
    }

    static getPeliSerieById = async (id) => {
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

    static insertPeliSerie = async (PeliYSerie) => {
        let rowsAffected = 0;
        console.log('Estoy en: insert(peliserie)');

        console.log(PeliYSerie);

        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pImagen'     , sql.NVarChar , PeliYSerie?.imagen ?? "")
                .input('pTitulo', sql.NVarChar   , PeliYSerie?.nombre ?? "")
                .input('pFechaCreacion'    , sql.Date , PeliYSerie?.edad ?? 0)
                .input('pCalificacion', sql.Int , PeliYSerie?.peso ?? 0)
                .query(`INSERT INTO PeliculasYSeries (Imagen, Titulo, FechaCreacion, calificacion) VALUES (@pImagen, @pTitulo, @pFechaCreacion, @pCalificacion)`);
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }
}