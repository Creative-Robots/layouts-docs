const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function parsedFileName(fileName) {
    // Suppression de la partie initiale avec chiffres et tirets
    let modifiedFileName = fileName.replace(/^[\d-]+_/, '').replace('&', 'and');

    // Suppression de l'extension de fichier
    modifiedFileName = modifiedFileName.replace(/\.\w+$/, '');

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

function compileMdx(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { content, data } = matter(fileContent);
    return {
        MdxContent: content,
        MdxFrontMatter: data,
    };
}

function createEntry(str, level, tocut) {

    let entry = str.substring(tocut, str.length).trim().replace(/\'/g, "");

    return {
        entry: entry,
        level: level,
    }
}

function parsedContent(filePath) {
    let entries = [];

    //read content
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Diviser le contenu en lignes
    const lines = fileContent.split('\n');

    // Analyser chaque ligne
    lines.forEach((line, index) => {
        if (line.startsWith("###", 0)) {
            entries.push(createEntry(line, 1, 4));
        } else if (line.startsWith("##", 0)) {
            entries.push(createEntry(line, 1, 3));
        } else if (line.startsWith("title: ", 0)) {
            entries.push(createEntry(line, 1, 7));
        }
    });

    return entries;
}

function parseDir(currentDir) {
    let json = {};
    // Liste les fichiers dans le dossier
    const fileNames = fs.readdirSync(currentDir);

    // store in the store
    fileNames.forEach((file, i) => {
        if (fs.lstatSync(path.join(currentDir, file)).isFile()) {
            json[file] = {
                name: removeFileExtension(file), 
                parsedName: parsedFileName(file), 
                entries: parsedContent(path.join(currentDir, file)),
                content: compileMdx(path.join(currentDir, file)),
            };
        } else {
            json[file] = {
                name: file, 
                parsedName: parsedFileName(file), 
                folder: parseDir(path.join(currentDir, file)),
            };
        }
    });

    return json; // Retourner le JSON
}

function mdxToJson() {
    const directoryPath = path.join(__dirname, '..', 'src', 'docs', 'essentials');
    const outputFilePath = path.join(__dirname, '..', 'src', 'docs', 'essential.json');
    console.log('Path transformed into json !');
    console.log('Check at : \x1b[32m' + outputFilePath + "\x1b[0m")
    if (!fs.existsSync(directoryPath) || !fs.lstatSync(directoryPath).isDirectory()) {
        throw new Error(`${directoryPath} n'est pas un dossier valide.`);
    }
    const json = parseDir(directoryPath);

    fs.writeFileSync(outputFilePath, JSON.stringify(json, null, 2), 'utf-8');
}

mdxToJson();
