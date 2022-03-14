module.exports = (sequelize, DataTypes) => {
  return sequelize.define("guild_clans", {
    guild: DataTypes.STRING,
    clan: DataTypes.STRING,
  });
};
