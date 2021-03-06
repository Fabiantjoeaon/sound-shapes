export const easeInQuad = (t, b, c, d) => c * (t /= d) * t + b;

export const easeOutBounce = (t, b, c, d) => {
    if ((t /= d) < 1 / 2.75) {
        return c * (7.5625 * t * t) + b;
    } else if (t < 2 / 2.75) {
        return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
    } else if (t < 2.5 / 2.75) {
        return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
    } else {
        return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
    }
};

export const easeInOutElastic = (t, b, c, d) => {
    // jshint eqeqeq: false, -W041: true
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0) return b;
    if ((t /= d / 2) == 2) return b + c;
    if (!p) p = d * (0.3 * 1.5);
    if (a < Math.abs(c)) {
        a = c;
        s = p / 4;
    } else s = p / (2 * Math.PI) * Math.asin(c / a);
    if (t < 1)
        return (
            -0.5 *
                (a *
                    Math.pow(2, 10 * (t -= 1)) *
                    Math.sin((t * d - s) * (2 * Math.PI) / p)) +
            b
        );
    return (
        a *
            Math.pow(2, -10 * (t -= 1)) *
            Math.sin((t * d - s) * (2 * Math.PI) / p) *
            0.5 +
        c +
        b
    );
};
