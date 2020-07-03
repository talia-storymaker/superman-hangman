const app = new Vue({
    el: '#app',
    data() {
        return {
            words: [
                'Superman', 
                'Clark', 
                'Kent',
                'Lois',
                'Lane',
                'Perry',
                'White',
                'Jimmy',
                'Olsen',
                'Martha',
                'Jonathan',
                'Jon',
                'Supergirl',
                'Kara',
                'Lana',
                'Lang',
                'Pete',
                'Ross',
                'Lara',
                'Steel',
                'Lex',
                'Luthor',
                'Metallo',
                'Parasite',
                'Mongul',
                'Bizarro',
                'Krypton',
                'Kryptonian',
                'Kryptonite',
                'Superboy',
                'Conner',
                'Krypto',
                'Prankster',
                'Toyman',
                'Mxyzptlk',
                'Intergang',
                'Livewire',
                'Cat',
                'Grant',
                'Ron',
                'Troupe',
                'Steve',
                'Lombard',
                'Metropolis',
                'Smallville',
                'Dan',
                'Turpin',
                'Maggie',
                'Sawyer',
                'Henderson',
                'Doomsday',
                'Brainiac',
                'Emil',
                'Hamilton',
                'Zod'
            ],
            wordWithBlanksCurrent: new String(),
            incorrectGuesses: 0,
            winStatus: new String(),
            gameRunning: true
        }
    },
    computed: {
        chosenWord: function() {
            return this.words[Math.floor(Math.random() * this.words.length)].split('');
        },
        wordWithBlanks: function() {
            let theWord = [];
            for (let i = 0; i < this.chosenWord.length; i++) {
                theWord[i] = '_';
            }
            return theWord;
        }
    },
    methods: {
        guessLetter: function(letter) {
            let caseInsensitiveLetter = new RegExp(letter, 'i');
            let lettersCorrectlyGuessed = 0;
            for (let i = 0; i < this.chosenWord.length; i++) {
                if (caseInsensitiveLetter.test(this.chosenWord[i])) {
                    this.wordWithBlanks[i] = this.chosenWord[i];
                    lettersCorrectlyGuessed++;
                }
            }
            if (lettersCorrectlyGuessed === 0) {
                this.incorrectGuesses++;
            }
            document.getElementById(letter).disabled = 'disabled';
            this.wordWithBlanksCurrent = this.wordWithBlanks.join('');
            if (!this.wordWithBlanks.includes('_')) {
                this.winStatus = 'You won!';
                this.gameRunning = false;
            }
            if (this.incorrectGuesses === 6) {
                this.winStatus = 'You lose!';
                this.gameRunning = false;
            }
        }
    },
    beforeMount() {
        this.wordWithBlanksCurrent = this.wordWithBlanks.join('');
    }
});

document.addEventListener('keyup', function(event) {
    if (event.key === 'a' || event.key === 'b' || event.key === 'c' || event.key === 'd' || event.key === 'e' || event.key === 'f' || event.key === 'g' || event.key === 'h' || event.key === 'i' || event.key === 'j' || event.key === 'k' || event.key === 'l' || event.key === 'm' || event.key === 'n' || event.key === 'o' || event.key === 'p' || event.key === 'q' || event.key === 'r' || event.key === 's' || event.key === 't' || event.key === 'u' || event.key === 'v' || event.key === 'w' || event.key === 'x' || event.key === 'y' || event.key === 'z') {
        app.guessLetter(event.key);
    }
});