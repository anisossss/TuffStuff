const express = require('express');
const router = express.Router();
const { Property } = require("../models/Property");
const multer = require('multer');

const { auth } = require("../middleware/auth");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")


//=================================
//             Property
//=================================

router.post("/uploadImage", auth, (req, res) => {

    upload(req, res, err => {
        if (err) {
            console.log(err);
            return res.json({ success: false, err })
        }
        console.log("file has been uploaded")
        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    })

});


router.post("/uploadProperty", auth, (req, res) => {

    //save all the data we got from the client into the DB 
    const property = new Property(req.body)

    property.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })

});


router.post("/getProperty", (req, res) => {

    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);

    let findArgs = {};
    let term = req.body.searchTerm;

    for (let key in req.body.filters) {

        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    console.log(findArgs)

    if (term) {
        Property.find(findArgs)
            .find({ $text: { $search: term } })
            .populate("writer")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, properties) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true, properties, postSize: properties.length })
            })
    } else {
        Property.find(findArgs)
            .populate("writer")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, properties) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true, properties, postSize: properties.length })
            })
    }

});



router.get("/properties_by_id", (req, res) => {
    let type = req.query.type
    let propertyIds = req.query.id

    console.log("req.query.id", req.query.id)

    if (type === "array") {
        let ids = req.query.id.split(',');
        propertyIds = [];
        propertyIds = ids.map(item => {
            return item
        })
    }

    console.log("propertyIds", propertyIds)


    //we need to find the product information that belong to product Id 
    Property.find({ '_id': { $in: propertyIds } })
        .populate('writer')
        .exec((err, property) => {
            if (err) return res.status(400).send(err)
            return res.status(200).send(property)
        })
});



module.exports = router;
