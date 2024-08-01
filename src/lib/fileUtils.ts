
import fs from 'fs';
import path from 'path';

export type FileElementType = {
    name: string;
    parsedName: string;
    path: string;
    folder: FileElementType[];
}

function removeFileExtension(filename: string): string {
    const lastDotIndex = filename.lastIndexOf('.');
    if (lastDotIndex === -1) return filename; // Pas d'extension trouvée
    return filename.substring(0, lastDotIndex);
}

function sortAndRemoveLeadingNumbers(objects: FileElementType[]): FileElementType[] {
    const regex = /^(-?\d+)_/;

    // Séparer les objets en deux groupes : ceux avec des nombres positifs et ceux avec des nombres négatifs
    const positiveObjects = objects.filter(obj => !obj.name.startsWith('-'));
    const negativeObjects = objects.filter(obj => obj.name.startsWith('-'));

    // Trier les objets avec des nombres positifs
    positiveObjects.sort((a, b) => {
        const aMatch = a.name.match(regex);
        const bMatch = b.name.match(regex);

        const aNum = aMatch ? parseInt(aMatch[1], 10) : Infinity;
        const bNum = bMatch ? parseInt(bMatch[1], 10) : Infinity;

        return aNum - bNum;
    });

    // Trier les objets avec des nombres négatifs en ordre décroissant
    negativeObjects.sort((a, b) => {
        const aMatch = a.name.match(regex);
        const bMatch = b.name.match(regex);

        const aNum = aMatch ? parseInt(aMatch[1], 10) : -Infinity;
        const bNum = bMatch ? parseInt(bMatch[1], 10) : -Infinity;

        return bNum - aNum;
    });

    // Supprimer les nombres en leading dans la propriété name
    const cleanPositiveObjects = positiveObjects.map(obj => ({
        ...obj,
        name: obj.name.replace(regex, '')
    }));

    const cleanNegativeObjects = negativeObjects.map(obj => ({
        ...obj,
        name: obj.name.replace(regex, '')
    }));

    // Fusionner les deux listes
    return [...cleanPositiveObjects, ...cleanNegativeObjects];
}

function parseFolder(currentPwd: string): FileElementType[] {

    let store: FileElementType[] = [];

    // Liste les fichiers dans le dossier
    const fileNames = fs.readdirSync(currentPwd);

    // store in the store
    fileNames.forEach((file, i) => {
        if (fs.lstatSync(path.join(currentPwd, file)).isFile()) {
            store.push({name: removeFileExtension(file), parsedName: parsedFileName(file), path: (currentPwd+"\\"+file), folder: []});
        } else {
            store.push({name: file, parsedName: parsedFileName(file), path: (currentPwd+"\\"+file), folder: parseFolder(currentPwd + '/' + file)})
        }
    })

    return sortAndRemoveLeadingNumbers(store);
}

export function findElementByParsedName(root: FileElementType[], searchString: string): string | null {
    for (let element of root) {
        if (element.parsedName === searchString) {
            return element.path;
        }
        if (element.folder.length > 0) {
            const foundName = findElementByParsedName(element.folder, searchString);
            if (foundName !== null) {
                return foundName;
            }
        }
    }
    return null;
}

export function parsedFileName(fileName: string): string {
    // Suppression de la partie initiale avec chiffres et tirets
    let modifiedFileName = fileName.replace(/^[\d-]+_/, '');

    // Suppression de l'extension de fichier
    modifiedFileName = modifiedFileName.replace(/\.\w+$/, '');

    // Conversion en minuscules
    modifiedFileName = modifiedFileName.toLowerCase();

    // Remplacement des espaces par des tirets
    modifiedFileName = modifiedFileName.replace(/\s+/g, '-');

    return modifiedFileName;
}
export const getFilenames = (directory: string): FileElementType[] => {
  const directoryPath = path.join(process.cwd(), directory);

  // Vérifie si le chemin spécifié est un dossier
  if (!fs.existsSync(directoryPath) || !fs.lstatSync(directoryPath).isDirectory()) {
    throw new Error(`${directoryPath} n'est pas un dossier valide.`);
  }

  let Files: FileElementType[] = parseFolder(directoryPath);

  return Files;
};
