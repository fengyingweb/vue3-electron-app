const ACHEME = 'file';
const path=require('node:path')
const LOAD_URL=`${ACHEME}://${path.join(__dirname, '../dist/index.html/')}`
module.exports={
    ACHEME,
    LOAD_URL
}
