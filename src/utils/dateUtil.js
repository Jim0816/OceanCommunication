// 获取当前时间: 年、月、日、时、分、秒、毫秒、纳秒
const get_date_detail = () => {
    var date = new Date()
    return [date.getFullYear().toString(), 
        (date.getMonth() + 1).toString(), 
        date.getDate().toString(), 
        date.getHours().toString(), 
        date.getMinutes().toString(), 
        date.getSeconds().toString(), 
        date.getMilliseconds().toString(),
        '000',
        '000'
    ];
}


module.exports = {
    get_date_detail : get_date_detail
}