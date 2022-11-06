"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleMap = void 0;
const sequelize_1 = require("sequelize");
class Article extends sequelize_1.Model {
}
exports.default = Article;
const ArticleMap = (sequelize) => {
    Article.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: sequelize_1.DataTypes.STRING(255)
        },
        body: {
            type: sequelize_1.DataTypes.STRING(100)
        }
    }, {
        sequelize,
        tableName: "articles",
        timestamps: false
    });
    Article.sync();
};
exports.ArticleMap = ArticleMap;
