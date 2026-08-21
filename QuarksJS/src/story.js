const T_TU = 'TU';//Tab unlocked
const T_TM = 'TM';//total mass (magnitude)
const T_MTL = 'MTL';//max transmuter level
const T_OSL = 'OSL';//object scanner level
const T_EB = 'EB';//manual enhance bonus

//Race: Omnikreinto
//Rank/Grade: novulo > gefrato
//Your name: ???
//rival: Remitrom
//Rival's sister: Yllom

//TODO: calculate maximum morality/order to score % of each

const storyChapters = [
    //unique id, trigger, value, story text
    {id:'INIT', n:'Welcome', t:null, v:null, s:['As a novulo at Cynosure Nexus you have learned to control quantum vibrations and basic transmutations. To advance to gefrato you must create your own universe.',
            'Start by creating some basic items. Then use your Object Scanner to discover new ways to transmute them into items of increasing complexity.']},
    {id:'TU_0', n:'Outputs into Inputs', t:T_TU, v:'M_2', //manage tab
        s:["Having inputs coming from other transmutation outputs could start to get messy, even if it is only three dimentional objects. You'll need a place to track and manage the flow of matter."]},
    {id:'TU_1', n:'Breaking Physics', t:T_TU, v:'M_3', //enhance tab
        s:['You just made a brilliant discovery! There is a way to adjust the physics in your new universe to increase the outputs without increasing the inputs.', 'Remitrom will never be able to keep up with you now.']},
    {id:'TU_2', n:'Remitrom', t:T_TU, v:'M_7', //story tab
        s:["Remitrom has been your lifelong rival, always just one step ahead. Without him you would easily be the top Omni in your class.",
        "Remitrom: \"Ha! You're still just transmuting Baryons? I've already transmuted Hydrogen. With a Brain Smartness Quotient of only 4w you can't expect to keep up with my BS Quotient of 4x.\""]},

    {id:'TM_0', n:'Breaking the Dalton mass', t:T_TM, v:1,
        s:['We need to rehome this mass, it is getting too large for its enclosure I have a spare Beta Class Enclosure in the closet.']},
    {id:'TM_1', n:'Bigger than a picogram', t:T_TM, v:2,
        s:['This thing is getting big. Time to order a Gamma Class Enclosure.']},
    {id:'TM_2', n:'Half-way to big', t:T_TM, v:3, s:['Time for a Delta Class Enclosure.']},
    {id:'TM_3', n:'Hugeness', t:T_TM, v:4, s:['Looks like the DCE is a bit small now, time for ECE.']},
    {id:'TM_4', n:'Large Mass', t:T_TM, v:5, s:['This mass is big enough for a ZCE now.']},

    {id:'MTL_0', n:'A good start', t:T_MTL, v:16, s:['I am now making enough base level items to start on something a little more complex.']},
    {id:'MTL_1', n:'Making progress', t:T_MTL, v:64, s:['In order to continue making larger more complex items I need to continue to level up the base item synthesis.']},
    {id:'MTL_2', n:'Speeding up', t:T_MTL, v:256, s:['With this much throughput I\'ll have plenty of mass to work with.']},
    {id:'MTL_3', n:'Zoom Zoom', t:T_MTL, v:1024, s:['Is there a limit to these transmuters?']},
//max level without cheating is 1025
//TEST: this limit
    {id:'MTL_4', n:'Something isn\'t right here', t:T_MTL, v:2048, s:['Not sure how this happened. This seems bigger than it should be.']},

    {id:'OSL_0', n:'Scanner Lvl 1', t:T_OSL, v:2, s:['With this improved scanner I can start to discover larger items.']},
    {id:'OSL_1', n:'Scanner Lvl 2', t:T_OSL, v:3, s:['I have been approved to expand my scanner capabilities.']},
    {id:'OSL_2', n:'Scanner Lvl 3', t:T_OSL, v:4, s:['My level 3 scanner license has just been approved.']},
    {id:'OSL_3', n:'Scanner Lvl 4', t:T_OSL, v:5, s:['With a level 4 scanner license I will be able to scan even larger items.']},
    {id:'OSL_4', n:'Scanner Lvl 5', t:T_OSL, v:6, s:['Maximum level scanner license has just been approved', 'Now I can finally scan for the largest items.']},

    {id:'EB_0', n:'Mass Doubling', t:T_EB, v:2, s:['Check this out, my mass output is doubling now.']},
    {id:'EB_1', n:'Quad Blasters', t:T_EB, v:4, s:['Mass output is now 4x, things are really speeding up now.']},
    {id:'EB_2', n:'Octo-speed', t:T_EB, v:8, s:['2**3 is even faster! Hardly need to manage the inputs anymore.']},
    {id:'EB_3', n:'4 Speed!', t:T_EB, v:16, s:['Every click gives so much output now Remitrom has no way of keeping up.']},
    {id:'EB_4', n:'Zoom Zoom', t:T_EB, v:32, s:['At 32x output for each manual click makes my mass goals achievable.']},
    {id:'EB_5', n:'Faster than fast', t:T_EB, v:64, s:['This mass is now growing so fast I can see some real potential here.']},
    {id:'EB_6', n:'Turbo Dude', t:T_EB, v:128, s:['With an output multiplier over 100 I\'m solidly ahead of Remotrom now.']},
    {id:'EB_7', n:'Minimum Effort', t:T_EB, v:256, s:['At 256x output I\'ll get to a full galaxy size quick as a whip.']},
];

