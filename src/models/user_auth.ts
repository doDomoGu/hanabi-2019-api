import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';

class UserAuth extends Model {
  // set expiredTime(value:string) {
  //   this.setDataValue('expiredTime', value);
  // }
}
UserAuth.init({
  userId: {
    type: DataTypes.UUID,
    field: 'user_id',
  },
  token: {
    type: DataTypes.STRING(200),
    primaryKey: true,
  },
  expiredTime: {
    type: DataTypes.TIME,
    allowNull: false,
    field: 'expired_time',
  },
  createdAt: {
    type: DataTypes.TIME,
    allowNull: false,
    field: 'created_at',
  },
}, {
  sequelize,
  modelName: 'user_auth',
  freezeTableName: true,
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: false,
  // tableName: 'user',
});


export default UserAuth;
