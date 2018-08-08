var fastloop = require('../dist/fastloop')

let start = Date.now()
  var arr = []
  for(var i = 0; i < 8000000; i++) {
      arr.push(i)
  }
  console.log(arr.length)
let end = Date.now() 

console.log('default for loop', end - start)

start = Date.now()
  arr = []
  fastloop(8000000, 0, 1, function (i) {
    if (i == 0) start = Date.now()
    arr.push(i)
  }, function () {
      console.log(arr.length)

      end = Date.now()
      console.log('fast for loop', end - start)

  }, 100000, 'full', 1000)

