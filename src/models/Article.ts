import { Model, Sequelize, DataTypes } from 'sequelize'

export default class Article extends Model {
    public id?: number;
    public title!: string;
    public body!: string;
}

export const ArticleMap = (sequelize: Sequelize) => {
    Article.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING(255)
        },
        body: {
            type: DataTypes.STRING(100)
        }
    }, {
        sequelize,
        tableName: "articles",
        timestamps: false
    })
    Article.sync()
}