import multer from "multer";
const { diskStorage } = multer;

const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image")) {
		cb(null, true);
	} else {
		cb("Please upload only images.", false);
	}
};

const storage = diskStorage({
	destination: function (req, file, cb) {
		if(req.files?.profile_pic) cb(null, './uploads/profile_pic');
		else if (req.files?.Upload_vaccination_certificate) cb(null, './uploads/Upload_vaccination_certificate');
		else if (req.files?.upload_certificates) cb(null, './uploads/upload_certificates');
		else cb(null, './uploads/pictures');
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '_' + file.originalname);
	}
})


const upload = multer({
	storage: storage,
	fileFilter: multerFilter
});

export default upload;
