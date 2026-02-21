const T_TU = 'TU';//Tab unlocked
const T_TM = 'TM';//total mass (magnitude)
const T_MTL = 'MTL';//max transmuter level
const T_OSL = 'OSL';//object scanner level
const T_EB = 'EB';//enhance bonus

//Race: Omnikreinto
//Rank/Grade: novulo > gefrato
//Your name: ???
//rival: Remitrom
//Rival's sister: Yllom

const storyChapters = [
    //id, trigger, value, story text
    {id:'INIT', n:'Welcome', t:null, v:null, s:['As a novulo at Cynosure Nexus you have learned to control quantum vibrations and basic transmutations. To advance to gefrato you must create your own universe.',
            'Start by creating some basic items. Then use your Object Scanner to discover new ways to transmute them into items of increasing complexity.']},
    {id:'TU_0', n:'Outputs into Inputs', t:T_TU, v:'M_2', //manage tab
        s:["Having inputs coming from other transmutation outputs could start to get messy, even if it is only three dimentional objects. You'll need a place to track and manage the flow of matter."]},
    {id:'TU_1', n:'Breaking Physics', t:T_TU, v:'M_3', //enhance tab
        s:['You just made a brilliant discovery! There is a way to adjust the physics in your new universe to increase the outputs without increasing the inputs.', 'Remitrom will never be able to keep up with you now.']},
    {id:'TU_2', n:'Remitrom', t:T_TU, v:'M_7', //story tab
        s:["Remitrom: \"Ha! You're still just transmuting Baryons? I've already transmuted Hydrogen. With a Brain Smartness Quotient of only 4w you can't expect to keep up with my BS Quotient of 4x.\"",
        "Remitrom has been your lifelong rival, always just one step ahead. Without him you would easily be the top Omni in your class."]},

    {id:'TM_0', n:'M_0', t:T_TM, v:1, s:['TM_0']},
    {id:'TM_1', n:'M_1', t:T_TM, v:2, s:['TM_1']},
    {id:'TM_2', n:'M_2', t:T_TM, v:3, s:['TM_2']},
    {id:'TM_3', n:'M_3', t:T_TM, v:4, s:['TM_3']},
    {id:'TM_4', n:'M_4', t:T_TM, v:5, s:['TM_4']},

    {id:'MTL_0', n:'Transmuter L_0', t:T_MTL, v:12, s:['MTL_0']},
    {id:'MTL_1', n:'Transmuter L_1', t:T_MTL, v:13, s:['MTL_1']},
    {id:'MTL_2', n:'Transmuter L_2', t:T_MTL, v:14, s:['MTL_2']},
    {id:'MTL_3', n:'Transmuter L_3', t:T_MTL, v:15, s:['MTL_3']},
    {id:'MTL_4', n:'Transmuter L_4', t:T_MTL, v:16, s:['MTL_4']},
    {id:'MTL_5', n:'Transmuter L_5', t:T_MTL, v:17, s:['MTL_5']},
    {id:'MTL_6', n:'Transmuter L_6', t:T_MTL, v:18, s:['MTL_6']},

    {id:'OSL_0', n:'O_0', t:T_OSL, v:1, s:['OSL_0']},
];

const storyResponses = [
    //id, chapID, morality, order, story text
    {id:'INIT_0', cid:'INIT', m:1, o:0, s:['RI0']},
    {id:'INIT_1', cid:'INIT', m:0, o:0, s:['RI1']},
    {id:'INIT_2', cid:'INIT', m:-1, o:0, s:['RI1']},

    {id:'TU_2', cid:'A_2', m:-1, o:0, s:['You: You can take those ']},


    {id:'OSL_0_0', cid:'OSL_0', m:1, o:0, s:['R00']},
    {id:'OSL_0_1', cid:'OSL_0', m:0, o:0, s:['R01']},
    {id:'OSL_0_2', cid:'OSL_0', m:-1, o:0, s:['R01']},

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
}

