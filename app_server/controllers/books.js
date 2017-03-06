/**
 * Created by aman1 on 06/03/2017.
 */

/*Get home page*/
module.exports.index = function (req, res) {
    res.render('index', {title: 'Bookface'});
}