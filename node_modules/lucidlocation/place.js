exports.getRandomLocation = function() {
    var locationPoint = {
        latitude: 0,
        longitude: 0
    };

    locationPoint.longitude = getRandomPoint();
    locationPoint.latitude = getRandomPoint();

    return locationPoint;
}

function getRandomPoint() {
    do {
        var num = Math.random() * 100;
    } while (num > 90 || num < 0)
    num = parseFloat(num.toFixed(5));
    return num;
}
