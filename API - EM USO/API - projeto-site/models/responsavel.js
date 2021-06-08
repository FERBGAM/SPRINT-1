'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Responsavel = sequelize.define('Responsavel', {
        idResponsavel: {
            field: 'idResponsavel',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fkEmpresa: {
            field: 'fkEmpresa',
            type: DataTypes.INTEGER,
            foreignKey: true,
            allowNull: true,
        },
        nomeResponsavel: {
            field: 'nomeResponsavel',
            type: DataTypes.STRING,
            allowNull: true,
        },
        loginResponsavel: {
            field: 'loginResponsavel',
            type: DataTypes.STRING,
            allowNull: false
        },
        senhaResponsavel: {
            field: 'senhaResponsavel',
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            field: 'email',
            type: DataTypes.STRING,
            allowNull: false,
        },
        telefone: {
            field: 'telefone',
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
        {
            tableName: 'tb_responsavel',
            freezeTableName: true,
            underscored: true,
            timestamps: false,
        });

    return Responsavel;
};
