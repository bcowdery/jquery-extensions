/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

    test('insert into array', function() {
        // index within array
        deepEqual(
            [1, 2, 3].insert("a", 1),
            [1, "a", 2, 3],
            "expected 'a' to be inserted after the first element"
        );		
        
        // position zero
        deepEqual( 
            ["a", 1, 2, 3], 
            [1, 2, 3].insert("a", 0),
            "expected 'a' to be inserted at the start of the array"
        );
        
        // negative index
        deepEqual(
            ["a", 1, 2, 3], 
            [1, 2, 3].insert("a", -1),
            "expected 'a' to be inserted at the start of the array"
        );
        
        // index greater than array size
        deepEqual( 
            [1, 2, 3, undefined, "a"], 
            [1, 2, 3].insert("a", 4),
            "expected 'a' to be inserted at the end of the array, empty spaces padded out with undefined"
        );													
    });

    test('split array', function () {   
        // split at position within array
        deepEqual(
            [1, "a", 2, "b"].split(2),
            [[1, "a"], [2, "b"]],
            "expected an array containg the two split arrays of equal size"
        );
        
        // position zero
        deepEqual(
            [[], [1, "a", 2, "b"]], 
            [1, "a", 2, "b"].split(0),
            "expected an empty array and the complete array"
        );							
    });

} (jQuery));