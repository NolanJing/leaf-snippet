//<%desc api 请求%> 
this.loading$0 = true;
let params = {};
try{
  const r = await HTTP_XX.get(params)
  if(r.data.code === 0){
    $1
  }
}catch(e){
  console.log('e: ', e);
}finally{
  this.loading$0 = false;
}