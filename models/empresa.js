'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Empresa = sequelize.define('Empresa', {
        idEmpresa: {
            field: 'idEmpresa',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        loginEmpresa: {
            field: 'loginEmpresa',
            type: DataTypes.STRING,
            allowNull: false,
        },
        senhaEmpresa: {
            field: 'senhaEmpresa',
            type: DataTypes.STRING,
            allowNull: false
        },
        nomeEmpresa: {
            field: 'nomeEmpresa',
            type: DataTypes.STRING,
            allowNull: false
        },
        cnpj: {
            field: 'cnpj',
            type: DataTypes.STRING,
            allowNull: false,
        },

        telefone: {
            field: 'telefone',
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            field: 'email',
            type: DataTypes.STRING,
            allowNull: false,
        },
        logradouro: {
            field: 'logradouro',
            type: DataTypes.STRING,
            allowNull: true,
        },
        uf: {
            field: 'uf',
            type: DataTypes.STRING,
            allowNull: true,
        },
        cidade: {
            field: 'cidade',
            type: DataTypes.STRING,
            allowNull: true,
        },
        numero: {
            field: 'numero',
            type: DataTypes.STRING,
            allowNull: true,
        },
        complemento: {
            field: 'complemento',
            type: DataTypes.STRING,
            allowNull: true,
        },
        bairro: {
            field: 'bairro',
            type: DataTypes.STRING,
            allowNull: true,
        },
        cep: {
            field: 'cep',
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        tableName: 'tb_empresa',
        freezeTableName: true,
        underscored: true,
        timestamps: false,
    });

    return Empresa;
};