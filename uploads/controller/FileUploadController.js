const path = require('path');
const multer = require('multer');
const FileUpload = require('../schema/FileUploadSchema');
const googleUploadController = require('../controller/GoogleUploadController');

const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: function(req, file, cb){
        cb(null,file.originalname);
    }
})

const upload = multer(
    {
        storage: storage,
        limits: {
            filesize:9000000
        },
    }
).single('file');

const uploadFile = async(req, res) => {

    console.log(req.file);
    upload(req,res,async(err)=>{
        if(err){
            res.status(500).json({
                error: err,
                message: 'Error uploading file'
                
            })
        }
        else{
            console.log(req.file.originalname);
            //size
            console.log(req.file.size);
            //abs path
            console.log(req.file.path);
            var p= path.join(__dirname, '../uploads/'+req.file.originalname);
            console.log(p);

            //type
            

            if(req.file ==undefined){
                res.status(400).json({
                    message: 'No file selected'
                })
            }
            else{

                var x =  await googleUploadController.uploadFile(req.file.path);
                console.log(x);

                const fileUpload = new FileUpload({
                    name: req.file.originalname,
                    size: req.file.size,
                    url:p,
                    type: req.file.mimetype,
                    userName: req.body.userName,
                    gdriveId :x
                })
                fileUpload.save((err,data)=>{
                    if(err){
                        res.status(500).json({
                            error: err,
                            message: 'Error uploading file to db'
                        })
                    }
                    else{
                        res.status(200).json({
                            message: 'File uploaded successfully',
                            file: req.file.originalname,
                            data:data
                        })
                    }
                })



                // res.status(200).json({
                //     message: 'File uploaded successfully',
                //     file: req.file.originalname
                // })
            }
        }

    })

}
const getallfile=(req,res)=>{
    FileUpload.find((err,data)=>{
        if(err){
            res.status(404).json({
                message:"err for faching file"
            })
        }
        else{
            if(data==undefined || data==null || data.length==0){
                res.status(503).json({
                    message:"err for finding file"
                })
            }
            else{
                res.status(202).json({
                    message:"successfully finding file",
                    data:data
                })
            }
        }
    })
}
module.exports = {
    uploadFile,
    getallfile
}