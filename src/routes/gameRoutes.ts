import { Router } from 'express';
import {
    createGame,
    joinGame,
    getPublicGames
} from '../controllers/gameController';

const router = Router();

// POST routes
router.post('/', createGame);              // Creates a new game
router.post('/join', joinGame);            // Joins an existing game

// GET routes
router.get('/public', getPublicGames);     // Gets all public games

export { router as gameRoutes };