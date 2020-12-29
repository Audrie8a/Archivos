const BD = require('../conection/conexion');


exports.getUsuario = async (req, res) => {
    try {
        let query = "select * from Producto";
        let result = await BD.Open(query, [], false);
        let usuarios = [];

        usuarios = result.rows.map(user => {
            let usuarioSchema = {
                "idProducto": user[0],
                "nombreProducto": user[1],
                "precioProducto": user[2]
            }

            return usuarioSchema
        })
        //console.log(usuarios);
        res.json(usuarios);
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}

exports.getReporte = async (req, res) => {
    try {
        let query = "SELECT f.idFactura, SUM(df.cantidad * p.precioProducto) AS TOTAL"+
        "FROM FACTURA f, DETALLE_FACTURA df, PRODUCTO p"+
        "WHERE f.idFactura = df.idFactura"+
        "  and p.idProducto = df.idProducto"+
        "GROUP BY f.idFactura"+
        "ORDER BY TOTAL DESC"+
        "FETCH NEXT 3 ROW ONLY ;";
        let result = await BD.Open(query, [], false);
        let usuarios = [];

        usuarios = result.rows.map(user => {
            let usuarioSchema = {
                "idFactura": user[0],
                "TOTAL": user[1]
            }

            return usuarioSchema
        })
        console.log(usuarios);
        res.json(usuarios);
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}

exports.addUsuario = async (req, res) => {
    try {
        const { nombre, email} = req.body
        let sql = `insert into Producto (nombreProducto,precioProducto) values ('${nombre}',${email})`
        await BD.Open(sql, [], true);

        res.json({ "Info": "Producto creado exitosamente" })
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