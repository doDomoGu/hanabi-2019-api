import { EntityRepository, Repository, getRepository } from 'typeorm';
import UserAuth from '../entity/UserAuth';

@EntityRepository(UserAuth)
export default class UserAuthRepository extends Repository<UserAuth> {
  // create2( userId : number, token: string, expiredTime: Date) {
  async create2() {
    const userAuth = new UserAuth();
    userAuth.userId = 10002;
    userAuth.token = '123ssss21313';
    userAuth.expiredTime = new Date('2019-01-01 08:00:00');
    userAuth.createdAt = new Date('2019-01-01 09:00:00');
    return this.save(userAuth);
  }


  // username2:string =  this.get('username')  + 1;

  // findByName(firstName: string, lastName: string) {
  //   return this.createQueryBuilder("user")
  //     .where("user.firstName = :firstName", { firstName })
  //     .andWhere("user.lastName = :lastName", { lastName })
  //     .getMany();
  // }
}
