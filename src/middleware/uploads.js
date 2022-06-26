const multer = require('multer')
const path = require('path')

var storage = multer.diskStorage({ 
    destination: function(req, file, cb){
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb){
        const uniqueSuffix = Date.now() + "-" +Math.round(Math.random() * 9);
        let ext = path.extname(file.originalname)
        cb(null,uniqueSuffix+ext)
    }
})

var upload = multer({
    storage: storage,
    fileFilter: function( req, file, callback){
        if(
            file.mimetype == "image/jpeg" || 
            file.mimetype == "image/png" || 
            file.mimetype == "docs/pdf"
        ){
            callback(null,true)
        }
        else{
            console.log("file type not valid")
        }
        
    },
    limits:{
        fileSize:1024*1024*2
    }

})

module.exports = upload