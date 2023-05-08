const app = new Vue({
    el: '#app',
    data() {
        return {
            words: [],
            easyWords: [
                'Superman', 
                'Clark', 
                'Kent',
                'Kal-El',
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
                'Jor-El',
                'Steel',
                'Lex',
                'Luthor',
                'Metallo',
                'Parasite',
                'Bizarro',
                'Krypton',
                'Kryptonian',
                'Kryptonite',
                'Superboy',
                'Krypto',
                'Metropolis',
                'Smallville',
                'Doomsday',
                'Brainiac',
                'Zod',
                'Danvers',
                'LexCorp',
                'Daily',
                'Planet',
                'Phantom',
                'Zone'
            ],
            mediumWords: [
                'Mongul',
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
                'Lori',
                'Lemaris',
                'Lucy',
                'Conduit',
                'Bloodsport',
                'Fortress',
                'Solitude',
                'Kandor',
                'Bibbo',
                'Bibbowski',
                'SCU',
                'STAR',
                'Emil',
                'Hamilton',
                'Dan',
                'Turpin',
                'Maggie',
                'Sawyer',
                'Henderson',
                'Conner',
                'Linda',
                'Zor-El',
                'Ultra-Humanite',
                'Mercy',
                'Streaky',
                'Ursa',
                'Non',
                'Faora',
                'Kelex',
                'Eradicator',
                'Irons',
                'Natasha',
                'John',
                'Henry',
                'Lor-Van',
                'Lor-Zod',
                'Bruno',
                'Mannheim',
                'Titano',
                'Warworld',
                'Sam',
                'Maxima',
                'Superdog',
                'Supercat',
                'Corben',
                'Mon-El',
                'Rudy',
                'Jones',
                'Kon-El',
                'Hank',
                'Henshaw',
                'Cadmus',
                'Guardian',
                'Leslie',
                'Willis',
                'Karen',
                'Starr',
                'Zor-L',
                'Kal-L',
                'Lexor',
                'Chloe',
                'Sullivan',
                'Rao',
                'Superboy-Prime',
                'Kong',
                'Kenan',
                'Winslow',
                'Schott'
            ],
            hardWords: [
                'Daxam',
                'Daxamite',
                'Draaga',
                'Matrix',
                'Volcana',
                'Satanus',
                'Graves',
                'Puzzler',
                'Ultraman',
                'Jax-Ur',
                'Comet',
                'Beppo',
                'Quex-Ul',
                'Mala',
                'Chris',
                'Rose',
                'Thorn',
                'Franklin',
                'Stern',
                'Lena',
                'Super-Monkey',
                'Super-Horse',
                'Susie',
                'Ella',
                'Dominus',
                'Terra-Man',
                'Dabney',
                'Donovan',
                'Phineas',
                'Potter',
                'Gangbuster',
                'George',
                'Taylor',
                'Paul',
                'Westfield',
                'Jack',
                'Nimball'
            ],
            chosenWord: '',
            wordWithBlanks: '',
            wordWithBlanksCurrent: '',
            incorrectGuesses: 0,
            winStatus: 0, // 0 = not completed, 1 = won, -1 = lost
            gameRunning: true,
            settingsShown: false,
            // Settings
            showAnswerOnLoss: true,
            wordListInclusions: {
                easyWords: true,
                mediumWords: true,
                hardWords: false
            }
        }
    },
    computed: {
        headImage() {
            let supermanStatus = "sad";
            if (this.winStatus === 1) { supermanStatus = "happy" };
            if (this.winStatus === -1) { supermanStatus = "dead" };
            return `images/1-head-${supermanStatus}.png`;
        },
        winStatusText() {
            if (this.winStatus === 1) { return "You win!" };
            if (this.winStatus === -1) { return "You lose" };
            return "";
        }
    },
    watch: {
        showAnswerOnLoss(newValue, oldValue) {
            localStorage.setItem("showAnswerOnLoss", JSON.stringify(newValue));
        },
        wordListInclusions: {
            handler(newValue, oldValue) {
                localStorage.setItem("easyWords", JSON.stringify(newValue.easyWords));
                localStorage.setItem("mediumWords", JSON.stringify(newValue.mediumWords));
                localStorage.setItem("hardWords", JSON.stringify(newValue.hardWords));
            },
            deep: true
        }
    },
    methods: {
        guessLetter: function(letter) {
            if (this.gameRunning) {
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
                    this.winStatus = 1;
                    this.gameRunning = false;
                }
                if (this.incorrectGuesses === 6) {
                    this.winStatus = -1;
                    if (this.showAnswerOnLoss) {
                        let wordWithBlanksCurrentArray = this.wordWithBlanksCurrent.split("");
                        for (let i = 0; i < wordWithBlanksCurrentArray.length; i++) {
                            if (wordWithBlanksCurrentArray[i] === "_") {
                                wordWithBlanksCurrentArray[i] = `<span class="not-guessed">${this.chosenWord[i]}</span>`
                            }
                        }
                        this.wordWithBlanksCurrent = wordWithBlanksCurrentArray.join("");
                    }
                    this.gameRunning = false;
                }
            }
        },
        newGame: function() {
            location.reload();
        },
        // utility
        getStoredItem: function(itemKey) {
            let gottenItem = JSON.parse(localStorage.getItem(itemKey));
            if (gottenItem === null) {
                return;
            } else {
                if (itemKey === "showAnswerOnLoss") {
                    this[itemKey] = gottenItem;
                } else {
                    // all the other settings are properties of wordListInclusions
                    this.wordListInclusions[itemKey] = gottenItem;
                }
            }
        }
    },
    mounted() {
        this.getStoredItem("showAnswerOnLoss");
        this.getStoredItem("easyWords");
        this.getStoredItem("mediumWords");
        this.getStoredItem("hardWords");
        if (Object.values(this.wordListInclusions).includes(true)) {
            if (this.wordListInclusions.easyWords) {
                this.words = this.words.concat(this.easyWords);
            }
            if (this.wordListInclusions.mediumWords) {
                this.words = this.words.concat(this.mediumWords);
            }
            if (this.wordListInclusions.hardWords) {
                this.words = this.words.concat(this.hardWords);
            }
        } else {
            this.words = this.easyWords.concat(this.mediumWords);
        }
        this.chosenWord = this.words[Math.floor(Math.random() * this.words.length)].split('');
        // create word with blanks
        let theWord = [];
        for (let i = 0; i < this.chosenWord.length; i++) {
            theWord[i] = '_';
        }
        this.wordWithBlanks = theWord;
        this.wordWithBlanksCurrent = this.wordWithBlanks.join('');
    }
});

document.addEventListener('keyup', function(event) {
    if (event.key === 'a' || event.key === 'b' || event.key === 'c' || event.key === 'd' || event.key === 'e' || event.key === 'f' || event.key === 'g' || event.key === 'h' || event.key === 'i' || event.key === 'j' || event.key === 'k' || event.key === 'l' || event.key === 'm' || event.key === 'n' || event.key === 'o' || event.key === 'p' || event.key === 'q' || event.key === 'r' || event.key === 's' || event.key === 't' || event.key === 'u' || event.key === 'v' || event.key === 'w' || event.key === 'x' || event.key === 'y' || event.key === 'z' || event.key === '-') {
        if (!document.getElementById(event.key).disabled) {
            app.guessLetter(event.key);
        }
    }
});