const storyResponses = [
//TODO: add a few chaotic/order responses

    //unique id, chapID, morality, order, story text
    {id:'INIT_0', cid:'INIT', m:1, o:0, s:['Awesome!','I can\'t wait to get started']},
    {id:'INIT_1', cid:'INIT', m:0, o:0, s:['Whatever, I can if I have to.']},
    {id:'INIT_2', cid:'INIT', m:-1, o:0, s:['Finally! I can rule my own universe the way it should be!']},

    {id:'TU_0_0', cid:'TU_0', m:1, o:1, s:['Wonderful, I look forward to tackling this new challenge.']},
    {id:'TU_0_1', cid:'TU_0', m:0, o:-1, s:['Meh, one atom is like another. No need to label everything.']},

    {id:'TU_1_0', cid:'TU_1', m:1, o:0, s:['This is great! I can\'t wait to tell everyone.']},
    {id:'TU_1_1', cid:'TU_1', m:-1, o:0, s:['Nobody will be able to keep up with my universe now!']},

    {id:'TU_2_0', cid:'TU_2', m:1, o:0, s:['Good work Remetrom, I\'m glad you always push me to work harder.']},
    {id:'TU_2_1', cid:'TU_2', m:-1, o:0, s:['You can take those Hydrogens and shove them up  your downspout.']},

    {id:'MTL_0_0', cid:'MTL_0', m:1, o:0, s:['This thing is nice! I\'m excited to start scanning some larger objects.']},
    {id:'MTL_0_1', cid:'MTL_0', m:-1, o:0, s:['Drat, now I suppose I need to buy a new scanner.']},

    {id:'MTL_1_0', cid:'MTL_1', m:1, o:0, s:['Wow! Even bigger items; amazing!']},
    {id:'MTL_1_1', cid:'MTL_1', m:-1, o:0, s:['Now for this scanner upgrading nonsense again.']},

    {id:'MTL_2_0', cid:'MTL_2', m:1, o:0, s:['Incredible! This scanner will allow me to expand my universe even more.']},
    {id:'MTL_2_1', cid:'MTL_2', m:-1, o:0, s:['What a pain, more scanner upgrades.']},

    {id:'MTL_3_0', cid:'MTL_3', m:1, o:0, s:['This scanner is stupendous!']},
    {id:'MTL_3_1', cid:'MTL_3', m:-1, o:0, s:['The bigger the scanner the harder to upgrade it.']},

    {id:'MTL_4_0', cid:'MTL_4', m:1, o:0, s:['Ooh! Maximum level scanner!']},
    {id:'MTL_4_1', cid:'MTL_4', m:-1, o:0, s:['FINALLY, this whole thing is taking too long.']},

    {id:'OSL_0_0', cid:'OSL_0', m:1, o:0, s:['Wow! There are so many possibilities!']},
    {id:'OSL_0_1', cid:'OSL_0', m:0, o:0, s:['Oh great, more buttons.']},

    {id:'OSL_1_0', cid:'OSL_1', m:1, o:0, s:['I like these things, they are really starting to have fun and unique uses.']},
    {id:'OSL_1_1', cid:'OSL_1', m:0, o:0, s:['Just more stuff stuck together.']},

    {id:'OSL_2_0', cid:'OSL_2', m:1, o:0, s:['Woo Hoo! I am making some good progress now!']},
    {id:'OSL_2_1', cid:'OSL_2', m:0, o:0, s:['Now I have to upgrade this nonsense again.']},

    {id:'OSL_3_0', cid:'OSL_3', m:1, o:0, s:['These things are getting so big, I love it!']},
    {id:'OSL_3_1', cid:'OSL_3', m:0, o:0, s:['Does this ever end?']},

    {id:'OSL_4_0', cid:'OSL_4', m:1, o:0, s:['Awesome! These discovered items are getting massive!']},
    {id:'OSL_4_1', cid:'OSL_4', m:-1, o:0, s:['Just great, what am I supposed to do with all this stuff.']},

    {id:'EB_0_0', cid:'EB_0', m:1, o:0, s:['']},
    {id:'EB_0_1', cid:'EB_0', m:-1, o:0, s:['']},

    {id:'EB_1_0', cid:'EB_1', m:1, o:0, s:['']},
    {id:'EB_1_1', cid:'EB_1', m:-1, o:0, s:['']},

    {id:'EB_2_0', cid:'EB_2', m:1, o:0, s:['']},
    {id:'EB_2_1', cid:'EB_2', m:-1, o:0, s:['']},

    {id:'EB_3_0', cid:'EB_3', m:1, o:0, s:['']},
    {id:'EB_3_1', cid:'EB_3', m:-1, o:0, s:['']},

    {id:'EB_4_0', cid:'EB_4', m:1, o:0, s:['']},
    {id:'EB_4_1', cid:'EB_4', m:-1, o:0, s:['']},

    {id:'EB_5_0', cid:'EB_5', m:1, o:0, s:['']},
    {id:'EB_5_1', cid:'EB_5', m:-1, o:0, s:['']},

    {id:'EB_6_0', cid:'EB_6', m:1, o:0, s:['']},
    {id:'EB_6_1', cid:'EB_6', m:-1, o:0, s:['']},

    {id:'EB_7_0', cid:'EB_7', m:1, o:0, s:['']},
    {id:'EB_7_1', cid:'EB_7', m:-1, o:0, s:['']},


];

