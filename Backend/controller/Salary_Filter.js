const Alljobs = require('../schema/All_jobs');
async function salaryfilter (req,res){
        try {
            // Extract query parameters (start & end)
            const start = parseInt(req.query.start);
            const end = parseInt(req.query.end);
    
            // Validate query parameters
            if (isNaN(start) || isNaN(end)) {
                return res.status(400).json({ msg: "Invalid salary range provided" });
            }
    
            // Fetch jobs within salary range
            const data = await Alljobs.find()
                .where("Salary")
                .gte(start)
                .lte(end);
    
            return res.status(200).json({ msg: data });
    
        } catch (err) {
            return res.status(500).json({ msg: "Server Error", error: err.message });
        }
    };
module.exports = {
    salaryfilter
}