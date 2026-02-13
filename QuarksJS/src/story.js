const T_TU = 'TU';//Tab unlocked
const T_TM = 'TM';//total mass volume
const T_MTL = 'MTL';//max transmuter level
const T_OSL = 'OSL';//object scanner level
const T_TMM = 'TMM';//total mass magnitude
const storyChapters = [
    //id, trigger, value, story text
    {id:'INIT', t:null, v:null, s:['You just aced your test on quantum vibrations and transmutation. The last thing you need to do to graduate from Cynosure Nexus is to create your own universe.',
            'Start by creating some basic items. Then use your Object Scanner to discover new ways to transmute them into items of increasing complexity.']},
    {id:'A_0', t:T_TU, v:'M_2', //manage tab
        s:["Having inputs coming from other transmutation outputs could start to get messy, even if it is only three dimentional objects. You'll need a place to track and manage the flow of matter."]},
    {id:'A_1', t:T_TU, v:'M_3', //enhance tab
        s:['You just made a brilliant discovery! There is a way to adjust the physics in your new universe to increase the outputs without increasing the inputs.', 'Remitrom will never be able to keep up with you now.']},
    {id:'A_2', t:T_TU, v:'M_7', //story tab
        s:["Remitrom: Ha! You're still just transmuting Baryons? I've already transmuted Hydrogen. With a Brain Smartness Quotient of only 4w you can't expect to keep up with my BS Quotient of 4x.",
        "Remitrom has been your lifelong rival, always just one step ahead. Without him you would easily be the top Omni in your class."]},

    {id:'L_0', t:T_MTL, v:12, s:['MTL_0']},


    {id:'O_0', t:T_OSL, v:1, s:['OSL_0']},
    {id:'T_0', t:T_TMM, v:1, s:['TMM_0']},
    {id:'M_0', t:T_TM, v:1, s:['TM_0']},
];

const storyResponses = [
    //id, chapID, morality, order, story text
    {id:'INIT_0', cid:'INIT', m:1, o:0, s:['RI0']},
    {id:'INIT_1', cid:'INIT', m:0, o:0, s:['RI1']},
    {id:'INIT_2', cid:'INIT', m:-1, o:0, s:['RI1']},

    {id:'A_2', cid:'A_2', m:-1, o:0, s:['You: You can take those ']},


    {id:'O_0_0', cid:'O_0', m:1, o:0, s:['R00']},
    {id:'O_0_1', cid:'O_0', m:0, o:0, s:['R01']},
    {id:'O_0_2', cid:'O_0', m:-1, o:0, s:['R01']},

    {id:'T_0_0', cid:'T_0', m:0, o:1, s:[]},
    {id:'T_0_1', cid:'T_0', m:0, o:0, s:[]},
    {id:'T_0_2', cid:'T_0', m:0, o:-1, s:[]},
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
    const TM = notDone.filter(x => x.t === T_TM);

    //MTL
    const MTL = notDone.filter(x => x.t === T_MTL);

    //OSL
    const OSL = notDone.filter(x => x.t === T_OSL);

    //TMB
    const TMM = notDone.filter(x => x.t === T_TMM);
}

function renderStory(){
    const parent = getUIElement('M_7__Content');
    for(let i=parent.children.length-1; i>=0;i--){
        if(parent.children[i].tagName.toLowerCase() === 'div'){
            parent.children[i].remove();
        }
    }
    //while(parent.lastChild){
        //parent.lastChild.remove();
    //}
    game.story.forEach(x => renderChapter(parent, x));
}

function renderChapter(parent, input){
    const chapter = storyChapters.find(x => x.id === input);

    const chapWrap = createUIElement({parent: parent, cssClasses:['chapter']})
    chapter.s.forEach(x => {
        createUIElement({type:'p', parent:chapWrap, textContent:x});
    });
}

