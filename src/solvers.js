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
// window.findNQueensSolution = function(n) {
//   //var solution = undefined; //fixme
//   // if (n === 3 || n === 2) {
//   //   return [];
//   // }
//   if (n === 0) {
//     return [];
//   }
//   //create an array with n numbers of nest array
//   var arr = [];
//   for (var i = 0; i < n; i++) {
//     arr.push(new Array(n).fill(0));
//   }
//   //create two object neg pos
//   var possibleIndex = {};
//   var negativeIndex = {};
//   var indexArr = _.range(n); //check
//   var row = 0;
//   var copyIndexArr, index, chooseIndex;
//   var count = 0;
//   var isWrong = false;
//   debugger;
//   while (row < n) {
//     //if is the first turn row = 0
//     copyIndexArr = indexArr.slice();
//     if (indexArr.length < n) {
//       //row = 1
//       for (var key in possibleIndex) {
//         if (_.indexOf(copyIndexArr, possibleIndex[key]) !== -1) {
//           copyIndexArr.splice(_.indexOf(copyIndexArr, possibleIndex[key]), 1);
//         }
//         if (_.indexOf(copyIndexArr, negativeIndex[key]) !== -1) {
//           copyIndexArr.splice(_.indexOf(copyIndexArr, negativeIndex[key]), 1);
//         }
//         possibleIndex[key] ++;
//         negativeIndex[key] --;
//       }
//     }
//     // if (copyIndexArr.length === 0) {
//     //   arr = findNQueensSolution(n);
//     //   break;
//     // }
//     if (copyIndexArr.length !== 0) {
//       index = Math.floor(Math.random() * copyIndexArr.length);
//       var chooseIndex = copyIndexArr[index];
//       // var temp = [chooseIndex - 1, chooseIndex, chooseIndex + 1];
//       // if (JSON.stringify(temp) === JSON.stringify(indexArr)) {
//       //   copyIndexArr.splice(chooseIndex, 1);
//       //   index = Math.floor(Math.random() * copyIndexArr.length);
//       //   chooseIndex = copyIndexArr[index];
//       // }
//       arr[row][chooseIndex] = 1;
//       count++;
//       var deleteIndex = _.indexOf(indexArr, chooseIndex);
//       indexArr.splice(deleteIndex, 1);
//       possibleIndex[row] = chooseIndex + 1;
//       negativeIndex[row] = chooseIndex - 1;
//     }
//     // if (count < n && copyIndexArr.length === 0) {
//     //   isWrong = true;
//     //   break;
//     // }
//     row++;
//   }
//   // if (isWrong) {
//   //   arr = findNQueensSolution(n);
//   // }
//   console.log(arr);
//   // console.log('findNQueensSolution:', window.findNQueensSolution(n));
//   console.log('Single solution for ' + n + ' queens:', JSON.stringify(arr));
//   return arr;
// };

// // return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
// window.countNQueensSolutions = function(n) {
//   var solutionCount = undefined; //fixme

//   console.log('Number of solutions for ' + n + ' queens:', solutionCount);
//   return solutionCount;
// };




////////////////////////////////////////==================================

// var findBoard = function(n) {
//   // console.log(n);
//   // var arr = new Board({'n': n});
//   // var arr = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
//   for (var i = 0; i < n; i++) {
//     arr.push(new Array(n).fill(0));
//   }
//   var indexArr = _.range(n);//[0,1,2,3]
//   // var indexArr = [0, 1, 2, 3];
//   var copyOfIndexArr;
//   var row = 0;
//   var posativeDoNotUseIndexes = {};
//   var negativeDoNotUseIndexes = {};
//   //add one beforw while loop;
//   while (row < n) {
//     copyOfIndexArr = indexArr.slice();

//     ///////////////////////////////////////////
//     //only if its not the first iteration
//     //check copyof Aaray for any indexes not allowed in current row and remove them from the copied array
//       //then increment  current posative object value and decrement current negative object value
//     ///////////////////////////////////////////
//     //row = 1, indexArr.lenght =3 pos = {0:1},neg = {0:-1}
//     //===============================
//     if (indexArr.length !== n) {
//       //===============================
//       for (var key in posativeDoNotUseIndexes) {
//         // console.log(posativeDoNotUseIndexes[key]);
//         //copyarr = [1,2,3]
//         if (copyOfIndexArr.indexOf(posativeDoNotUseIndexes[key]) !== -1) {
//           copyOfIndexArr.splice(copyOfIndexArr.indexOf(posativeDoNotUseIndexes[key]), 1);
//           //copyarr = [2,3]
//         }
//         if (copyOfIndexArr.indexOf(negativeDoNotUseIndexes[key]) !== -1) {
//           copyOfIndexArr.splice(copyOfIndexArr.indexOf(negativeDoNotUseIndexes[key]), 1);
//         }
//         posativeDoNotUseIndexes[key]++;
//         negativeDoNotUseIndexes[key]--;
//         //pos = {0:2} neg = {0:-2};
//       }
//     }
//     //check if the copied arr has any values in it after the removal precess
//     //if yes, calculate random index based on its length
//       //set an element of 1 on the current row of the arr at the value of (copied array at index)
//       //find the index of the copied array at indexes value and remove it from the indexarr
//         //outside the while loop
//       //set a new property on the posative and negative objects with the row as the key with a value
//         //of the copied arr at indexes (posative obj value will add 1) (negative obj value will subtract one)
//         if (copyOfIndexArr.length) {
//           var index = Math.floor(Math.random() * copyOfIndexArr.length);
//           // console.log(copyOfIndexArr[index])
//           arr[row][copyOfIndexArr[index]] = 1;
//           var indexToBeRemoved = indexArr.indexOf(copyOfIndexArr[index]);
//           indexArr.splice(indexToBeRemoved, 1);//[0,2,3]  [3] index = 0
//           posativeDoNotUseIndexes[row] = copyOfIndexArr[index] + 1;
//           //{0:1}
//           negativeDoNotUseIndexes[row] = copyOfIndexArr[index] - 1;
//           //{0:-1}
//           //====================
//           row ++;
//         } else {
//           //increment the row
//           row++;
//           //=================
//     }
//   }
//   // return the solution
//   return arr;
// };

