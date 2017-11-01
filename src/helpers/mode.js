/**
 * Detect which element appears most in an array
 * @param {Array} arr 
 * @returns {Number}
 */
const mode = arr =>
    arr
        .sort(
            (a, b) =>
                arr.filter(v => v === a).length -
                arr.filter(v => v === b).length
        )
        .pop();

export default mode;
