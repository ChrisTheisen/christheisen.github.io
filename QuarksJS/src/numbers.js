function countSignificantDigits(input) {
    const numberStr = input.toString();

    let significantDigits = 0;
    let foundNonZero = false;

    for (const char of numberStr) {
        //don't count negative, decimal or ;
        if (char === '.' || char === '-') { continue; }
        if (!foundNonZero && char !== '0') {
            foundNonZero = true;
            significantDigits++;
        } 
        else if (foundNonZero){
            significantDigits++;
        }
    }

    return significantDigits;
}

function toPrecisionG(input, precision) {
    // Handle invalid inputs
    if (precision < 3) { throw new RangeError("precision must be at least 3"); }

    // Count significant digits
    let significantDigits = countSignificantDigits(input);

    // Adjust exponent if necessary
    if (significantDigits < precision) {
        // Add trailing zeros
        input += '0'.repeat(precision - significantDigits);
    } else if (significantDigits > precision) {
        // Convert to scientific notation
        const exponent = significantDigits - precision;
        input = `${input[0]}.${input.slice(1, precision)}e${exponent}`;
    }

    return input;
}

//remove leading 0 before .
//remove trailing . after .
//remove -
function cleanNumberString(input){
    if(input.indexOf('.') === -1){input = `${input}.`;}
    return input.replace('-', '').replaceAll('0', ' ').trim().replaceAll(' ', '0');
}

function toSigFigsFraction(input, sigFigs, decimal){
    const regex = /^.0*/;
    const fracTrim = input.match(regex)[0];

    const int = input.replace(regex, '').slice(0,1);
    const frac = input.replace(regex, '').slice(1,sigFigs);
    const shift = (fracTrim.length+1)*-1;
    
    const output = {b:`${int}${decimal}${frac?frac:'0'}`, s:shift};
    return output;
}

function toSigFigsInt(input, sigFigs, grouper){
    const int = input.slice(0,sigFigs).replace(/(.)(?=(.{3})+$)/g, `$1${grouper}`);
    //const shift = input.length - int.length;
    const shift = input.length - sigFigs;

    const output = {b:`${int}`, s:shift};
    return output;
}

function toSigFigsMixed(input, sigFigs, grouper, decimal, index){
    const trimmed = input.slice(0, sigFigs);
    const int = trimmed.slice(0, index).replace(/(.)(?=(.{3})+$)/g, `$1${grouper}`);
    const frac = trimmed.slice(index);
    const shift = sigFigs < index ? index-sigFigs : 0;

    const output = {b:!frac ? int : `${int}${decimal}${frac}`, s:shift};
    return output;
}

//takes in a number string
//add placeholder character and trim to sig figs
function toSigFigs(input, sigFigs=15, grouper=null, decimal=null){
    if(sigFigs < 3 || sigFigs > 15){ throw new RangeError("sigFigs must be between 3 and 15"); } 
    //get locale placeholder group and decimal characters
    grouper = grouper??Intl.NumberFormat(navigator.language).formatToParts(1234.5).find(x => x.type==='group').value;
    decimal = decimal??Intl.NumberFormat(navigator.language).formatToParts(1234.5).find(x => x.type==='decimal').value;
    const isNeg = input.startsWith('-');
    
    //make sure it is a string and trim - and leading/trailing 0.
    let cleaned = cleanNumberString(input.toString())

    let index = cleaned.indexOf('.');//index of .
    cleaned = cleaned.replace('.','');//remove .
    if(index === cleaned.length){index = cleaned.length;}//. was last char after removing trailing 0.

    let output = null
    if(index === 0) {//(-1,1)
        output = toSigFigsFraction(cleaned, sigFigs, decimal);
    }
    else if(index === -1) {//intigers
        output = toSigFigsInt(cleaned, sigFigs, grouper);
    }
    else {//everything else
        output = toSigFigsMixed(cleaned, sigFigs, grouper, decimal, index);
    }
    output.b = `${isNeg?'-':''}${output.b}`;
    return output;
}

function toDozenal(input){
    return input.toString(12).replaceAll('a', 'X').replaceAll('b', 'E');
}
function toBase64(input, sigFigs=15){
    const digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/";
    let frac = input % 1;

    const parts = [];
    while (true) {
        //use a bitwise mask to mod64 and prepend char
        parts.push(digits[input & 0x3f]);
        input >>>= 6;
        if(input===0){break;}//more efficient than in the while for some reason
    }

    if(frac > 0){
        parts.push('.');
        for(let i=0;i< sigFigs && frac>0;i++){
            frac *= 64;
            parts.push(digits[Math.floor(frac)]);
            frac %= 1;
        }
    }
    return parts.reverse().join('');
}

function toBase(input, base, sigFigs){
    if(base === 12){return toDozenal(Number(input));}
    if(base === 64){return toBase64(Number(input), sigFigs);}
    if(base < 2 || base > 36) { throw new RangeError("base must be between 2 and 36"); }
    return input.toString(base).toUpperCase();
}

function formatNumber(input, base, sigFigs){
    if(isNaN(Number(input)) || !input || input > Number.MAX_SAFE_INTEGER){return 'N/A';}
    input = Number(input);
    if(Number(input) === 0){return '0';}

    const str = base === 10 ? input.toString() : toBase(input, base);
    const result = toSigFigs(str, sigFigs);

    if(result.s === 0){return result.b;}
    if(result.s < 0){return `${result.b} >>${result.s*-1}`;}
    return `${result.b} <<${result.s}`;
}

function formatNumberFromSettings(input){
    const base = game?.settings?.n?.b ?? 10;
    const sigFigs = game?.settings?.n?.s ?? 15;
    return formatNumber(input.toString(), base, sigFigs);
}
