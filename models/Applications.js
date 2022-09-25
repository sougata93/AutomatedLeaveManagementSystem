module.exports = (db, Sequelize) => {
    const Applications=db.define('Applications', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          empmail: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          applyfrom: {
            type: Sequelize.STRING
          },
          applyto: {
            type: Sequelize.STRING
          },
          totalleave: {
            type: Sequelize.INTEGER
          }
    })
    Applications.associate = models => {
        Applications.belongsTo(models.empDetails,{foreignKey:"empmail", sourceKey:"email"}),
       Applications.hasOne(models.approvalstatus,{foreignKey:"applicationid", sourceKey:"id"})
    }
    return Applications;
}