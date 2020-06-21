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
                'Brainiac'
            ],
            wordWithBlanksCurrent: new String()
        }
    },
    computed: {
        chosenWord: function() {
            return this.words[Math.floor(Math.random() * this.words.length)].split('');
        },
        wordWithBlanks: function() {
            let theWord = [];
            for (let i=0; i < this.chosenWord.length; i++) {
                theWord[i] = '_';
            }
            return theWord;
        }
    },
    methods: {
        guessLetter: function(event) {
            let wordBeingGuessed = this.chosenWord.join('');
            event.target.disabled = 'disabled';
            let caseInsensitiveLetter = new RegExp(event.target.value, 'i');
            let searchForLetter = wordBeingGuessed.search(caseInsensitiveLetter);
            if (searchForLetter === -1) {
                console.log('fail');
            } else {
                this.wordWithBlanks[searchForLetter] = this.chosenWord[searchForLetter];
                this.wordWithBlanksCurrent = this.wordWithBlanks.join('');            
            }
        }
    },
    beforeMount() {
        this.wordWithBlanksCurrent = this.wordWithBlanks.join('');
    }
});