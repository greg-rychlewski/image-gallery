// Compare two strings for sorting an array
let compareStrings = (a, b, order) => {
    // Sort order: 0 = ascending, 1 = descending
    if (order == 0) {
        return a.toLowerCase() <= b.toLowerCase() ? -1 : 1;
    }

    return a.toLowerCase() > b.toLowerCase() ? -1 : 1;
}

// Create compare function for sorting an array by two string columns in either ascending or descending order
export let makeCompareFunction = (order, firstCol, ...otherCol) => {
    return (a, b) => {
        // Check if first columns are equal, if not then compare then
        let [firstVal, secondVal] = a[firstCol].hasOwnProperty("compare") ? [a[firstCol]["compare"], b[firstCol]["compare"]] : [a[firstCol], b[firstCol]];
        if (firstVal != secondVal) {
            return compareStrings(firstVal, secondVal, order);
        }

        // If first columns are equal, go through the remaining columns until ones that aren't equal are found 
        // If all columns are equal, compare by last column
        for (let i = 0; i < otherCol.length; i++ ) {
            let col = otherCol[i];
            [firstVal, secondVal] = a[col].hasOwnProperty("compare") ? [a[col]["compare"], b[col]["compare"]] : [a[col], b[col]];

            if (firstVal != secondVal) {
                break;
            }
        }

        return compareStrings(firstVal, secondVal, order); 
    }
}

// Create array from one integer to another, step size of 1
export let intArray = (low, high) => {
    let result = [];
    
    while (low <= high) {
        result.push(low++);
    }

    return result;
}

// Month and year choices for date input
export let months = [
    "January",
    "February",
    "March", 
    "April", 
    "May",
    "June",
    "July", 
    "August",
    "September", 
    "October", 
     "November", 
     "December",
];

export let years = intArray(2010, new Date().getFullYear());