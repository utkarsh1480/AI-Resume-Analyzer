import multer from 'multer'
const uploadFile =multer({
    storage : multer.memoryStorage(),
    limits : {
        fileSize: 5 * 1024 * 1024, // 5 MB
    } 
})


export {uploadFile};