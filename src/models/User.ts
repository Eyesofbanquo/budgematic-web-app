import { Model } from 'sequelize'

export default class User extends Model {
  public id!: string
  public deviceId!: string
}
