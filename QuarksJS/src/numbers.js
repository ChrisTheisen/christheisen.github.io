function countSignificantDigits(input) {
    const numberStr = input.toString();

    let significantDigits = 0;
    let foundNonZero = false;

    for (const char of numberStr) {
        if (char === '.' || char === ';') { continue; }
        if (!foundNonZero && char !== '0') {
            foundNonZero = true;
            significantDigits++;
        } 
        else {
            significantDigits++;
        }
    }

    return significantDigits;
}

function toPrecisionG(input, precision) {
    // Handle invalid inputs
    if (precision < 1) { throw new RangeError("precision must be at least 1"); }

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

//takes in a number string
//add placeholder commas and sig figs1
function toPrecision(input, precision){



}

function toDozenal(input){
    return input.toString(12).replaceAll('a', 'X').replaceAll('b', 'E').replace('.',';');
}

function toBase(input, base){
    if(base < 2 || base > 36) { throw new RangeError("base must be between 2 and 36"); }
    if(base === 12){return toDozenal(input);}
    return input.toString(base).toUpperCase();
}

function formatNumber(input, base, precision){
    const str = base !== 10 ? toBase(input, base) : input.toString();
    return toPrecision(str, precision);
}