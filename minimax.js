let score = {
    "X": 1,
    "TIE": 0,
    "O": -1,
};

function minimax() {
    let value = -Infinity;
    let position;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (Game.board[i][j] === " ") {
                Game.board[i][j] = "X";
                let decision = minimaxDecision(Game.board, Game.gameRound, false);
                Game.board[i][j] = " ";
                if (decision > value) {
                    value = decision;

                    position = {
                        i,
                        j
                    };
                }
            }
        }
    }
    if (position) {
        Game.board[position.i][position.j] = "X";
        Game.gameRound++;
    }
}

function minimaxDecision(board, depth, maximizingPlayer) {
    if (depth >= 9) {
        return score["TIE"];
    } else if (Game.checkBoard()) {

        return maximizingPlayer === true ? score["O"] : score["X"];
    }

    if (maximizingPlayer) {
        let value = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === " ") {
                    board[i][j] = "X";
                    value = max(value, minimaxDecision(board, depth + 1, false));
                    board[i][j] = " ";
                }
            }
        }
        return value;
    } else {
        let value = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === " ") {
                    board[i][j] = "O";
                    value = min(value, minimaxDecision(board, depth + 1, true));
                    board[i][j] = " ";
                }
            }
        }
        return value;
    }
}
