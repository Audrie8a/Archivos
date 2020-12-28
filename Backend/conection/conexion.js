const oracledb= require("oracledb");

credentials={
    user: "audrie8a",
    password: "201801263",
    connectString:"34.68.252.40/ORCL18"

}

async function Open(sql, binds, autoCommit) {
    let cnn = await oracledb.getConnection(credentials);
    let result = await cnn.execute(sql, binds, { autoCommit });
    cnn.release();
    return result;
}

exports.Open = Open;