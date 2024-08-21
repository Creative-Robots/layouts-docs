const fs = require('fs');
const path = require('path');

function fileData(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
}

function parsedContent(fileJson) {

    let entries = [];

    if (fileJson.name) {
        entries.push({
            entry: fileJson.name,
            level: 1,
        });
    }

    if (fileJson.refImplementation) {
        entries.push({
            entry: "Ref Implementation",
            level: 1,
        });
    }

    if (fileJson.props && fileJson.props.length > 0) {
        entries.push({
            entry: "Props",
            level: 1,
        });
    }

    if (fileJson.examples && fileJson.examples.length > 0) {
        entries.push({
            entry: "Examples",
            level: 1,
        });
        fileJson.examples.forEach(function(ex) {
            entries.push({
                entry: ex.title,
                level: 2,
            });
        })
    }

    if (fileJson.subComponents && fileJson.subComponents.length > 0) {
        entries.push({
            entry: "API Reference",
            level: 1,
        });
        fileJson.subComponents.forEach(function(ex) {
            entries.push({
                entry: `/${ex.tag}`,
                level: 2,
            });
        })
    }

    return entries;
}

function parseDir(filePath) {
    let json = [];
    // Liste les fichiers dans le dossier
    const fileDta = fileData(filePath);

    // store in the store
    fileDta.forEach(function(component) {
        json.push({
            name: component.name, 
            parsedName: component.tag,
            entries: parsedContent(component),
            content: component,
        });
    });

    return json; // Retourner le JSON
}

function layoutsWithEntries() {
    const filePath = path.join(__dirname, '..', 'src', 'docs', 'RawLayouts', 'Components.json');
    const outputFilePath = path.join(__dirname, '..', 'src', 'docs', 'layouts.json');
    if (!fs.existsSync(filePath)) {
        throw new Error(`${filePath} n'est pas un fichier valide.`);
    }
    const json = parseDir(filePath);
    
    fs.writeFileSync(outputFilePath, JSON.stringify(json, null, 2), 'utf-8');
    console.log('Layouts components now have entries json !');
    console.log('Check at : \x1b[32m' + outputFilePath + "\x1b[0m")
}

layoutsWithEntries();
