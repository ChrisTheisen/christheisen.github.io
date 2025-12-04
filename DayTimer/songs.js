/*
 * Songs have n: name, gain (g), and channels (c).
 * name is a string
 * gain sets the volume for a given channel
 *  leave empty for all ones
 * channel is an array of notes, notes have a frequency and a time.
 *  each note is held until the next note
 *  use a frequency of 0 for a rest
 */

const BEEP = {//A,C,C
    n:'BEEP',
    g:[],
    c:[
        [{f:C3, t:.8}],
        [{f:0,t:.2},{f:E3, t:.8}],
        [{f:0,t:.4},{f:G3, t:.8}],
        [{f:0,t:.6},{f:Bb3, t:.8}],
    ]
}

const Songs = [
    {//A,C,C
        n:'ACD',
        g:[1,.2,.2],
        c:[
            [{f:A3, t:.5},{f:C4,t:.5},{f:D4, t:1}],
            [{f:CS4,t:.5},{f:E4,t:.5},{f:FS4,t:1}],
            [{f:E4, t:.5},{f:G4,t:.5},{f:A4, t:1}],
        ]
    },
    {//The Riddle by Gigi D'Agostino
        n:'The Riddle',
        g:[1,.2,.2,.2],
        c:[//C#, F#, G#
            [{f:FS4,t:.25},{f:GS4,t:.25},
                {f:A4,t:.5},{f:A4,t:.25},{f:B4,t:.25},{f:A4,t:.25},{f:GS4,t:.25},{f:FS4,t:.25},{f:E4,t:.25},
                {f:E4,t:.5},{f:FS4,t:.25},{f:GS4,t:.25},{f:GS4,t:.5},{f:FS4,t:.25},{f:GS4,t:.25},
                {f:A4,t:.5},{f:A4,t:.25},{f:B4,t:.25},{f:A4,t:.25},{f:GS4,t:.25},{f:FS4,t:.25},{f:E4,t:.25},
                {f:FS4,t:.5},{f:FS4,t:.25},{f:E4,t:.25},{f:E4,t:.5},
            ],

            [{f:0,t:.5},
                {f:FS2,t:.25},{f:FS3,t:.25},{f:FS2,t:.25},{f:FS3,t:.25},{f:E2,t:.25},{f:E3,t:.25},{f:E2,t:.25},{f:E3,t:.25},
                {f:A2,t:.25},{f:E3,t:.25},{f:A2,t:.25},{f:E3,t:.25},{f:B2,t:.25},{f:FS3,t:.25},{f:B2,t:.25},{f:FS3,t:.25},
                {f:FS2,t:.25},{f:FS3,t:.25},{f:FS2,t:.25},{f:FS3,t:.25},{f:E2,t:.25},{f:E3,t:.25},{f:E2,t:.25},{f:E3,t:.25},
            ],
            [{f:0,t:.5},
                {f:0, t:.25},{f:A3,t:.25},{f:0,t:.25},{f:A3,t:.25},{f:0,t:.25},{f:GS3,t:.25},{f:0,t:.25},{f:GS3,t:.25},
                {f:0, t:.25},{f:A3,t:.25},{f:0,t:.25},{f:A3,t:.25},{f:0,t:.25},{f:B3,t:.25},{f:0,t:.25},{f:B3,t:.25},
                {f:0, t:.25},{f:A3,t:.25},{f:0,t:.25},{f:A3,t:.25},{f:0,t:.25},{f:GS3,t:.25},{f:0,t:.25},{f:GS3,t:.25},
            ],
            [{f:0,t:.5},
                {f:0,t:.25},{f:C4,t:.25},{f:0,t:.25},{f:C4,t:.25},{f:0,t:.25},{f:B3,t:.25},{f:0,t:.25},{f:B3,t:.25},
                {f:0,t:.25},{f:C4,t:.25},{f:0,t:.25},{f:C4,t:.25},{f:0,t:.25},{f:D4,t:.25},{f:0,t:.25},{f:D4,t:.25},
                {f:0,t:.25},{f:C4,t:.25},{f:0,t:.25},{f:C4,t:.25},{f:0,t:.25},{f:B3,t:.25},{f:0,t:.25},{f:B3,t:.25},
            ],
        ]
    }
];
