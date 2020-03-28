import reflectionModel from '../models/reflection';

const Reflection = {
  create(req, res) {
    if (!req.body.success && !req.body.lowPoint && !req.body.takeAway) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    const reflections = reflectionModel.create(req.body);
    return res.status(200).send(reflections);
  },
  getAll(req, res) {
    const reflections = reflectionModel.findAll();
    return res.status(200).send(reflections);
  },
  getOne(req, res) {
    const reflection = reflectionModel.findOne(req.params.id);
    if (!reflection) {
      return res.status(404).send({ message: 'reflection not found' });
    }
    return res.status(200).send(reflection);
  },

  // Update reflection
  update(req, res) {
    const reflection = reflectionModel.update(req.params.id);
    if (!reflection) {
      return res.status(400).send({ message: 'reflection not found' });
    }
    const updatedReflection = reflectionModel.update(req.params.id, req.body);
    return res.status(200).send({ updatedReflection });
  },

  // Delete reflection
  delete(req, res) {
    const reflection = reflectionModel.delete(req.params.id);
    if (!reflection) {
      return res.status(400).send({ message: 'reflection not found' });
    }
    const reflectionDeleted = reflectionModel.delete(req.params.id);
    return res.status(204).send({ reflectionDeleted });
  }
};
export default Reflection;
