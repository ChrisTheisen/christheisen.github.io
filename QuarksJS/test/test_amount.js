// Import the Amount class and MassUnits
//const { Amount, MassUnits } = require('../src/amount.js');

// Helper function to create test cases
function testCase(name, testFn) {
    console.log(`\nTesting: ${name}`);
    try {
        testFn();
        console.log('✅ Passed');
    } catch (error) {
        console.error('❌ Failed:', error.message);
        if (error.expected !== undefined && error.received !== undefined) {
            console.error(`Expected: ${error.expected}`);
            console.error(`Received: ${error.received}`);
        }
    }
}

// Test basic operations
testCase('Basic Amount Creation', () => {
    const amount = new Amount({ Da: 10 });
    if (amount.Da !== 10) {
        const error = new Error('Initialization failed');
        error.expected = 10;
        error.received = amount.Da;
        throw error;
    }
});

testCase('Addition', () => {
    const a = new Amount({ Da: 5 });
    const b = new Amount({ Da: 3 });
    a.add(b);
    if (a.Da !== 8) {
        const error = new Error('Addition failed');
        error.expected = 8;
        error.received = a.Da;
        throw error;
    }
});

testCase('Subtraction', () => {
    const a = new Amount({ Da: 10 });
    const b = new Amount({ Da: 4 });
    a.subtract(b);
    if (a.Da !== 6) {
        const error = new Error('Subtraction failed');
        error.expected = 6;
        error.received = a.Da;
        throw error;
    }
});

testCase('Unit Conversion Up', () => {
    const amount = new Amount({ Da: MassUnits.Da.c + 1 });
    amount.convert();
    if (amount.Da !== 1 || amount.pg !== 1) {
        const error = new Error('Unit conversion up failed');
        error.expected = 'Da: 1, pg: 1';
        error.received = `Da: ${amount.Da}, pg: ${amount.pg}`;
        throw error;
    }
});

testCase('Unit Conversion Down', () => {
    const amount = new Amount({ Da: -1 });
    amount.convert();
    if (amount.Da !== MassUnits.Da.c - 1 || amount.pg !== -1) {
        const error = new Error('Unit conversion down failed');
        error.expected = `Da: ${MassUnits.Da.c - 1}, pg: -1`;
        error.received = `Da: ${amount.Da}, pg: ${amount.pg}`;
        throw error;
    }
});

testCase('Fractional Conversion', () => {
    const amount = new Amount({ Da: 1.5 });
    amount.convert();
    const expectedPg = Math.floor(0.5 * MassUnits.Da.c);
    if (amount.Da !== 1 || Math.floor(amount.pg) !== expectedPg) {
        const error = new Error('Fractional conversion failed');
        error.expected = `Da: 1, pg: ${expectedPg}`;
        error.received = `Da: ${amount.Da}, pg: ${Math.floor(amount.pg)}`;
        throw error;
    }
});

testCase('Scale Operation', () => {
    const amount = new Amount({ Da: 10 });
    amount.scale(2);
    if (amount.Da !== 20) {
        const error = new Error('Scale operation failed');
        error.expected = 20;
        error.received = amount.Da;
        throw error;
    }
});

testCase('Is Zero Check', () => {
    const amount = new Amount();
    if (!amount.isZero()) {
        const error = new Error('Is zero check failed');
        error.expected = true;
        error.received = false;
        throw error;
    }
});

testCase('Compare Operation', () => {
    const a = new Amount({ Da: 10 });
    const b = new Amount({ Da: 5 });
    if (a.compare(b) <= 0) {
        const error = new Error('Compare operation failed');
        error.expected = '> 0';
        error.received = a.compare(b);
        throw error;
    }
});

testCase('BigInt Conversion', () => {
    const amount = new Amount({ Da: 10, pg: 5 });
    const bigInt = amount.toBigInt();
    const newAmount = new Amount();
    newAmount.fromBigInt(bigInt);
    if (newAmount.Da !== 10 || newAmount.pg !== 5) {
        const error = new Error('BigInt conversion failed');
        error.expected = 'Da: 10, pg: 5';
        error.received = `Da: ${newAmount.Da}, pg: ${newAmount.pg}`;
        throw error;
    }
});

// Run all tests
console.log('\nRunning Amount class tests...');
console.log('==========================='); 