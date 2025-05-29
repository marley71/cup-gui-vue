const fs = require('fs');
const esprima = require('esprima');

const filePath = process.argv[2];
const code = fs.readFileSync(filePath, 'utf-8');

try {
    const ast = esprima.parseScript(code, { sourceType: 'module', range: true, loc: true });
    const result = extractProperties(ast);
    console.log(JSON.stringify(result, null, 2));
} catch (e) {
    console.error(e.message);
}

function extractProperties(node) {
    if (node.type === 'Program') {
        for (const statement of node.body) {
            const result = extractProperties(statement);
            if (result) {
                return result;
            }
        }
    }

    if (node.type === 'VariableDeclaration') {
        for (const declaration of node.declarations) {
            if (declaration.init && declaration.init.type === 'ObjectExpression') {
                return extractProperties(declaration.init);
            }
        }
    }

    if (node.type === 'ExportDefaultDeclaration') {
        return extractProperties(node.declaration);
    }

    if (node.type === 'ObjectExpression') {
        const properties = {};
        node.properties.forEach(prop => {
            if (prop.type === 'Property') {
                const key = prop.key.name || prop.key.value;
                if (prop.value.type === 'FunctionExpression') {
                    properties[key] = code.substring(prop.value.range[0], prop.value.range[1]);
                } else if (prop.value.type === 'ArrayExpression') {
                    properties[key] = extractArray(prop.value);
                } else if (prop.value.type === 'ObjectExpression') {
                    properties[key] = extractProperties(prop.value);
                } else {
                    properties[key] = extractProperties(prop.value);
                }
            }
        });
        return properties;
    }

    if (node.type === 'Literal') {
        return node.value;
    }

    return null;
}

function extractArray(node) {
    const elements = [];
    node.elements.forEach(element => {
        if (element.type === 'Literal') {
            elements.push(element.value);
        } else if (element.type === 'ObjectExpression') {
            elements.push(extractProperties(element));
        } else if (element.type === 'ArrayExpression') {
            elements.push(extractArray(element));
        }
    });
    return elements;
}