// var check = findBoard(4);
// console.log(check);
////////////////////////////////////////==================================

/*
  var arr = [];
  if (n === 0) {
    return [];
  }
  for (var i = 0; i < n; i++) {
    arr.push(new Array(n).fill(0));
  }
  var indexArr = _.range(n);//[0,1,2,3]
  var row = 0;
  var nextRowChoices, index, choiceIndex;


  while (row < n) {
    if (nextRowChoices === undefined) {
      index = Math.floor(Math.random() * indexArr.length);
      choiceIndex = indexArr[index];
    } else {
      index = Math.floor(Math.random() * nextRowChoices.length);
      choiceIndex = nextRowChoices[index];
      var temp = [choiceIndex - 1, choiceIndex, choiceIndex + 1];
      if (JSON.stringify(temp) === JSON.stringify(indexArr)) {
        nextRowChoices.splice(index, 1);
        index = Math.floor(Math.random() * nextRowChoices.length);
        choiceIndex = nextRowChoices[index];
      }
    }
    arr[row][choiceIndex] = 1;
    nextRowChoices = indexArr.slice();
    if (nextRowChoices.length === 2) {
      nextRowChoices.splice(index, 1);
    }
    if (index > 0 && index < indexArr.length - 1) {
      nextRowChoices.splice(choiceIndex - 1, 3);//splice(0,3) = next =[3]
    }
    if (index === 0 && indexArrnex.length > 2) {
      nextRowChoices.splice(0, 2);
    }
    if (index === indexArr.length - 1) {
      nextRowChoices.splice(choiceIndex - 1, 2);
    }
    indexArr.splice(index, 1);
    row ++;
  }
*/

//====================================================

// window.findNQueensSolution = function(n) {
//   //var solution = undefined; //fixme
//   //if n equals zero return empty arr

//   //create an array with n numbers of nest array
//   var arr = [];
//   if (n === 0) {
//     return [];
//   }
//   for (var i = 0; i < n; i++) {
//     arr.push(new Array(n).fill(0));
//   }
//   //create two object to hold the negative and posative indexes that a queen cant be placed on the next row
//   var possibleIndex = {};
//   var negativeIndex = {};
//   //create an array of the possible indexes for n inputs
//   var indexArr = _.range(n); //check
//   //create a row var to keep track what row we are currently on
//   var row = 0;
//   //create a copy of the index array
//   var copyIndexArr, index;
//   //loop n-times
//   while (row < n) {
//     //if is the first turn row = 0
//     //create a copy of the index arr
//     copyIndexArr = indexArr.slice();
//     //check if the its the first iteration
//     if (indexArr.length !== n) {
//       //row = 1
//       //if no, loop through objects
//       for (var key in possibleIndex) {
//         //check the copied arr to see if it has any of the property values
//         if (_.indexOf(copyIndexArr, possibleIndex[key]) !== -1) {
//           //if yes remove those values from the copied arr
//           copyIndexArr.splice(_.indexOf(copyIndexArr, possibleIndex[key]), 1);
//         }
//         if (_.indexOf(copyIndexArr, negativeIndex[key]) !== -1) {
//           copyIndexArr.splice(_.indexOf(copyIndexArr, negativeIndex[key]), 1);
//         }
//         //increment posative values in posobj and decrement negative values in negobj
//         //so values reflect where the queen cant be place on the next iteration
//         possibleIndex[key] ++;
//         negativeIndex[key] --;
//       }
//     }
//     //check if the copied arr has a length of zero
//     if (copyIndexArr.length === 0 && row < n - 1) {
//       //if yes, this means the current solution is not valid so recursively call findqueens again
//       arr = findNQueensSolution(n);
//       //if nqueens func returns a valid solution end the while loop
//       //return to the previous step;
//     }
//     //check if copied arrays length is not zero
//     if (copyIndexArr.length) {
//       //create an index var and assign it to a random index between the range of the copied arrays length
//       index = Math.floor(Math.random() * copyIndexArr.length);
//       //replace a zero with a queen at the  number in the copied array at the index value
//       arr[row][copyIndexArr[index]] = 1;
//       //then delete that value from the original array
//       var deleteIndex = _.indexOf(indexArr, copyIndexArr[index]);
//       indexArr.splice(deleteIndex, 1);
//       //add properties to the objects with values set to the number at index (above) plus one and minus one
//       possibleIndex[row] = copyIndexArr[index] + 1;
//       negativeIndex[row] = copyIndexArr[index] - 1;
//     }
//     //increment the row var by one
//     row++;
//   }
//   console.log(arr);
//   console.log('Single solution for ' + n + ' queens:', JSON.stringify(arr));
//   //return the result arr
//   return arr;
// };
//====================================================

