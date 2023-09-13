import { request ,uploadFile,pasteUploadFile,JsonRequest} from '@/utils/request'
//import { uploadFileRequest } from '@/utils/uploadFile'
import qs from 'qs'
export default {
    get(url) {
        return request({
          method: 'get',
          url: url,
        })
      },
  post(url, params) {
    var param = null;
    if(params){
      param = qs.stringify({...params},{arrayFormat: 'brackets'});
    }else{
      param = qs.stringify({},{arrayFormat: 'brackets'});
    }
    return request({
      method: 'post',
      url: url,
      data: param,
    })
  },
  postFile(url, params) {
    return uploadFile({
      method: 'post',
      url: url,
      data: params,
    })
  },
  pasteFile(url, params) {
    return pasteUploadFile({
      method: 'post',
      url: url,
      data: params,
    })
  },
  JsonPost(url, params) {
    return JsonRequest({
      method: 'post',
      url: url,
      data: params,
    })
  },
  uploadFile(url, params,onUploadProgress) {//工程资料上传文件获取进度
    // onUploadProgress=>function(progressEvent){
    //   var progress = (progressEvent.loaded / progressEvent.total * 100 | 0)
    //   list.percent = progress
    // }
    return pasteUploadFile({
      method: 'post',
      url: url,
      data: params,
      onUploadProgress:onUploadProgress,
    })
  },
}