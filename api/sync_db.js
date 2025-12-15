require('dotenv').config({ path: '.env.production.local' });
const { conn } = require('./src/db.js');

conn.sync({ alter: true }).then(() => {
    console.log('Database synced successfully');
    process.exit(0);
}).catch((err) => {
    console.error('Error syncing database:', err);
    process.exit(1);
});
