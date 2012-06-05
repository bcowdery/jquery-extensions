jQuery.extend(Array.prototype, {
    /**
     * Inserts a value into this array instance, shifting all remaining elements left.
     * 
     * var ary = [1, 2, 3];
     * ary.insert("a", 1); -> [1, "a", 2, 3];
     * 
     * @param {Object} value
     * @param {Number} index
     */
    insert: function(value, index) {
        if (index < 0) {       
            index = 0;
        }
        
        for (var i = this.size(); i > index; i--) {
            this[i] = this[i-1];
        }
        
        this[index] = value;
        return this;
    },
    
    /**
     * Splits an array into two separate instances at the given index, operationaly 
     * similar to Array#slice, only preceeding array elements are not discarded. This
     * function does not alter the original array. 
     * 
     * var ary = [1, 2, 3, 4];
     * ary.split(2); -> [[1, 2], [3, 4]]
     * 
     * @param {Object} index (inclusive)
     */
    split: function(index) {
        return [this.slice(0, index), this.slice(index, this.size())];    // todo: convert to jQuery code - Array::slice
    }
});