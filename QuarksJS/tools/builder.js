// Known items list (populated from existing items)
const knownItems = {};
const knownDataGroups = {};
const existingIds = {
    items: new Set(),
    recipes: new Set(),
    data: new Set()
};

// Initialize with items dynamically loaded from the actual codebase
function initializeKnownItems() {
    // knownItems will be populated from directly included JavaScript objects
    // No parsing needed - direct object access
}

// Load existing items from the included items.js object
function loadExistingItems() {
    try {
        existingIds.items.clear();
        // Clear known items to repopulate from source
        Object.keys(knownItems).forEach(key => delete knownItems[key]);

        // Check if items object is available (from included items.js)
        if (typeof items !== 'undefined') {
            // Direct access to items object - much more reliable
            Object.values(items).forEach(item => {
                if (item.id && item.n) {
                    existingIds.items.add(item.id);
                    knownItems[item.id] = item.n;
                }
            });

            console.log(`Successfully loaded ${existingIds.items.size} existing items with names from items object`);
        } else {
            console.warn('items object not found - items.js may not be loaded');
            loadFallbackItems();
        }

    } catch (error) {
        console.error('Failed to load items from included items.js:', error);
    }
}

// Load existing recipes from the included recipes.js array
function loadExistingRecipes() {
    try {
        existingIds.recipes.clear();

        // Check if recipes array is available (from included recipes.js)
        if (typeof recipes !== 'undefined' && Array.isArray(recipes)) {
            // Direct access to recipes array - much more reliable
            recipes.forEach(recipe => {
                if (recipe.id) {
                    existingIds.recipes.add(recipe.id);
                }
            });

            console.log(`Successfully loaded ${existingIds.recipes.size} existing recipe IDs from recipes array`);
        } else {
            console.warn('recipes array not found - recipes.js may not be loaded');
            loadFallbackRecipes();
        }

    } catch (error) {
        console.error('Failed to load recipes from included recipes.js:', error);
        loadFallbackRecipes();
    }
}

function loadFallbackRecipes() {
    // Add basic known recipe IDs to prevent conflicts
    const basicRecipeIds = ['r_0','r_1','r_2','r_3','r_4','r_5','r_a','r_b','r_c'];
    basicRecipeIds.forEach(id => existingIds.recipes.add(id));
    console.log(`Loaded ${basicRecipeIds.length} fallback recipe IDs`);
}

// Load existing data groups from the included data.js variables
function loadExistingDataGroups() {
    try {
        existingIds.data.clear();

        // data.js exports individual constants, so we need to check for common data group variables
        // Look for variables in global scope that match data group patterns
        let dataGroupCount = 0;

        // Check common data group variable names that might exist
        const potentialDataGroups = ['subatomic', 'atoms', 'molecules', 'materials', 'tools', 'structures'];
        potentialDataGroups.forEach(groupName => {
            if (typeof window[groupName] !== 'undefined' && window[groupName].id) {
                existingIds.data.add(window[groupName].id);
                dataGroupCount++;
            }
        });

        // If we can't find specific data groups, scan global variables for objects with 'id' that start with 'm_'
        for (let prop in window) {
            try {
                const obj = window[prop];
                if (obj && typeof obj === 'object' && obj.id && typeof obj.id === 'string' && obj.id.startsWith('m_')) {
                    existingIds.data.add(obj.id);
                    dataGroupCount++;
                }
            } catch (e) {
                // Skip properties we can't access
            }
        }

        console.log(`Successfully loaded ${dataGroupCount} existing data group IDs from data.js variables`);
        if (dataGroupCount === 0) {
            console.warn('No data group variables found - using fallback');
            loadFallbackDataGroups();
        }

    } catch (error) {
        console.error('Failed to load data groups from included data.js:', error);
        loadFallbackDataGroups();
    }
}

