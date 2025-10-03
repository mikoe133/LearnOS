function tiemo(){
    console.log("tiemo");
}
function aa(){
    console.log("aa");
}
//暴露数据
module.exports = {
    tiemo,
    aa
}

exports.tiemo = tiemo
exports.aa = aa