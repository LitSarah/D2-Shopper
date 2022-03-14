module.exports = (sequelize, DataTypes) => {
  return sequelize.define("clan_members", {
    bungieId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    clan: DataTypes.STRING,
    destinyId: DataTypes.STRING,
    displayName: DataTypes.STRING,
  });
};