function loadFallbackDataGroups() {
    // Add basic known data group IDs to prevent conflicts
    const basicDataIds = ['m_0','m_1','m_2','m_3','m_30','m_31','m_33'];
    basicDataIds.forEach(id => existingIds.data.add(id));
    console.log(`Loaded ${basicDataIds.length} fallback data group IDs`);
}

// Generate next available ID following QuarksJS pattern
function getNextAvailableId(type) {
    const existingSet = existingIds[type];
    const prefix = type === 'recipes' ? 'r_' : (type === 'data' ? 'm_' : '');

    // QuarksJS ID pattern: 0-9, a-z, A-Z, then 10-19, 1a-1z, 1A-1Z, 20-29, 2a-2z, 2A-2Z, etc.
    const sequence = [
        // Single character sequences
        ...Array.from({length: 10}, (_, i) => i.toString()),
        ...Array.from({length: 26}, (_, i) => String.fromCharCode(97 + i)),
        ...Array.from({length: 26}, (_, i) => String.fromCharCode(65 + i))
    ];

    // Try single characters first
    for (const id of sequence) {
        const fullId = prefix + id;
        if (!existingSet.has(fullId)) {
            return fullId;
        }
    }

    // Try compound IDs: 10-19, 1a-1z, 1A-1Z, 20-29, 2a-2z, 2A-2Z, etc.
    for (let firstChar = 1; firstChar <= 9; firstChar++) {
        // Numbers: 10, 11, 12, ..., 19, 20, 21, ..., 90, 91, ..., 99
        for (let secondDigit = 0; secondDigit <= 9; secondDigit++) {
            const id = firstChar.toString() + secondDigit.toString();
            const fullId = prefix + id;
            if (!existingSet.has(fullId)) {
                return fullId;
            }
        }

        // Lowercase letters: 1a, 1b, ..., 1z, 2a, 2b, ..., 9z
        for (let secondChar = 0; secondChar < 26; secondChar++) {
            const id = firstChar.toString() + String.fromCharCode(97 + secondChar);
            const fullId = prefix + id;
            if (!existingSet.has(fullId)) {
                return fullId;
            }
        }

        // Uppercase letters: 1A, 1B, ..., 1Z, 2A, 2B, ..., 9Z
        for (let secondChar = 0; secondChar < 26; secondChar++) {
            const id = firstChar.toString() + String.fromCharCode(65 + secondChar);
            const fullId = prefix + id;
            if (!existingSet.has(fullId)) {
                return fullId;
            }
        }
    }

    // Fallback - should rarely be needed
    return prefix + '7X';
}

// Auto-fill ID field with next available ID
function autoFillId(type) {
    const fieldMap = {
        'items': 'itemId',
        'recipes': 'recipeId',
        'data': 'dataId'
    };

    const fieldId = fieldMap[type];
    if (fieldId) {
        const nextId = getNextAvailableId(type);
        document.getElementById(fieldId).value = nextId;
    }
}

function populateItemSelectors() {
    const selectors = document.querySelectorAll('.item-selector');
    selectors.forEach(select => {
        // Clear existing options except first
        while (select.children.length > 1) {
            select.removeChild(select.lastChild);
        }

        // Add known items
        Object.keys(knownItems).forEach(id => {
            const option = document.createElement('option');
            option.value = id;
            option.textContent = `${id} - ${knownItems[id]}`;
            select.appendChild(option);
        });
    });
}

function showTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    // Remove active class from all tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Show selected tab content
    document.getElementById(tabName).classList.add('active');

    // Add active class to clicked tab
    event.target.classList.add('active');

    // Load existing IDs dynamically based on active tab
    if (tabName === 'items') {
        loadExistingItems();
        document.getElementById('itemId').placeholder = `Next: ${getNextAvailableId('items')}`;
    } else if (tabName === 'recipes') {
        loadExistingItems(); // Need items for recipe dropdowns
        loadExistingRecipes();
        document.getElementById('recipeId').placeholder = `Next: ${getNextAvailableId('recipes')}`;
        populateItemSelectors(); // Update recipe dropdowns with fresh item data
    } else if (tabName === 'data') {
        loadExistingItems(); // Need items for data group children
        loadExistingDataGroups();
        document.getElementById('dataId').placeholder = `Next: ${getNextAvailableId('data')}`;
    }
}

