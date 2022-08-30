const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "pokemon",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false, //basicamente allowNull en false indica que el campo no puede quedar vacio
        unique: true, // para que no pueda repetirse.
      },

      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, //segun la documentacion de sequelize uuidv4 es un identificador universal unico por defecto v4 es la version
        primaryKey: true,
      },

      attack: {
          type: DataTypes.INTEGER
          
      },

      life: {
        type: DataTypes.INTEGER,
        
      },

      defense: {
        type: DataTypes.INTEGER,
      },
      speed: {
        type: DataTypes.INTEGER,
      },
      height: {
        type: DataTypes.INTEGER,
      },

      weight: {
        type: DataTypes.INTEGER,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      // necesito diferenciar entre lo que se cree en la db y lo que venga de la api entonces. con el uuid deberia funcionar.
      //por si se quiere acceder a lo que se creo en db
      createdInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
