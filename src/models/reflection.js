import moment from 'moment';
// import { uuid } from 'uuid';
const uuid = require('uuid');
// console.log('this is uuid', uuid);
class Reflection {
  // Class constructor
  constructor() {
    this.reflections = [];
  }
  // Create a reflection
  create(data) {
    const newReflection = {
      id: uuid.v4(),
      success: data.success || '',
      lowPoint: data.lowPoint || '',
      takeAway: data.takeAway || '',
      createData: moment.now(),
      modifiedDate: moment.now()
    };
    this.reflections.push(newReflection);
    return newReflection;
  }
  // Find single reflection

  findOne(id) {
    return this.reflections.find(reflection => reflection.id === id);
  }

  // Find all reflections

  findAll() {
    return this.reflections;
  }

  // Update reflection
  update(id, data) {
    const reflection = this.findOne(id);
    const index = this.reflections.indexOf(reflection);
    this.reflections[index].success = data['success'] || reflection.success;
    this.reflections[index].lowPoint = data['lowPoint'] || reflection.lowPoint;
    this.reflections[index].lowPoint = data['takeAway'] || reflection.takeAway;
    this.reflections[index].modifiedDate = moment.now();
    return this.reflections[index];
  }

  // Delete a single reflection
  delete(id) {
    const reflection = this.findOne(id);
    const index = this.reflections.indexOf(reflection);
    this.reflections.splice(index, 1);
    return {};
  }
}

export default new Reflection();
