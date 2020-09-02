
module.exports = {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_BANCO,
    define: {
        timestamps: false,
        underscored: false,
    },
    timezone: "-04:00"
};