'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
	let Leitura = sequelize.define('Leitura', {
		idLeitura: {
			field: 'idLeitura',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		fkSensor: {
			field: 'fkSensor',
			type: DataTypes.INTEGER,
			allowNull: false,
			foreignKey: true,
		},
		dataHoraRegister: {
			field: 'dataHoraRegister',
			type: DataTypes.DATE, // NÃO existe DATETIME. O tipo DATE aqui já tem data e hora
			allowNull: false
		},
		valorLeitura: {
			field: 'valorLeitura',
			type: DataTypes.DECIMAL, // campo 'falso' (não existe na tabela). Deverá ser preenchido 'manualmente' no select
			allowNull: false,
		}
	},
		{
			tableName: 'tb_leitura',
			freezeTableName: true,
			underscored: true,
			timestamps: false,
		});

	return Leitura;
};
