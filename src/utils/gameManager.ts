import { Game, Player } from './types';

// An ID generator for games and players
function generateId(): string {
    return Math.random().toString(36).substring(2, 15);
}

// Simple invite code generator
function generateInviteCode(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export class GameManager {
    private games: Map<string, Game> = new Map(); // stores all the game objects by their ID's

    /**
     * Create a new game
     * @param username The username of the host
     * @param isPrivate Is the game private?
     * @returns The created game
     */
    createGame(username: string, isPrivate: boolean): Game {
        const playerId = generateId(); // playerId is the id of the host
        const gameId = generateId(); // gameId is the id of the game

        // Creates host player
        const host: Player = {
            id: playerId, // playerId is the id of the host
            username, // username is the username of the host
            ready: false // host is not ready initially
        };

        // Creates game object
        const game: Game = {
            id: gameId, // gameId is the id of the game
            host, // host is the host player
            players: [host], // players is an array of players (initially just the host)
            isPrivate, // Whether or not the game is private
            status: 'waiting', // status is initially 'waiting'
            createdAt: new Date() // createdAt is the current date/time
        };

        // Set invite code only for private games
        if (isPrivate) {
            game.inviteCode = generateInviteCode(); // generates a random invite code
        }

        this.games.set(gameId, game); // Stores the game object in the games map

        return game; // Returns the created game object
    }

    /**
     * Join an existing game
     * @param username The username of the player joining the game
     * @param gameId The ID of the game to join  
     * @returns The joined game
     */
    joinGame(username: string, gameId?: string): { success: boolean; game?: Game; error?: string } {
        let targetGame: Game | undefined; // The game the player is trying to join

        // Checks if a gameId is provided
        if (gameId) {
            // Retrieve the game directly using the gameId
            targetGame = this.games.get(gameId);
            if (!targetGame) {
                return { success: false, error: 'Game not found' };
            }
        } else {
            // If no gameId is provided, find any available public game
            targetGame = Array.from(this.games.values()).find(game =>
                !game.isPrivate && // Found games will be public
                game.status === 'waiting' && // Found games will be in a "waiting" state
                game.players.length < 2 // Must be less than 2 players.
            );
            if (!targetGame) {
                return { success: false, error: 'No available public games' }; // no games found
            }
        }

        if (targetGame.players.length >= 2) {
            return { success: false, error: 'Game is full' };
        }

        // Creates new player and add to game
        const newPlayerId = generateId();
        const newPlayer: Player = {
            id: newPlayerId,
            username,
            ready: false
        };

        targetGame.players.push(newPlayer); // Adds the new player to the game

        // Returns the updated game object
        return { success: true, game: targetGame };
    }

    /**
     * Gets all public games
     */
    getPublicGames(): Game[] {
        return Array.from(this.games.values()).filter(game => !game.isPrivate);
    }
}

export const gameManager = new GameManager();
