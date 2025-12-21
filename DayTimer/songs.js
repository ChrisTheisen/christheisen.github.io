/*
 * Songs have n: name, gain (g), and channels (c).
 * name is a string
 * gain sets the default volume for a given channel
 *  leave empty for all ones
 *  set gain=0 for a rest
 * channel is an array of notes, notes have a frequency and a time.
 *  each note is held until the next note
 */

const BEEP = {//A,C,C
    n:'BEEP',
    g:[],
    c:[
        [{g:1,f:C3, t:.8}],
        [{g:0,t:.2},{g:1,f:E3, t:.8}],
        [{g:0,t:.4},{g:1,f:G3, t:.8}],
        [{g:0,t:.6},{g:1,f:Bb3, t:.8}],
    ]
}

const Songs = [
    {//A,C,C
        n:'ACD',
        g:[1,.2,.2],
        c:[
            [{g:1,f:A3, t:.5},{g:1,f:C4,t:.5},{g:1,f:D4, t:1}],
            [{g:1,f:CS4,t:.5},{g:1,f:E4,t:.5},{g:1,f:FS4,t:1}],
            [{g:1,f:E4, t:.5},{g:1,f:G4,t:.5},{g:1,f:A4, t:1}],
        ]
    },
    {//The Riddle by Gigi D'Agostino
        n:'The Riddle',
        g:[1,.2,.2,.2],
        c:[//C#, F#, G#
            [{g:1,f:FS4,t:.25},{g:1,f:GS4,t:.25},
                {g:1,f:A4,t:.5},{g:1,f:A4,t:.25},{g:1,f:B4,t:.25},{g:1,f:A4,t:.25},{g:1,f:GS4,t:.25},{g:1,f:FS4,t:.25},{g:1,f:E4,t:.25},
                {g:1,f:E4,t:.5},{g:1,f:FS4,t:.25},{g:1,f:GS4,t:.25},{g:1,f:GS4,t:.5},{g:1,f:FS4,t:.25},{g:1,f:GS4,t:.25},
                {g:1,f:A4,t:.5},{g:1,f:A4,t:.25},{g:1,f:B4,t:.25},{g:1,f:A4,t:.25},{g:1,f:GS4,t:.25},{g:1,f:FS4,t:.25},{g:1,f:E4,t:.25},
                {g:1,f:FS4,t:.5},{g:1,f:FS4,t:.25},{g:1,f:E4,t:.23},{g:0,f:E4,t:.02},{g:1,f:E4,t:.5},
            ],

            [{g:0,t:.5},
                {g:1,f:FS2,t:.25},{g:1,f:FS3,t:.25},{g:1,f:FS2,t:.25},{g:1,f:FS3,t:.25},{g:1,f:E2,t:.25},{g:1,f:E3,t:.25},{g:1,f:E2,t:.25},{g:1,f:E3,t:.25},
                {g:1,f:A2,t:.25},{g:1,f:E3,t:.25},{g:1,f:A2,t:.25},{g:1,f:E3,t:.25},{g:1,f:B2,t:.25},{g:1,f:FS3,t:.25},{g:1,f:B2,t:.25},{g:1,f:FS3,t:.25},
                {g:1,f:FS2,t:.25},{g:1,f:FS3,t:.25},{g:1,f:FS2,t:.25},{g:1,f:FS3,t:.25},{g:1,f:E2,t:.25},{g:1,f:E3,t:.25},{g:1,f:E2,t:.25},{g:1,f:E3,t:.25},
            ],
            [{g:0,t:.5},
                {g:0, t:.25},{g:1,f:A3,t:.25},{g:0,t:.25},{g:1,f:A3,t:.25},{g:0,t:.25},{g:1,f:GS3,t:.25},{g:0,t:.25},{g:1,f:GS3,t:.25},
                {g:0, t:.25},{g:1,f:A3,t:.25},{g:0,t:.25},{g:1,f:A3,t:.25},{g:0,t:.25},{g:1,f:B3,t:.25},{g:0,t:.25},{g:1,f:B3,t:.25},
                {g:0, t:.25},{g:1,f:A3,t:.25},{g:0,t:.25},{g:1,f:A3,t:.25},{g:0,t:.25},{g:1,f:GS3,t:.25},{g:0,t:.25},{g:1,f:GS3,t:.25},
            ],
            [{g:0,t:.5},
                {g:0,t:.25},{g:1,f:C4,t:.25},{g:0,t:.25},{g:1,f:C4,t:.25},{g:0,t:.25},{g:1,f:B3,t:.25},{g:0,t:.25},{g:1,f:B3,t:.25},
                {g:0,t:.25},{g:1,f:C4,t:.25},{g:0,t:.25},{g:1,f:C4,t:.25},{g:0,t:.25},{g:1,f:D4,t:.25},{g:0,t:.25},{g:1,f:D4,t:.25},
                {g:0,t:.25},{g:1,f:C4,t:.25},{g:0,t:.25},{g:1,f:C4,t:.25},{g:0,t:.25},{g:1,f:B3,t:.25},{g:0,t:.25},{g:1,f:B3,t:.25},
            ],
        ]
    },
    {
        g:[1],
        n:'Elise',
        c:[
            [{f:E5,t:.25},{f:Db5,t:.25},{f:E5,t:.25},{f:Db5,t:.25},{f:E5,t:.25},{f:B4,t:.25},{f:D5,t:.25},{f:C5,t:.25},{f:A4,t:.5}]
        ]
    }
];
