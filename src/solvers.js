/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  /*[[0,1,0,0],
     [1,0,1,0],
     [0,0,0,0],
     [0,0,0,1]]
  */
  if (n === 0) {
    return undefined;
  }
  var arr = [];
  for (var i = 0; i < n; i++) {
    arr.push(new Array(n).fill(0));
  }
  var indexArr = _.range(n);//[0,1,2,3]
  var row = 0;
  var index;
  while (indexArr.length > 0 && row < n) {
    index = Math.floor(Math.random() * indexArr.length);
    arr[row][indexArr[index]] = 1;
    indexArr.splice(index, 1);
    row ++;
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(arr));
  return arr;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined;
  var calculate = function(i) {
    if (i < 2) {
      return 1;
    }
    return i * calculate(i - 1);
  };

  solutionCount = calculate(n);
  //(n-1) * (n-2)....* 1
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);

  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