function generateItem() {
    let id = document.getElementById('itemId').value.trim();
    const symbol = document.getElementById('itemSymbol').value.trim();
    const name = document.getElementById('itemName').value.trim();
    const unlocked = document.getElementById('itemUnlocked').value === 'true';
    const massValue = parseFloat(document.getElementById('massValue').value);
    const massUnit = document.getElementById('massUnit').value;

    // Auto-populate ID if empty
    if (!id) {
        id = getNextAvailableId('items');
        document.getElementById('itemId').value = id;
    }

    // Validation
    if (!symbol || !name || isNaN(massValue) || massValue < 0) {
        alert('Please fill in all required fields with valid values.');
        return;
    }

    // Check for duplicate ID
    if (existingIds.items.has(id) || knownItems[id]) {
        alert(`Item ID '${id}' already exists! Try: ${getNextAvailableId('items')}`);
        return;
    }

    // Generate the item code
    const massObj = `{${massUnit}: ${massValue}}`;
    const itemCode = `\t${id}: { id:'${id}', s:'${symbol}', n: '${name}', u: ${unlocked}, m: new Amount(${massObj})},`;

    // Display output
    const output = document.getElementById('itemOutput');
    output.style.display = 'block';
    output.textContent = `// Add this to items.js in the items object:\n${itemCode}`;

    // Add to known items and mark ID as used
    knownItems[id] = name;
    existingIds.items.add(id);
    populateItemSelectors();

    // Update placeholder for next item
    document.getElementById('itemId').placeholder = `Next: ${getNextAvailableId('items')}`;
}

function clearItemForm() {
    document.getElementById('itemForm').reset();
    document.getElementById('itemOutput').style.display = 'none';
}

function addInputItem() {
    const container = document.getElementById('inputItems');
    const newItem = createRecipeItemElement();
    container.appendChild(newItem);
}

function addOutputItem() {
    const container = document.getElementById('outputItems');
    const newItem = createRecipeItemElement();
    container.appendChild(newItem);
}

function createRecipeItemElement() {
    const div = document.createElement('div');
    div.className = 'recipe-item';
    div.innerHTML = `
    <select class="item-selector">
    <option value="">Select item...</option>
    </select>
    <input type="number" placeholder="Amount" min="1" value="1" class="item-amount">
    <button type="button" class="btn btn-danger" onclick="removeRecipeItem(this)">Remove</button>
    `;

    // Populate the new selector
    const select = div.querySelector('.item-selector');
    Object.keys(knownItems).forEach(id => {
        const option = document.createElement('option');
        option.value = id;
        option.textContent = `${id} - ${knownItems[id]}`;
        select.appendChild(option);
    });

    return div;
}

function addCalculatorItem() {
    const container = document.getElementById('calculatorItems');
    const newItem = createCalculatorItemElement();
    container.appendChild(newItem);
}

function createCalculatorItemElement() {
    const div = document.createElement('div');
    div.className = 'calculator-item';
    div.innerHTML = `
    <select class="calculator-selector">
    <option value="">Select item...</option>
    </select>
    <input type="number" placeholder="Amount" min="1" value="1" class="calculator-amount">
    <button type="button" class="btn btn-danger" onclick="removeRecipeItem(this)">Remove</button>
    `;

    // Populate the new selector
    const select = div.querySelector('.calculator-selector');
    Object.keys(knownItems).forEach(id => {
        const option = document.createElement('option');
        option.value = id;
        option.textContent = `${id} - ${knownItems[id]}`;
        select.appendChild(option);
    });

    return div;
}

