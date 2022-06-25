import http from '../utils/request';



/**
 * 获取首页列表
 */
function test(){
  return  http("get",'/server/test');
}

export {
   test
}

