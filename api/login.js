const bcrypt = require('bcrypt');

module.exports = (app, db) =>
{
    app.post('/login',async (req,res)=>{
    
        var user={
            mail: req.body.mail,
            password: req.body.password
        };
       console.log(user['password']);
         // res.send(user);
        db.adminDetails.findOne({
            where: {email: user['mail']}
        }).then(t=>{
            if(!t)
            {
                console.log("Emp does't exist");
                res.status(404).json({"message": "Emp does't exist"});
            }
            else if( !(user['password']==t.passcode) )
            {
                console.log("Wrong password",user['password']);
              //  console.log(bcrypt.compareSync('admin','admin'));
                res.status(403).json({"message": "Wrong password"});
          
            }
            else
            {
                console.log("Login successfull");
                res.status(200).json({"message": "Login successfull", "name": t.name, "email": t.email});
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(500);
        })
    });
}