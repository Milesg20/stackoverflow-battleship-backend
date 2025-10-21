import { Request, Response } from 'express';
import { gameManager } from '../utils/gameManager';

/**
 * Creates a new game
 */
export const createGame = (req: Request, res: Response) => {
    try {
        const { username, isPrivate } = req.body;

        // Validates required fields
        if (!username) {
            res.status(400).json({ 
                success: false, 
                error: 'Username is required' 
            });
            return;
        }

        if (typeof isPrivate !== 'boolean') {
            res.status(400).json({ 
                success: false, 
                error: 'isPrivate must be a boolean' 
            });
            return;
        }

        // Creates the game
        const game = gameManager.createGame(username, isPrivate);

        res.status(200).json({ 
            success: true, 
            game: game
        });
    } catch (error) {
        console.error('Error creating game:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Internal server error' 
        });
    }
};

/**
 * Join an existing game
 */
export const joinGame = (req: Request, res: Response) => {
    try {
        const { username, gameId } = req.body;

        // Validates required fields
        if (!username) {
            res.status(400).json({ 
                success: false, 
                error: 'Username is required' 
            });
            return;
        }

        // Join the game
        const result = gameManager.joinGame(username, gameId);

        if (!result.success) {
            res.status(400).json(result);
            return;
        }

        res.status(200).json(result);
    } catch (error) {
        console.error('Error joining game:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Internal server error' 
        });
    }
};

/**
 * Gets all public games
 */
export const getPublicGames = (req: Request, res: Response) => {
    try {
        const publicGames = gameManager.getPublicGames();
        
        res.status(200).json({ 
            success: true, 
            games: publicGames 
        });
    } catch (error) {
        console.error('Error getting public games:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Internal server error' 
        });
    }
};