/*
var queens = [1] * n;
var check = function(n, arr, row) {
  var res;
  for (var i = 0; i < n; i++) {
    if (i !== row) {
      for (var j = 0; j < n; j++) {
        if (arr[i][j] === i) {

        }
      }
    }

  }
}
*/

//==============correct==============================

window.findNQueensSolution = function(n) {
  // debugger;
  //edgecase- if n equals 2 or 3 return empty board
  if (n === 0) {
    return [];
  }
  if (n === 2 || n === 3) {
    var edgeCase = new Board({n: n});
    return edgeCase.rows();
  }
  //create a new board class
  var board = new Board({n: n});
  //create a solution var not assigned
  var solution;
  //creat inner recursive helper (input is  number (index of row))
  var innerFunc = function(rowIndex) {
    //base case if row(it is a index) equals n
    if (rowIndex === n) {
      //set solution equal to stringify version of board rows invoked
      solution = JSON.stringify(board.rows());
      //use return statement to stop everything
      return;
    }
    //iterate less than n times (for in loop)
    for (var i = 0; i < n; i++) {
      //board toggle new piece place at (row , i)
      board.togglePiece(rowIndex, i);
      //check the board if there are any conflicts (board.hasAnyQueensConflict)
      if (!board.hasAnyQueensConflicts()) {
        //if no conflicts call helper func recurively with n + 1
        innerFunc(rowIndex + 1);
        // if (solution !== undefined) {
        //   return solution;
        // }
      }

      //if there are conflicts remove (toggle piece) board.toggle(row, i)
      board.togglePiece(rowIndex, i);

    }

  };
  //invoke helper with zero the first time
  innerFunc(0);
  //return jason parse of solution
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  solution = JSON.parse(solution);
  return solution;
};

//==============correct==============================


window.countNQueensSolutions = function(n) {
  // if (n === 0) {
  //   return 1;
  // }
  if (n === 2 || n === 3) {
    return 0;
  }
  // //create a new board class
  var board = new Board({n: n});
  //create a solution var not assigned
  // var sols = 0;
  var solution = 0;
  // debugger;
  //creat inner recursive helper (input is  number (index of row))
  var innerFunc = function(rowIndex) {
    //base case if row(it is a index) equals n
    if (rowIndex === n) {
      //set solution equal to stringify version of board rows invoked

      solution++;
      //use return statement to stop everything
      return;
    }
    //iterate less than n times (for in loop)
    for (var i = 0; i < n; i++) {
      //board toggle new piece place at (row , i)
      board.togglePiece(rowIndex, i);
      //check the board if there are any conflicts (board.hasAnyQueensConflict)
      if (!board.hasAnyQueensConflicts()) {
        //if no conflicts call helper func recurively with n + 1
        innerFunc(rowIndex + 1);
        // if (solution !== undefined) {
        //   return solution;
        // }
      }
      //if there are conflicts remove (toggle piece) board.toggle(row, i)
      board.togglePiece(rowIndex, i);
    }
  };
  //invoke helper with zero the first time
  innerFunc(0);
  //return solution
  // console.log(sols);ß
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
  // var count = 0;
  // var queensIndex = new Array(n).fill(-1);
  // // debugger;
  // var dfs = function(queensIndex, row, board) {
  //   if (row === n) {
  //     count ++;
  //     return;
  //   }
  //   for (var i = 0; i < n; i++) {
  //     queensIndex[row] = i;
  //     if (isValid(queensIndex, row)) {
  //       var temp = new Array(n).fill(0);
  //       temp.splice(i, 1, 1);
  //       board[row] = temp;
  //       dfs(queensIndex, row + 1, board);
  //     }
  //   }
  // };
  // var isValid = function(queensIndex, row) {
  //   for (var row2 = 0; row2 < row; row2++) {
  //     if (Math.abs(queensIndex[row2] - queensIndex[row]) === row - row2 || queensIndex[row2] === queensIndex[row]) {
  //       return false;
  //     }
  //   }
  //   return true;
  // };
  // dfs(queensIndex, 0, []);
  // console.log('Number of solutions for ' + n + ' queens:', count);
  // return count;

};

