const BD = require('../conection/conexion');


exports.getUsuarios = async (req, res) => {
    try {
        let query = "SELECT * FROM USUARIO";
        let result = await BD.Open(query, [], false);
        let usuarios = [];

        usuarios = result.rows.map(user => {
            let usuarioSchema = {
                "nombre": user[0],
                "email": user[1],
                "contrasena": user[2]
            }

            return usuarioSchema
        })
        res.json(usuarios);
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}

exports.addUsuario = async (req, res) => {
    try {
        const { nombre, email, contrasena } = req.body
        let sql = `INSERT INTO USUARIO(nombre,email,contrasena) VALUES ('${nombre}','${email}','${contrasena}')`
        await BD.Open(sql, [], true);

        res.json({ "Info": "Usuario creado exitosamente" })
    }
    catch (error) {
        console.log("Error al crear el usuario => ", error)
        res.json({})
    }
}

exports.ingresar = async (req, res) => {
    try {
        const { email, contrasena } = req.body
        let sql = `select nombre from usuario where email='${email}' and contrasena='${contrasena}'`
        let result=await BD.Open(sql, [], true);
        let usuarioSchema = {
            "nombre": ""
        }
        usuario = result.rows.map(user => {
            usuarioSchema = {
                "nombre": user[0]
            }

            return usuarioSchema
        })
        
        if (usuarioSchema.nombre != '') {           

            res.json({ "auth": "true" })
        } else {
            res.json({ "auth": "false" })
        }
    }
    catch (error) {
        console.log("Error al crear el usuario => ", error)
        res.json({})
    }
}