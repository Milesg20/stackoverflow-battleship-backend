import express, { Request, Response } from 'express';
import cors from 'cors';
import { gameRoutes } from './routes/gameRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enables CORS for frontend communication
app.use(express.json()); // Parses JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies

// Routes
app.use('/api/games', gameRoutes); // All game routes

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Starts server
app.listen(PORT, () => {
    console.log(`Battleship server is running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
});

export default app;
