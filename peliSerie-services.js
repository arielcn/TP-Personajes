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
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query('SELECT * FROM PELICULASYSERIES WHERE Id = @pId');
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
                .input('pImagen', sql.NVarChar, PeliYSerie?.imagen ?? "")
                .input('pTitulo', sql.NVarChar, PeliYSerie?.titulo ?? "")
                .input('pFechaCreacion', sql.Date, PeliYSerie?.fechaCreac ?? 0)
                .input('pCalificacion', sql.Int, PeliYSerie?.peso ?? 0)
                .query(`INSERT INTO PeliculasYSeries (Imagen, Titulo, FechaCreacion, Calificacion) VALUES (@pImagen, @pTitulo, @pFechaCreacion, @pCalificacion)`);
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }

    static updatePeliSerie = async (PeliYSerie) => {
        let rowsAffected = 0;
        console.log('Estoy en: update(peliserie)');

        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('Id', sql.Int, Id)
                .input('pImagen', sql.NVarChar, PeliYSerie?.imagen ?? null)
                .input('pTitulo', sql.NVarChar, PeliYSerie?.titulo ?? null)
                .input('pFechaCreacion', sql.Int, PeliYSerie?.fechaCreacion ?? null)
                .input('pCalificacion', sql.Int, PeliYSerie?.calificacion ?? null)
                .query(`UPDATE PeliculasYSeries SET Imagen=@pImagen, Titulo=@pTitulo, FechaCreacion=@pFechaCreacion, Calificacion=@pCalificacion) WHERE Id=@pId`);
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }

    static deletePeliSerie = async (id) => {
        let returnEntity = null;
        console.log('Estoy en: peliserie.delete(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query('DELETE FROM PELISERIE WHERE Id = @pId');
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static getMovieByNombre = async (titulo) => {
        let returnEntity = null;
        console.log('Estoy en: movie.searchByNombre')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pTitulo', sql.NVarChar, titulo)
                .query('SELECT * FROM PeliculasYSeries WHERE Titulo = @pTitulo');
                returnEntity = result.recordsets[0][0];
                console.log(returnEntity)
            } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static getMovieByOrder = async (order) => {
        let returnEntity = null;
        console.log('Estoy en: movie.searchByOrder')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .query('SELECT * FROM PeliculasYSeries ORDER BY FechaCreacion ' + order);
                returnEntity = result.recordsets[0][0];
                console.log(returnEntity)
            } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }
}