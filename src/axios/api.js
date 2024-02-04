export function loadJSON(filePath, callback) {
  fetch(filePath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      // 调用回调函数，并将加载的JSON数据传递给它
      callback(null, data);
    })
    .catch(error => {
      // 如果出现错误，将错误信息传递给回调函数
      callback(error, null);
    });
}
