module.exports = (db, Sequelize) => {
    const approvalstatus=db.define('approvalstatus', {
      
        applicationid: {
            allowNull: false,
            type: Sequelize.INTEGER,
          },
          empmail: {
            type: Sequelize.STRING,
          },
          adminmail: {
            type: Sequelize.STRING,
          },
          status: {
            type: Sequelize.STRING
          }
    })
    approvalstatus.associate = models => {
      approvalstatus.belongsTo(models.adminDetails,{foreignKey:"adminmail", sourceKey:"email"}),
      approvalstatus.belongsTo(models.empDetails,{foreignKey:"empmail", sourceKey:"email"}),
      approvalstatus.belongsTo(models.Applications,{foreignKey:"applicationid", sourseKey:"id"})
    }
    return approvalstatus;
}