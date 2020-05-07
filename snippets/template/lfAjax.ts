//<%desc api 请求%>
this.loading.$1 = true;
let params = {};
try {
  const r = await HTTP_XX.get(params);
  if (r.data.code === 0) {
    $0;
  }
} catch (e) {
  console.log('e: ', e);
} finally {
  this.loading.$1 = false;
}
