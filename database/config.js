const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

       await mongoose.connect(process.env.MONGODB_CNN);

        
      console.log('Database online');

    } catch (erro) {
       //console.log(err);
       throw Error(`Database offline: ${errofirs}`)
    }

}



module.exports={
    dbConnection
};