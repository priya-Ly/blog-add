const multer = require("multer");
const Author = require("../models/author");
const BlogLy = require("../models/blogLy");
const Category = require("../models/category");
const https = require("https");
const fs = require("fs");
const router = require("express").Router();
const addBlog = require("../controllers/addBlog");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const path = require("path");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dlaahua4u",
  api_key: "189524512316711",
  api_secret: "XtS8YfVdcvtTOkpPn4dRIYzuOLU",
});

let storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Blog_Ly",
    format: async (req, file) => "png",
    public_id: (req, file) => {
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    },
  },
});
const upload = multer({
  storage: storage,
});
router.post("/author", async (req, res, next) => {
  try {
    const { firstName, lastName } = req.body;
    const capitalizedFirstName =
      firstName.charAt(0).toUpperCase() + firstName.slice(1);
    const capitalizedLastName =
      lastName.charAt(0).toUpperCase() + lastName.slice(1);
    const addAuthor = new Author({
      firstName: capitalizedFirstName,
      lastName: capitalizedLastName,
    });

    await addAuthor.save();
    console.log(addAuthor);

    return res.status(200).json(addAuthor);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
router.get("/cloudinary-token", (req, res) => {
  // Generate upload token
  const uploadOptions = {
    upload_preset: "dyn8ivzk",
  };

  const uploadParams = cloudinary.uploader.upload_params(uploadOptions);

  // Send token back to frontend
  res.json({ uploadParams });
});
router.get("/cloudinary-preset", (req, res) => {
  // Return the Cloudinary upload preset name
  res.json({ upload_preset: "dyn8ivzk" });
});
// router.post("/api/upload", upload.single("file"), async (req, res) => {
//   try {
//     // Upload file to Cloudinary
//     const file = req.file;
//     console.log(req.file,'---------------')
//     if (!file) {
//       return res.status(400).json({ message: "File or filename is missing" });
//     }
//     const filePath = file.path; // Use req.file.path directly
//     console.log(filePath, "fp");
//     const result = await cloudinary.uploader.upload(filePath);
// console.log(result.secure_url)
//     // Send back the URL of the uploaded file
//     res.json({ url: result.secure_url });
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     res.status(500).json({ error: "Failed to upload file" });
//   }
// });

router.post(
  "/api/upload",
  upload.single("file"),
  async (req, res) => {
    try {
      // Upload file to Cloudinary
      const file = req.file;
      if (!file) {
        return res.status(400).json({ message: "File or filename is missing" });
      }
      const result = await cloudinary.uploader.upload(file.path);

      // Send back only the URL of the uploaded file from Cloudinary
      res.json({ success: 1, file: { url: result.secure_url } });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ error: "Failed to upload file" });
    }
  },
  router.post("/uploadUrl", upload.single("file"), async (req, res) => {
    try {
      console.log("inn");
      console.log(req.body);
      const { url } = req.body;

      const name = Date.now().toString();
      const imagePath = `public/urls/${name}.jpg`;
      console.log(imagePath);
      const file = fs.createWriteStream(`./${imagePath}`);
      https.get(url, (response) => {
        console.log(response);
        response.pipe(file);

        file.on("finish", () => {
          console.log("Download Complete");
          file.close();
          res.json({
            success: 1,
            file: {
              url: `http://localhost:7000/${imagePath}`,
            },
          });
        });
      });
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  })
);

router.get("/cloudinary-signature", async (req, res) => {
  try {
    // Generate signature
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      { timestamp },
      process.env.api_secret
    );
    //f55c39af1414777009ce4de916ceef8aedc4613d
    res.json({ timestamp, signature });
  } catch (error) {
    console.error("Error generating Cloudinary signature:", error);
    res.status(500).json({ error: "Failed to generate Cloudinary signature" });
  }
});

router.post("/category", async (req, res, next) => {
  try {
    const { categoryName } = req.body;

    const capitalized =
      categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
    const addCategory = new Category({
      categoryName: capitalized,
    });

    await addCategory.save();
    console.log(addCategory);

    return res.status(200).json(addCategory);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
router.post("/blog", upload.single("image"), addBlog);
router.get("/author", async (req, res, next) => {
  try {
    const getAuthors = await Author.find({});
    // console.log(getAuthors);
    return res.status(200).json(getAuthors);
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
});
router.get("/blog", async (req, res, next) => {
  try {
    const getBlogs = await BlogLy.find({})
      .populate("authorId")
      .populate("categoryId");
    console.log("getBlogs", getBlogs,getBlogs.length);
    return res.status(200).json(getBlogs);
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
});
router.get("/category", async (req, res, next) => {
  try {
    const getCategories = await Category.find({});
    // console.log(getCategories);
    return res.status(200).json(getCategories);
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
});
router.get('/userblogs',async(req,res,next)=>{
  try {
    const userBlogs=await BlogLy.find({status:'Publish'})
    console.log(userBlogs)
    return res.status(200).json(userBlogs)
  } catch (error) {
    
  }
})

module.exports = router;
