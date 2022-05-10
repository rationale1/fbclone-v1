const path = require("path"),
  multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },

  filename: (req, file, cb) => {
    // let newName =
    //   file.fieldname + "-" + Date.now() + path.extname(file.originalname);

    // let newName = Date.now() + path.extname(file.originalname);

    let newName = Date.now() + "_" + file.originalname;

    cb(null, newName);
  },
});

const upload = multer({
  storage,

  fileFilter: (req, file, cb) => {
    const fileTypes = /jpg|jpeg|png|gif/;

    const extName = fileTypes.test(path.extname(file.originalname));

    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) return cb(null, true);
    else {
      return cb("Images only", false);
    }
  },

  limits: { fileSize: 10 * 1000000 },
});

module.exports = upload;

/**=========================== Notes * ================= ****
 * file.mimetype === "image/png" || file.mimetype === "image/jpg";
 *
 * ============= How To Use in A Route ======
 * router.post("/", upload.single("profilePic"), (req,res,next) => {
 * const post = new Post({
 *  name:req.body.name,
 *  email:req.body.email,
 * });
 *
 * if (req.file) {
 * post.profilePic = req.file.originalname   or req.file.path;
 *
 * or
 * post.profilePic = req.filename;
 * }
 *
 * await post.save()
 *
 * })
 */

/**
 * let profile = req.file ? req.file.fileName : null
 * const {name,email} = req.body;
 *
 * new User({name, email, profile})
 *
 * console.log(req.file)
 *
 * <img alt='profile' src='http://localhost:500/public/images/nameOfImage.jpg'/>
 */
