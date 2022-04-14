import HttpException from './HttpException';

class UserNameAlreadyExistsException extends HttpException {
  constructor(userName: string) {
    super(400, `User with ${userName} already exists`);
  }
}
export default UserNameAlreadyExistsException;
