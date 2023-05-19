import config from './dbconfig.js';
import sql from 'mssql';

export default class PersonajeService {
    static getPersonaje = async () => {
        let pool = await sql.connect(config);
        let result = await pool.request().query("SELECT Imagen, Nombre, Id FROM PERSONAJES");
        return result.recordsets[0];
    }

    getById = async (id) => {
        let returnEntity = null;
        console.log('Estoy en: PersonajeService.getById(id)');
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

    insertPersonaje = async (personaje) => {
        let rowsAffected = 0;
        console.log('Estoy en: insert(personaje)');

        console.log(personaje);

        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pImagen'     , sql.NVarChar , personaje?.imagen ?? "")
                .input('pNombre', sql.NVarChar   , personaje?.nombre ?? "")
                .input('pEdad'    , sql.Int , personaje?.edad ?? 0)
                .input('pPeso', sql.Int , personaje?.peso ?? 0)
                .input('pHistoria', sql.NVarChar , personaje?.historia ?? "")
                .query(`INSERT INTO Personajes (Imagen, Nombre, Edad, Peso, Historia) VALUES (@pImagen, @pNombre, @pEdad, @pPeso, @pHistoria)`);
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }

    updatePersonaje = async (personaje) => {
        let rowsAffected = 0;
        console.log('Estoy en: update(personaje)');

        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('Id', sql.Int, Id)
                .input('pImagen'     , sql.NVarChar , personaje?.imagen ?? null)
                .input('pNombre', sql.NVarChar   , personaje?.nombre ?? null)
                .input('pEdad'    , sql.Int , personaje?.edad ?? null)
                .input('pPeso', sql.Int , personaje?.peso ?? null)
                .input('pHistoria', sql.NVarChar , personaje?.historia ?? null)
                .query(`UPDATE Personaje SET Imagen=@pImagen, Nombre=@pNombre, Edad=@pEdad, Peso=@pPeso, Historia=@pHistoria) WHERE Id=@pId`);
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }

    deletePersonaje = async (id) => {
        let returnEntity = null;
        console.log('Estoy en: PersonajeService.delete(id)');
        try {
            let pool   = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query('DELETE * FROM PERSONAJES WHERE Id = @pId');
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }
}