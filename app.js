import express from 'express';
import Reflection from './src/controllers/reflection';

const app = express();

app.use(express.json());

const port = process.env.PORT || 3380;

app.get('/', (req, res) => {
  res.status(200).send({ message: 'hello worldn MY jamiu talking' });
});

app.post('/api/v1/reflections', Reflection.create);
app.get('/api/v1/reflections', Reflection.getAll);
app.get('/api/v1/reflections/:id', Reflection.getOne);
app.put('/api/v1/reflections/:id', Reflection.update);
app.delete('/api/v1/reflections:id', Reflection.delete);
app.listen(port, () => console.log(`listening at ${port}`));
