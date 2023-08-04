import { DataTypes, Sequelize } from "sequelize";


export interface BookData {
    id: string
    title: string
    author: string
    publishedYear: number
  }

export default function(sequelize: Sequelize) {
        const Books = sequelize.define('books', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING
        },
        author: {
            type: DataTypes.STRING
        },
        publishedYear: {
            type: DataTypes.INTEGER
        }
    },{
        timestamps: false
    });
    return Books
}
