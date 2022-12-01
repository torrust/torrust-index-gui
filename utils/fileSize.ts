// get string of file size in bytes
export function fileSize(size: number): string {
    if (!size) size = 0;
    let sizeString = `${(size).toFixed(2)} B`;

    if (size / 1000000000 < 1000) sizeString = `${(size / 1000000000).toFixed(2)} GB`;
    if (size / 1000000 < 1000) sizeString = `${(size / 1000000).toFixed(2)} MB`;
    if (size / 1000 < 1000) sizeString = `${(size / 1000).toFixed(2)} KB`;

    return sizeString;
}
