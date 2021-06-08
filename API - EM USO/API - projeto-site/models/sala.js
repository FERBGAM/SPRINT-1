'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Sala = sequelize.define('Sala', {
        idSala: {
            field: 'idSala',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nomeSala: {
            field: 'nomeSala',
            type: DataTypes.STRING,
            allowNull: true,
        },
        area: {
            field: 'area',
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        descricao: {
            field: 'descricao',
            type: DataTypes.STRING,
            allowNull: true,
        },
        andar: {
            field: 'andar',
            type: DataTypes.STRING,
            allowNull: false
        },
        fkEmpresa: {
            field: 'fkEmpresa',
            type: DataTypes.INTEGER,
            allowNull: true,
            foreignKey: true
        },
    },
        {
            tableName: 'tb_sala',
            freezeTableName: true,
            underscored: true,
            timestamps: false,
        });

    return Sala;
};
