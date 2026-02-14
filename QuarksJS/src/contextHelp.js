function showContextHelp() {
    const parent = getUIElement('contextHelpContents');
    while(parent.firstChild){
        parent.firstChild.remove();
    }

    const a = getHelpContents();
    b = {t: `${a.t} Tab Help`, c:a.c};

    renderHelpTopic(parent, b, true);
    getUIElement('contextHelpArea').classList.remove('hide');
}

function hideContextHelp(){
    getUIElement('contextHelpArea').classList.add('hide');
}

function getHelpContents(){

    console.log(game.menu.current);

    switch(game.menu.current){
        case 'M_0': {//Create
            return help.find(x => x.t === 'Create');
        }
        case 'M_1': {//Discover
            return help.find(x => x.t === 'Discover');
        }
        case 'M_2': {//Manage
            return help.find(x => x.t === 'Manage');
        }
        case 'M_3': {//Enhance
            return help.find(x => x.t === 'Enhance');
        }
        case 'M_8': {//Settings
            return help.find(x => x.t === 'Settings');
        }
        case 'M_9': {//Help
            const helpHelp = {t:'Help', c:[]};
            helpHelp.c.push('This is the Help tab.');
            helpHelp.c.push('');
            helpHelp.c.push('By getting help with help you have unlocked: Curiosity!');
            helpHelp.c.push('Curiosity doesn\'t directly effect the game but can be a helpful trait if you aren\'t a cat.');
            helpHelp.c.push('');
            helpHelp.c.push('Click any of the topics to the left for more information.');
            return helpHelp;
        }
        default:{
            const defaultHelp = {t:'NULL', c:[]};
            defaultHelp.c.push('You have discovered the Context Help!');
            defaultHelp.c.push('');
            defaultHelp.c.push('This will show you information relevent to your current tab.');
            defaultHelp.c.push('All of the help items are available in the Help tab.');
            return defaultHelp;
        }
    }
}

