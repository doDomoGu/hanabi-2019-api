import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('hanabi_yii_vue', 'gljgljglj', 'gljgogo', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '+08:00',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err:string) => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