function storyUnlock(){
    const notDone = storyChapters.filter(x => !game.story.includes(x.id));

    //TU
    const TU = notDone.filter(x => x.t === T_TU);
    TU.forEach(x => {
        if(!game.menu.children[x.v].b.classList.contains('hide')){
            game.story.push(x.id);
        }
    });

    //TM
    const TM = notDone.filter(x => x.t === T_TM).sort((a,b) => a.v-b.v)[0];
    if(TM && TM.v <= game.enhancements.totalTransmuted.magnitude().i){
        game.story.push(TM.id);
    }

    //MTL
    const MTL = notDone.filter(x => x.t === T_MTL).sort((a,b) => a.v-b.v)[0];
    if(MTL && MTL.v <= Math.max(...game.transmuters.map(x => x.l))){
        game.story.push(MTL.id);
    }

    //OSL
    const OSL = notDone.filter(x => x.t === T_OSL).sort((a,b) => a.v-b.v)[0];
    if(OSL && OSL.v <= game.osl){
        game.story.push(OSL.id);
    }

    //EB
    const EB = notDone.filter(x => x.t === T_EB).sort((a,b) => a.v-b.v)[0];
    if(EB && EB.v <= game.enhancements.powerM[0] * game.enhancements.powerG[0]){
        game.story.push(EB.id);
    }
}

function renderStory(){
    const parent = getUIElement('M_7__Content');
    //remove the divs/keep a couple spans if they exist.
    for(let i=parent.children.length-1; i>=0;i--){
        if(['div', 'button'].includes(parent.children[i].tagName.toLowerCase())){
            parent.children[i].remove();
        }
    }
    game.story.forEach(x => renderChapter(parent, x));
}

function renderChapter(parent, input){
    const chapter = storyChapters.find(x => x.id === input);
    if(!chapter){return;}

    createUIElement({type:'button', parent:createUIElement({parent:parent, cssClasses:['chapter']}), cssClasses:['chapterName'], textContent:chapter.n,
        onclick:() => chapWrap.classList.toggle('hide')});
    const chapWrap = createUIElement({parent: parent, cssClasses:['chapter', 'hide']})

    chapter.s.forEach(x => {
        createUIElement({type:'p', parent:chapWrap, textContent:x});
    });

    const responseWrapper = createUIElement({parent:chapWrap, cssClasses:['responsesWrapper']});
    renderResponses(responseWrapper, chapter.id);
}

function renderResponses(parent, chapter){
    const responses = storyResponses.filter(x => x.cid === chapter);
    console.log(parent, chapter, responses);
    responses.forEach(r => {
        createUIElement({type:'input', id:`R__${r.id}`, parent: parent,
            attr:{type:'radio', name:chapter}
        });
        const s = r.s.join('\n');
        createUIElement({type:'label', parent: parent, textContent:s, cssClasses:['response'],
            attr:{for:`R__${r.id}`}
        });

        createUIElement({type:'hr', parent: parent});
    });
}

