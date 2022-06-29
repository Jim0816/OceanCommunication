import http from '../utils/request';



/**
 * 推送markers数据到后端
 */
function add(){
  return  http("post",'/server/test');
}

export {
   add
}

