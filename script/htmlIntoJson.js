const fs = require('fs');
const path = require('path');

function parsedFileName(fileName) {
    // Suppression de la partie initiale avec chiffres et tirets
    let modifiedFileName = fileName.replace(/^[\d-]+_/, '');

    // Suppression de l'extension de fichier
    modifiedFileName = removeFileExtension(modifiedFileName);

    // Conversion en minuscules
    modifiedFileName = modifiedFileName.toLowerCase();

    // Remplacement des espaces par des tirets
    modifiedFileName = modifiedFileName.replace(/\s+/g, '-');

    return modifiedFileName;
}

function removeFileExtension(filename) {
    const lastDotIndex = filename.lastIndexOf('.');
    if (lastDotIndex === -1) return filename; // Pas d'extension trouvée
    return filename.substring(0, lastDotIndex);
}

function fileData(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
}

function parsedContent(fileJson) {

    let entries = [];

    if (fileJson.tag) {
        entries.push({
            entry: fileJson.tag,
            level: 1,
        });
    }

    if (fileJson.allowedAttributes.length > 0) {
        entries.push({
            entry: "Props",
            level: 1,
        });
    }

    if (fileJson.usageExamples.length > 0) {
        entries.push({
            entry: "Usage Examples",
            level: 1,
        });
        fileJson.usageExamples.forEach((ex, index) => {
            entries.push({
                entry: ex.title,
                level: 2,
            });
        })
    }

    return entries;
}

function parseDir(currentDir) {
    let json = [];
    // Liste les fichiers dans le dossier
    const fileNames = fs.readdirSync(currentDir);

    // store in the store
    fileNames.forEach((file, i) => {
        const fileDta = fileData(path.join(currentDir, file));
        json.push({
            name: removeFileExtension(file), 
            parsedName: parsedFileName(file),
            entries: parsedContent(fileDta),
            content: fileDta,
        });
    });

    return json; // Retourner le JSON
}

function htmlIntoJson() {
    const directoryPath = path.join(__dirname, '..', 'src', 'docs', 'html');
    const outputFilePath = path.join(__dirname, '..', 'src', 'docs', 'html.json');
    console.log('Html Jsons reunited into 1 json !');
    console.log('Check at : \x1b[32m' + outputFilePath + "\x1b[0m")
    if (!fs.existsSync(directoryPath) || !fs.lstatSync(directoryPath).isDirectory()) {
        throw new Error(`${directoryPath} n'est pas un dossier valide.`);
    }
    const json = parseDir(directoryPath);

    fs.writeFileSync(outputFilePath, JSON.stringify(json, null, 2), 'utf-8');
}

htmlIntoJson();
