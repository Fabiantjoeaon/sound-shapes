const calculateAngle = (x, y) => {
    const k = Math.abs(y) / Math.abs(x);
    let angle = Math.atan(k) * 180 / Math.PI;
    if (y * x > 0) {
        angle = 90 - angle + (y < 0 ? 180 : 0);
    } else {
        angle = angle + (y < 0 ? 90 : 270);
    }

    return angle;
};

export default calculateAngle;
