const sql = require('../config/db');


/**
 * Login
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.login = async (req, res) => {
    const { user, password } = req.body;
    try {
        const result = await sql.query`execute p_list_usuario @usuario=${user}, @contrasena=${password}, @ACCION='A'`;
       
        if (result.recordset.length > 0) {
            return res.status(200).json({ user: result.recordset[0] });
        } else {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }
       
    } catch (err) {
        console.error('Error al iniciar', err);
        return res.status(500).send('Error en el servidor');
    }
};

/**
 * para obtener todos los torneos
 * @param {*} req 
 * @param {*} res 
 */
exports.getAllTournament = async (req, res) => {

    const { codTorneo } = req.body;

    try {
        const result = await sql.query`execute p_list_Torneo @codTorneo=${codTorneo}, @ACCION='B'`;
        res.json(result.recordset);
    } catch (err) {
        console.error('Error al hacer la consulta', err);
        res.status(500).send('Error en el servidor');
    }
};


exports.matchesXTournament = async (req, res) => {
    
    const { codTorneo, codParticipante } = req.body;
    
    try {
        const result = await sql.query`execute p_list_Partido @codParticipante=${codParticipante} ,@codTorneo=${codTorneo}, @ACCION='F'`;
        
        if (result.recordset.length > 0) {
            return res.status(200).json(result.recordset); // Devuelve el recordset completo
        } else {
            return res.status(401).json({ message: 'No hay partidos disponibles para este torneo' });
        }
    } catch (err) {
        console.error('Error al iniciar', err);
        return res.status(500).send('Error en el servidor');
    }
};

exports.submitBet = async (req, res) => {
    const { codParticipante, codPartido, apuesta } = req.body;
  
    try {
      const result = await sql.query`EXECUTE p_abm_Apuesta @codParticipante=${codParticipante}, @codPartido=${codPartido}, @apuesta=${apuesta}, @ACCION='A'`;
      res.status(200).json({ message: 'Apuesta registrada exitosamente' });
    } catch (err) {
      console.error('Error al registrar la apuesta:', err);
      res.status(500).send('Error en el servidor');
    }
  };


exports.expire = async( req, res ) => {

    const { codPartido } = req.body;
    

    try {
        const result = await sql.query`execute p_list_Partido @codPartido=${codPartido} , @ACCION='G'`;
        const expireStatus = result.recordset[0];
        res.json(expireStatus);
    } catch (err) {
        console.error('Error al hacer la consulta', err);
        res.status(500).send('Error en el servidor');
    }
}


exports.seeBets = async( req, res ) => {


    const { codTorneo } = req.body;
    let ACCION = 'M';
    if(codTorneo === 5){
         ACCION='J';
    }
    console.log(codTorneo, "  ",ACCION);
    try {
        const result = await sql.query`execute p_list_Partido  @codTorneo=${codTorneo}, @ACCION=${ACCION}`;
        
        if (result.recordset.length > 0) {
            return res.status(200).json(result.recordset); // Devuelve el recordset completo
        } else {
            return res.status(401).json({ message: 'No hay apuestas disponibles para este torneo' });
        }
    } catch (err) {
        console.error('Error al iniciar', err);
        return res.status(500).send('Error en el servidor');
    }

}


exports.noSeeBets = async( req, res ) => {


    const { codTorneo } = req.body;
   
    try {
        const result = await sql.query`execute p_list_Partido  @codTorneo=${codTorneo}, @ACCION='K'`;
        
        if (result.recordset.length > 0) {
            return res.status(200).json(result.recordset); // Devuelve el recordset completo
        } else {
            return res.status(401).json({ message: 'No hay resultados para este torneo' });
        }
    } catch (err) {
        console.error('Error al iniciar', err);
        return res.status(500).send('Error en el servidor');
    }

}