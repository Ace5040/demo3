function hashId(string) {
    let hash = 0, i, chr;
    if (string.length === 0) return hash;
    for (i = 0; i < string.length; i++) {
        chr = string.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0;
    }
    return hash;
}

function getCenter(coordsArr) {
    let x, y;
    let sumX = 0;
    let sumY = 0;
    let count = coordsArr.length;
    for (let i = 0; i < count; i++) {
        sumX += coordsArr[i][0];
        sumY += coordsArr[i][1];
    }
    x = sumX / count;
    y = sumY / count;
    return [x, y]
}

function parseGeometry(geom) {
    return geom.geometry.features[0].geometry.coordinates[0];
}

export { getCenter, hashId, parseGeometry };
