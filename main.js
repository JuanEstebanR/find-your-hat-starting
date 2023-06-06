
const prompt = require('prompt-sync')({ sigint: true });
const term = require('terminal-kit').terminal;

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field {
    constructor(arryfield) {
        this._field = arryfield;
        this._x = 0;
        this._y = 0;
        this.turns = 0;
    };

    print() {
        for (const row of this._field) {
            console.log(row.join(' '));
        }
    };
    playGame() {
        // assign the hat and pathCharacter to a random position
        this.RandomPosition(this._field, hat);
        this.RandomPosition(this._field, pathCharacter);
        let x = this._x;
        let y = this._y;
        // print the field to the console
        this.print();
        let continueGame = true;
        while (continueGame) {
            let direction = prompt('Which direction would you like to move? \n Please enter W for up, D for  Right, A for Left, or S for Down: ');
            direction = direction.toUpperCase();
            switch (direction) {
                case 'D':
                    if (x < this._field[0].length - 1) {
                        this._field[y][x] = fieldCharacter;
                        x++;
                    } else {
                        term.red('you cannot move that way\n');
                    }
                    break;
                case 'S':
                    if (y < this._field.length - 1) {
                        this._field[y][x] = fieldCharacter;
                        y++;
                    } else {
                        term.red('you cannot move that way\n');
                    }
                    break;
                case 'W':
                    if (y > 0) {
                        this._field[y][x] = fieldCharacter;
                        y--;
                    } else {
                        term.red('you cannot move that way\n');
                    }
                    break;
                case 'A'
                :
                    if (x > 0) {
                        this._field[y][x] = fieldCharacter;
                        x--;
                    } else {
                        term.red('you cannot move that way\n');
                    }
                    break;
                default:
                    term.red('you cannot move that way\n');
                    break;
            }

            if (this._field[y][x] === hole) {
                continueGame = false;
                term.red(`Sorry, you fell in a hole ${hole}`).bold();
            } else if (this._field[y][x] === hat) {
                continueGame = false;
                term.yellow(`Congratulations, you found your hat ${hat}`).bold();
            } else {
                this._field[y][x] = pathCharacter;
                this.print();
            }
        }
    }

    // have the any character start on a random position in the field
    RandomPosition(field, icon) {
        let x = 0;
        let y = 0;
        while ((x === 0 && y === 0)) {
            x = Math.floor(Math.random() * field[0].length);
            y = Math.floor(Math.random() * field.length);
            console.log(x, y);
            console.log(field[y][x]);
            console.log(field[y][x] === fieldCharacter);;
            if ((x > 0 && y > 0)) {
                if (field[y][x] === fieldCharacter) {
                    field[y][x] = icon;
                    this._x = x;
                    this._y = y;
                    break;
                }
            }
            x = 0;
            y = 0;
        }
    }

    static generateField(height, width, percentage) {
        const newField = [];
        // Creating the playing field
        for (let i = 0; i < height; i++) {
            const row = [];
            for (let j = 0; j < width; j++) {
                row.push(Math.random() < percentage ? hole : fieldCharacter);
            }
            newField.push(row);
        }

        return newField;
    };
}

let myField

//created the field with the hat and holes
const newField = Field.generateField(5, 5, 0.2);

//instantiate a Field object using newField = hatAndHoles and field = blankField  
myField = new Field(newField);

//call playGame method
myField.playGame();

