module.exports = (db, Sequelize) => {
    const adminDetails=db.define('adminDetails', {
        id: {
            allowNull: false,
            autoIncrement: true,
            type: Sequelize.INTEGER
          },
          name: {
            type: Sequelize.STRING
          },
          email: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
          },
          passcode: {
            type: Sequelize.STRING
          },      
    })
    adminDetails.associate = models => {
        adminDetails.hasMany(models.approvalstatus,{foreignKey:"adminmail", sourceKey:"email"})
    }
    return adminDetails;
}