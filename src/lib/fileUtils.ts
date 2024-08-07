
import fs from 'fs';
import path, { join } from 'path';

import essentials from '../docs/essential.json'


export type FileElementType = {
    name: string;
    parsedName: string;
    entries?: {
        entry: string;
        level: number;
    }[];
    content?: {
        MdxContent: string;
        MdxFrontMatter: any;
    };
    folder?: FileElementType[];
}

const jsonFiles: FileElementType[] = parseJson(essentials)

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

function parseJson(json: any): FileElementType[] {

    let store: FileElementType[] = [];

    // store in the store
    Object.keys(json).forEach(key => {
        if (json[key].content) {
            store.push({name: json[key].name, parsedName: json[key].parsedName, content: json[key].content, entries: json[key].entries});
        } else {
            store.push({name: json[key].name, parsedName: json[key].parsedName, folder: parseJson(json[key].folder)});
        }
    })

    return sortAndRemoveLeadingNumbers(store);
}

export function findElementByParsedName(root: FileElementType[], searchString: string) : {
    entries: {
        entry: string;
        level: number;
    }[] | undefined;
    content: {
        MdxContent: string;
        MdxFrontMatter: any;
    };
} | null {
    for (let element of root) {
        if (element.parsedName === searchString && element.content) {
            return {
                entries: element.entries,
                content: element.content,
            };
        }
        if (element.folder && element.folder.length > 0) {
            const foundName = findElementByParsedName(element.folder, searchString);
            if (foundName !== null) {
                return foundName;
            }
        }
    }
    return null;
}

export const getMdxFiles = (): FileElementType[] => {
  return jsonFiles;
};
