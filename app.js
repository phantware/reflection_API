import express from 'express';
import Reflection from './src/usingDB/controllers/reflection';
import { multerUploads, dataUri } from './src/usingDB/multer';
import {
  uploader,
  cloudinaryConfig
} from './src/usingDB/config/cloudinaryConfig';

const app = express();

app.use(express.json());
app.use('*', cloudinaryConfig);

const port = process.env.PORT || 3380;

app.get('/', (req, res) => {
  res.status(200).send({ message: 'hello worldn MY jamiu talking' });
});

app.post('/upload', multerUploads, (req, res) => {
  if (req.file) {
    const file = dataUri(req).content;
    return uploader
      .upload(file)
      .then(result => {
        const image = result.url;
        return res.status(200).json({
          messge: 'Your image has been uploded successfully to cloudinary',
          data: {
            image
          }
        });
      })
      .catch(err =>
        res.status(400).json({
          messge: 'someting went wrong while processing your request',
          data: {
            err
          }
        })
      );
  }
});

app.post('/api/v1/reflections', Reflection.create);
app.get('/api/v1/reflections', Reflection.getAll);
app.get('/api/v1/reflections/:id', Reflection.getOne);
app.put('/api/v1/reflections/:id', Reflection.update);
app.delete('/api/v1/reflections:id', Reflection.delete);
app.listen(port, () => console.log(`listening at ${port}`));
