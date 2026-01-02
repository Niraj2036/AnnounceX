export class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  findById(id, projection = {}) {
    return this.model.findById(id, projection);
  }

  findOne(filter = {}, projection = {}) {
    return this.model.findOne(filter, projection);
  }

  find(
    filter = {},
    projection = {},
    options = {}
  ) {
    return this.model.find(filter, projection, options);
  }

  count(filter = {}) {
    return this.model.countDocuments(filter);
  }

  create(data) {
    return this.model.create(data);
  }

  updateById(id, data) {
    return this.model.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );
  }

  deleteById(id) {
    return this.model.findByIdAndDelete(id);
  }

  softDeleteById(id) {
    return this.model.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true }
    );
  }
}

