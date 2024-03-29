const jwt = require('jsonwebtoken');
const keyToken = 'CS969dVVN70s2vWD5pxJUCsRE499308uTacBU179OQ06rgn5oIfZissIK13O7uA7k70Lpr48m3TxgvixGKBCD9OFKEvsQN5kp7J3HTxV7kSk8wuK0446yJGE5MJ4hj90xrQWCi0X2i3XB505wc047A93ekNjhng47meRWyymyuQ1501B2EiR6eovJx5oVEq248p9HI9u';


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, keyToken);
        const idAdmin = decodedToken.idAdmin;

        if (req.body.idAdmin && req.body.idAdmin === "" + idAdmin)
            next();
        else
            throw 'Mot de passe incorrect';


    } catch (error) {
        res.status(401).json({error: error | 'Non authentifié'});
    }
};
