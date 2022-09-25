module.exports = (db, Sequelize) => {
    const empDetails=db.define('empDetails', {
        id: {
            allowNull: false,
            autoIncrement: true,
            type: Sequelize.INTEGER
          },
          name: {
            type: Sequelize.STRING
          },
          email: {
            allowNull: false,
            type: Sequelize.STRING,
            primaryKey: true
          },
          leave: {
            type: Sequelize.INTEGER
          },
          salary: {
            type: Sequelize.INTEGER
          },
          passcode: {
            type: Sequelize.STRING
          }

        })
    empDetails.associate = models => {
        empDetails.hasMany(models.Applications,{foreignKey:"empmail", sourceKey:"email"}),
      empDetails.hasMany(models.approvalstatus,{foreignKey:"empmail", sourceKey:"email"})
    }
    return empDetails;
}