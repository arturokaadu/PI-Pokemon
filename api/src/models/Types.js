const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('types', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,  //basicamente allowNull en false indica que el campo no puede quedar vacio
      unique: true // para que no pueda repetirse.
    },

/*     id: {
        type: DataTypes.UUID, 
        defaultValue:  DataTypes.UUIDV4, //segun la documentacion de sequelize uuidv4 es un identificador universal unico por defecto v4 es la version
        primaryKey: true
       }, */


});
};