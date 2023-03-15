module.exports = ({
    timestr,
    sq: {time, players_connected: pc}
}) => (`LT:${timestr};ST:${time};P:${pc}`);