function calculateMass() {
    let sum = new Amount();
    const calcItems = Array.from(document.getElementById('calculatorItems').childNodes);
    for(let item of calcItems){
        const id = item.querySelector('.calculator-selector').value;
        const a = Object.values(items).find(x => x.id === id).m;
        const amount = Number(item.querySelector('.calculator-amount').value);
        console.log(a, amount);

        let temp = null;
        const mass = new Amount().add(a, false);
        temp = mass.scale(amount, false);
        sum.add(temp, false);
    }
    console.log(sum);
    delete sum.content;
    const asdf = JSON.stringify(sum, null, 2);
    console.log(asdf);
    document.getElementById('calculatorOutput').textContent = asdf;
}

function removeRecipeItem(button) {
    const container = button.parentElement.parentElement;
    if (container.children.length > 1) {
        button.parentElement.remove();
    } else {
        alert('At least one item is required.');
    }
}

function generateRecipe() {
    let recipeId = document.getElementById('recipeId').value.trim();

    // Auto-populate ID if empty
    if (!recipeId) {
        recipeId = getNextAvailableId('recipes');
        document.getElementById('recipeId').value = recipeId;
    }

    // Check for duplicate ID
    if (existingIds.recipes.has(recipeId)) {
        alert(`Recipe ID '${recipeId}' already exists! Try: ${getNextAvailableId('recipes')}`);
        return;
    }

    // Collect input items
    const inputItems = [];
    const inputContainer = document.getElementById('inputItems');
    const inputElements = inputContainer.querySelectorAll('.recipe-item');

    inputElements.forEach(element => {
        const itemId = element.querySelector('.item-selector').value;
        const amount = parseInt(element.querySelector('.item-amount').value);
        if (itemId && amount > 0) {
            inputItems.push({id: itemId, amount: amount});
        }
    });

    // Collect output items
    const outputItems = [];
    const outputContainer = document.getElementById('outputItems');
    const outputElements = outputContainer.querySelectorAll('.recipe-item');

    outputElements.forEach(element => {
        const itemId = element.querySelector('.item-selector').value;
        const amount = parseInt(element.querySelector('.item-amount').value);
        if (itemId && amount > 0) {
            outputItems.push({id: itemId, amount: amount});
        }
    });

    if (outputItems.length === 0) {
        alert('At least one output item is required.');
        return;
    }

    // Generate recipe code
    let inputCode = inputItems.map(item => `{f:items.${item.id}, a:${item.amount}}`).join(', ');
    let outputCode = outputItems.map(item => `{f:items.${item.id}, a:${item.amount}}`).join(', ');

    const recipeCode = `\t{id:'${recipeId}', i:[${inputCode}], o:[${outputCode}]},`;

    // Display output
    const output = document.getElementById('recipeOutput');
    output.style.display = 'block';
    output.textContent = `// Add this to recipes.js in the recipes array:\n${recipeCode}`;

    // Mark ID as used and update placeholder
    existingIds.recipes.add(recipeId);
    document.getElementById('recipeId').placeholder = `Next: ${getNextAvailableId('recipes')}`;
}

function clearRecipeForm() {
    document.getElementById('recipeForm').reset();
    document.getElementById('recipeOutput').style.display = 'none';

    // Reset to single input/output items
    const inputContainer = document.getElementById('inputItems');
    const outputContainer = document.getElementById('outputItems');

    inputContainer.innerHTML = `
    <div class="recipe-item">
    <select class="item-selector"><option value="">Select item...</option></select>
    <input type="number" placeholder="Amount" min="1" value="1" class="item-amount">
    <button type="button" class="btn btn-danger" onclick="removeRecipeItem(this)">Remove</button>
    </div>
    `;

    outputContainer.innerHTML = `
    <div class="recipe-item">
    <select class="item-selector"><option value="">Select item...</option></select>
    <input type="number" placeholder="Amount" min="1" value="1" class="item-amount">
    <button type="button" class="btn btn-danger" onclick="removeRecipeItem(this)">Remove</button>
    </div>
    `;

    populateItemSelectors();
}

