import Hostel from "../models/Hostel.js"

export const createHostel = async (req, res, next) => {
    const newHostel = new Hostel(req.body);
  
    try {
      const savedHostel = await newHostel.save();
      res.status(200).json(savedHostel);
    } catch (error) {
      console.error("Error creating hostel:", error);  // Log the error for debugging
      next(error);  // Pass the error to the global error handler
    }
  };
  

export const updateHostel = async (req, res, next)=>{
    try {
        const updatedHostel = await Hostel.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true})
        res.status(200).json(updatedHostel);
     } catch (error) {
        res.status(500).json(error)
     }
    
}


export const deleteHostel = async (req, res, next)=>{
       try {
          await Hostel.findByIdAndDelete(req.params.id)
          res.status(200).json("Hostel has been deleted");
       } catch (error) {
          res.status(500).json(error)
       }
      
}

export const getHostel = async (req, res, next)=>{  
    try {
        const hostel = await Hostel.findById(req.params.id)
        res.status(200).json(hostel);
     } catch (error) {
        res.status(500).json(error)
     }
    
}

export const getHostels = async (req, res, next) => {
   try {
       let query = {};

       if (req.query.name) {
           query.name = { $regex: req.query.name, $options: "i" }; // Case-insensitive partial match
       }
       if (req.query.category) {
           query.category = req.query.category;
       }
       if (req.query.genderType) {
           query.genderType = req.query.genderType;
       }
       if (req.query.messType) {
           query.messType = req.query.messType;
       }
       if (req.query.pricing) {
           query.pricing = req.query.pricing;
       }

       const hostels = await Hostel.find(query).limit(req.query.limit);
       res.status(200).json(hostels);
   } catch (error) {
       next(error);
   }
};


export const countByGender = async (req, res, next) => {
   try {
       const genders = req.query.gender.split(","); // Example: ?gender=Boys,Girls
       const list = await Promise.all(
           genders.map(gender => Hostel.countDocuments({ genderType: gender })) // Use genderType instead of type
       );
       res.status(200).json(list);
   } catch (error) {
       next(error);
   }
};


export const countByCategory = async (req, res, next) => {
   try {
     const pgCount = await Hostel.countDocuments({ category: "PG" });
     const hostelCount = await Hostel.countDocuments({ category: "Hostel" });
 
     res.status(200).json([
       { type: "PG", count: pgCount },
       { type: "Hostel", count: hostelCount }
     ]);
   } catch (err) {
     next(err);
   }
 };
 