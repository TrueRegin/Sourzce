export const extRegex = /\..+$/i;
export const imageRegex = /(png|jpe?g|gif)$/i;

export function splitFilename(filename: string) {
    const exts = filename.match(extRegex);
    if (exts && exts.length === 1) {
        const ext = exts[0],
            newFilenameLength = filename.length - ext.length;
        const newFilename = filename.substring(0, newFilenameLength);

        return [newFilename, ext]
    } else {
        return [filename, undefined];
    }
}