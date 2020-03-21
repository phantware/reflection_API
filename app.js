import express from 'express';

const app = express();
const name = 'jamiu';

const port = process.env.PORT || 3380;

app.get('/', (req, res) => {
  res.status(200).send({ message: 'hello worldn MY jamiu talking' });
});

app.listen(port, () => console.log(`listening at ${port}`));
