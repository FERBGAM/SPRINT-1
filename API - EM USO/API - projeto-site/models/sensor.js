'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Sensor = sequelize.define('Sensor', {
        idSensor: {
            field: 'idSensor',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tipoSensor: {
            field: 'tipoSensor',
            type: DataTypes.STRING,
            foreignKey: true,
            allowNull: true,
        },
        tipoLeitura: {
            field: 'tipoLeitura',
            type: DataTypes.STRING,
            allowNull: true,
        },
        statusSensor: {
            field: 'statusSensor',
            type: DataTypes.STRING,
            allowNull: false
        },
        unidadeMedida: {
            field: 'unidadeMedida',
            type: DataTypes.STRING,
            allowNull: false
        },
        fkSala: {
            field: 'fkSala',
            type: DataTypes.INTEGER,
            allowNull: true,
            foreignKey: true
        },
    },
        {
            tableName: 'tb_sensor',
            freezeTableName: true,
            underscored: true,
            timestamps: false,
        });

    return Sensor;
};
