import { BaseRepository } from "../base.repository.js";
import { UserModel } from "../models/user.model.js";

class UserRepository extends BaseRepository {
  constructor() {
    super(UserModel);
  }

  findByEmail(email) {
    return this.model.findOne({ email });
  }

  findActiveByEmail(email) {
    return this.model.findOne({
      email,
      isActive: true,
    })
    .select("+password");
  }

  disableUser(id) {
    return this.model.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
  }
  
}

export const userRepository = new UserRepository();
