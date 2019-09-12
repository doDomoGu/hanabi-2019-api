import express from 'express';

const router = express.Router();

router.get('/a', (req, res) => {
  res.send('[GET222] this is test');
});

router.post('/a2', (req, res) => {
  res.send('[POST222] this is test');
});

export default router;
