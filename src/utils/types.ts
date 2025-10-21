// The type of the player object.
export interface Player {
    id: string; // User's unique Identification Number.
    username: string; // User's username. 
    ready: boolean;   // Is the user ready to play?
}

// The type of the Game object.
export interface Game {
    id: string; // The game's unique Identification Number.
    host: Player; // The host of the game.
    players: Player[]; // The players in the game.
    isPrivate: boolean; // Is the game private?
    inviteCode?: string; // Invite code for private games
    status: 'waiting' | 'in-progress' | 'finished'; // The current status of the game.
    createdAt: Date; // When the game was created
}

// API Request/Response types for the Game Manager

// POST /api/games - Creates a new game
export interface CreateGameRequest {
    username: string; // The user who created the game.
    isPrivate: boolean; // Is the game private?
}

// RPOST /api/games - Response for creating a new game
export interface CreateGameResponse {
    success: boolean; // Did the game creation succeed?
    game?: Game; // The game object, if successful.
    error?: string; // The error message, if unsuccessful.
}
// POST /api/games/join - Joins an existing game
export interface JoinGameRequest {
    username: string; // The user joining the game.
    gameId?: string; // The game ID to join.
    inviteCode?: string; // The invite code to join.
}
// RPOST /api/games/join - Response for joining an existing game
export interface JoinGameResponse {
    success: boolean; // Did the join succeed?
    game?: Game; // The game object, if successful.
    error?: string; // The error message, if unsuccessful.
}