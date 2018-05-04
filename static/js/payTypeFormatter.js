export default function payTypeFormatter(rowObject) {
    var payType = rowObject.payType;
    var payCategory = rowObject.payCategory;
    var dealCode = rowObject.dealCode;

    if (payType == 0) {
        return '现金支付';
    } else if (payType == 2) {
        return '支付宝支付';
    } else if (payType == 3) {
        return '微信支付';
    } else if (payType == 12) {
        return '银行卡支付';
    } else if (payType == 8 && payCategory == 1) {
        return '卡余额支付';
    } else if (payType == 8 && payCategory == 0 && dealCode == 'ALIPAY') {
        return '支付宝支付';
    } else if (payType == 8 && payCategory == 0 && dealCode == 'WECHATPAY') {
        return '微信支付';
    } else if (payType == 8 && payCategory == 0 && dealCode == 'TONGLIAN') {
        return '银行卡';
    }
    else if ((payType == 11 || payType == 10) && dealCode == 'ALIPAY') {
        return '支付宝支付';
    } else if ((payType == 11 || payType == 10) && dealCode == 'WECHATPAY') {
        return '微信支付';
    } else if ((payType == 11 || payType == 10) && dealCode == 'TONGLIAN') {
        return '银行卡';
    }
    else {
        return payType;
    }
}
