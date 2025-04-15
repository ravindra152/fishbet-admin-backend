const multer = require('multer')

// Multer configuration
const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024 // Limit file size to 5 MB
  }
})

export const uploadSingle = (fieldName) => upload.single(fieldName)
export const uploadMultiple = (fieldName, maxCount = 5) => upload.array(fieldName, maxCount)
export const uploadWebAndMobile = upload.fields([{ name: "web" }, { name: "mobile" }]);
