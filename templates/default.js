module.exports = ({
    timestr,
    sq: {time, players_connected: pc}
}) => (`T:${time};P:${pc}`);
