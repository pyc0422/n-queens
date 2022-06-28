// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //check if row inde has conflicts

      //create a count var
      var count = 0;
      //use this.get to the row we want to check with the row index
      var index = this.get(rowIndex);
      //for each item in the row
      _.each(index, function(element) {
        if (element === 1) {
          count++;
        }
      });
      if (count > 1) {
        return true;
      }
      //check count var if its larger than one than return true otherwise return false
      return false; // fixme
    },
    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //reuse hasRowConflictAt function for each row
      var rows = this.rows();
      //loop over thr rows and check each rowIndex
      for (var i = 0; i < rows.length; i++) {
        //reusing hasRowConflictAt function for each rowIndex
        if (this.hasRowConflictAt(i)) {
          return true;
        }
        //if it once returned true we return true;
      }
      return false; // fixme
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      /*
      [[1,0,0],
       [1,0,0],
       [0,1,0]]
       colindex = 0; true
       colIndex = 1; false;
      */
      var count = 0;
      for (var i = 0; i < this.get('n'); i++) {
        if (this.get(i)[colIndex] === 1) {
          count ++;
        }
      }
      if (count > 1) {
        return true;
      }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // reuse hasColConflictsAt for each colums
      var a = this.get('n');
      // a = 4;
      for (var i = 0; i < a; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },

    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var n = this.get('n');
      var count = 0;
      if (majorDiagonalColumnIndexAtFirstRow === n - 1) {
        return false;
      }
      var find = false;
      var rowIndex;
      //loop all the row with the colIndex
      for (var i = 0; i < n; i++) {
        var cur = this.get(i)[majorDiagonalColumnIndexAtFirstRow];
        if (cur === 1) {
          rowIndex = i;
          find = true;
          break;
        }
      }
      /*
      [[1,0,1],
       [0,0,1],
       [1,1,1]]
       rowIndex = 0;colIndex = 0;
       nextRow =rowIndex + 1 = 1
       nextCol = colIndex + 1;
      */
      if (!find) {
        return false;
      }
      if (i === n - 1) {
        return false;
      }
      //for loop rest row to find the diagonal element;
      var nextColIndex = majorDiagonalColumnIndexAtFirstRow + 1;
      for (var j = rowIndex + 1; j < n; j++) {
        if (nextColIndex < n && this.get(j)[nextColIndex] === 1) {
          count ++;
        } else {
          nextColIndex ++;
        }
      }
      if (count > 0) {
        return true;
      }
      // if the diagonal element === 1 = > count ++;
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      //pass each columIndex to test if it return conflict
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
