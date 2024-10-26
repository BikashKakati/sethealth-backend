import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.SERVER_PORT || 6000;

app.use(express.json());

// Basic GET route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express with TypeScript!');
});

// Basic POST route
app.post('/data', (req: Request, res: Response) => {
  const data = req.body;
  res.json({ message: 'Data received', data });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