function addDataChild() {
    const container = document.getElementById('dataChildren');
    const div = document.createElement('div');
    div.className = 'recipe-item';
    div.innerHTML = `
    <select class="data-child-selector">
    <option value="">Select item or group...</option>
    </select>
    <button type="button" class="btn btn-danger" onclick="removeRecipeItem(this)">Remove</button>
    `;

    // Add items and groups to selector
    const select = div.querySelector('.data-child-selector');

    // Add items
    const itemGroup = document.createElement('optgroup');
    itemGroup.label = 'Items';
    Object.keys(knownItems).forEach(id => {
        const option = document.createElement('option');
        option.value = `items.${id}`;
        option.textContent = `${id} - ${knownItems[id]}`;
        itemGroup.appendChild(option);
    });
    select.appendChild(itemGroup);

    container.appendChild(div);
}

function generateDataGroup() {
    let id = document.getElementById('dataId').value.trim();
    const name = document.getElementById('dataName').value.trim();
    const unlocked = document.getElementById('dataUnlocked').value === 'true';
    const info = document.getElementById('dataInfo').value.trim();

    // Auto-populate ID if empty
    if (!id) {
        id = getNextAvailableId('data');
        document.getElementById('dataId').value = id;
    }

    if (!name) {
        alert('Group Name is required.');
        return;
    }

    // Check for duplicate ID
    if (existingIds.data.has(id)) {
        alert(`Data Group ID '${id}' already exists! Try: ${getNextAvailableId('data')}`);
        return;
    }

    // Collect children
    const children = [];
    const childElements = document.querySelectorAll('#dataChildren .recipe-item');

    childElements.forEach(element => {
        const childValue = element.querySelector('.data-child-selector').value;
        if (childValue) {
            children.push(childValue);
        }
    });

    // Generate info array
    let infoArray = "[]";
    if (info) {
        const infoItems = info.split('|').map(item => item.trim()).filter(item => item.length > 0);
        if (infoItems.length > 0) {
            infoArray = `['${infoItems.join("', '")}']`;
        }
    }

    // Generate children array
    let childrenCode = "";
    if (children.length > 0) {
        childrenCode = children.join(',');
    }

    const dataCode = `const ${id.replace('m_', '')} = {\n\tid:'${id}', n:'${name}', u:${unlocked}, c:[${childrenCode}],\n\tinfo: ${infoArray}\n};`;

    // Display output
    const output = document.getElementById('dataOutput');
    output.style.display = 'block';
    output.textContent = `// Add this to data.js:\n${dataCode}`;

    // Mark ID as used and update placeholder
    existingIds.data.add(id);
    document.getElementById('dataId').placeholder = `Next: ${getNextAvailableId('data')}`;
}

function clearDataForm() {
    document.getElementById('dataForm').reset();
    document.getElementById('dataOutput').style.display = 'none';

    // Reset children
    document.getElementById('dataChildren').innerHTML = `
    <div class="recipe-item">
    <select class="data-child-selector">
    <option value="">Select item or group...</option>
    </select>
    <button type="button" class="btn btn-danger" onclick="removeRecipeItem(this)">Remove</button>
    </div>
    `;
}

// Initialize the tool
document.addEventListener('DOMContentLoaded', function() {
    initializeKnownItems();
    // Load items for the default tab
    loadExistingItems();
    document.getElementById('itemId').placeholder = `Next: ${getNextAvailableId('items')}`;
    document.getElementById('recipeId').placeholder = `Next: ${getNextAvailableId('recipes')}`;
    document.getElementById('dataId').placeholder = `Next: ${getNextAvailableId('data')}`;
});
