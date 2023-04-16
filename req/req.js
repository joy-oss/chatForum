import axiosHelper from 'axios'
//创建axios实例
const axiosInstance=axiosHelper.create({
    baseURL:'http://api_devss.wanxikeji.cn/',
    })
//创建请求处理方法
function reqFunAxios(reqMethod,reqUrl,reqData,reqCallback){
let reqParams={
    url:reqUrl,
    method:reqMethod
}
//争对不同的请求方法设置不同的数据传输方式
switch(reqMethod){
    case 'post':
    case 'put':
    reqParams.data=reqData;
    break;
    case 'get':
    case 'delete':
    reqParams.params=reqData;
    break;
}
//将参数传递给axios实例
const promiseReq=axiosInstance(reqParams);
//处理请求响应
promiseReq.then((responseResult)=>{
    if(responseResult.status===200){
        //若正常响应则给回调函数传递响应数据
        // console.log(responseResult)
        reqCallback(responseResult)
    }else{
        //根据请求异常状态码显示异常详情
        // alert(jsonHttpcode['A'+responseResult.status])
        alert('响应异常')
    }
})
}
export default reqFunAxios