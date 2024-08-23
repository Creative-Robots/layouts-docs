import check from "check-types";

export function fixIndent(lines: string, n = 4) {
    if (!check.nonEmptyString(lines)) {
        return lines;
    }

    let linesArray = lines.split("\n");

    // Replace all occurences of double space by a tab
    // Only replace occurences before the first non-space character
    linesArray = linesArray.map((l) => {
        if (!lines.includes("  ")) {
            return l;
        }

        const firstCharIndex = l.search(/\S/g);
        if (firstCharIndex === -1) {
            return l;
        }
        const spaces = l.slice(0, firstCharIndex);
        const tabs = spaces.replace(/ {2}/g, "\t");
        return tabs + l.slice(firstCharIndex);
    });

    // Define a function to fix indentation
    const fixOverIndentedLinesAboveFirstComponent = (
        linesArr: string[]
    ): string[] => {
        let homelessLines = [];
        const otherLines = [];
        let firstComponentFound = false;
        for (const line of linesArr) {
            if (!firstComponentFound && line.startsWith("\t")) {
                homelessLines.push(line);
            } else {
                firstComponentFound = true;
                otherLines.push(line);
            }
        }

        if (check.nonEmptyArray(homelessLines)) {
            homelessLines = fixOverIndentedLinesAboveFirstComponent(
                homelessLines.map((l) => l.substring(1))
            );
        }

        return [...homelessLines, ...otherLines];
    };

    const fixRecursivelyUsingATree = (inputLines: string[]): string[] => {
        // Fix indentation of over-indented lines before first component
        const fixedAbove = fixOverIndentedLinesAboveFirstComponent(inputLines);

        // Split the lines into components to fix indentation over all children
        let components: string[][] = [];
        fixedAbove.forEach((line, i) => {
            if (!line.startsWith("\t")) {
                const newComponent = [line];
                components.push(newComponent);
            } else {
                if (!check.nonEmptyArray(components)) {
                    throw Error("Component found without a parent");
                }

                components[components.length - 1].push(line);
            }
        });

        components = components.map((componentLines) => {
            const [parent, ...children] = componentLines;
            if (!check.nonEmptyArray(children)) {
                return componentLines;
            }

            const fixedChildren = addIndent(
                fixRecursivelyUsingATree(
                    children.map((child) => child.substring(1))
                ).join("\n"),
                1
            ).split("\n");
            return [parent, ...fixedChildren];
        });

        return components.flat();
    };

    return fixRecursivelyUsingATree(linesArray).join("\n");
}

export function addIndent(lines: string, n: number) {
    if (!check.nonEmptyString(lines)) {
        return lines;
    }

    return lines
        .split("\n")
        .map((l) => "".padEnd(n, "\t") + l)
        .join("\n");
}
