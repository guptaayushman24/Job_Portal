const { date } = require('zod');
const Alljobs = require('../schema/All_jobs');
async function salaryfilter (req,res){
    try{
        const salary = req.body; // Assuming req.body contains the Salary value

        if (salary.Salary >= 3 && salary.Salary <= 7) {
            const data = await Alljobs.find()
              .where('Salary')
              .gte(3)
              .lte(7);
        
            return res.status(200).json({
              msg: data
            });
        } 
        else if (salary.Salary >= 8 &&  salary.Salary <= 10){
            const data = await Alljobs.find()
            .where('Salary')
            .gte(8)
            .lte(10)
            return res.status(200).json({
                'msg':data
            })
        }
        else if (salary.Salary>=11 && salary.Salary<=15){
            const data = await Alljobs.find()
            .where('Salary')
            .gte(11)
            .lte(15)
            return res.status(200).json({
                'msg':data
            })
        }
        else if (salary.Salary>=16 && salary.Salary<=20){
            const data = await Alljobs.find()
            .where('Salary')
            .gte(16)
            .lte(20)
            return res.json({
                'msg':data
            })
        }
         else {
          return res.status(400).json({
            msg: "Invalid salary range provided"
          });
        }
        
    }
    catch(err){
        return res.json({
            'msg':err
        })
    }
}
module.exports = {
    salaryfilter
}