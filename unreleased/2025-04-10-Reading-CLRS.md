## Reading CLRS

Here are some notes that I am taking while reading Introduction to Algorithms by Corman, Leiserson, Rivest, and Stein. 

### Chapter 1

New terminology:
- Instance: an input to a computational problem
- Correct algorithm: for all instances, halts with the correct output
- NP-complete: a computation problem for which no efficient algorithm has ever been found but one where nobody has proven an efficient solution does not exist

#### Chapter 1.1 Exercises
1. Sorting shopping items alphabetically, diameter of a plot of points
2. Amount of memory needed
3. Linked list. Pros: appending to the front, deletion from end. Cons: searching and sorting is slow, cannot be iterated in reverse, random access slow

#### Chapter 2.1 Exercises
1. Starting with an instance of [31, 41, 59, 26, 41, 58], insertion sort would conduct the following set of operations. [31, 41, 59, 26, 41, 58] (instance) --> [31, 41, 59, 26, 41, 58] --> [31, 41, 59, 26, 41, 58] --> [26, 31, 41, 59, 41, 58] --> [26, 31, 41, 41, 59, 58] --> [26, 31, 41, 41, 58, 59] (halt).

2. If we wanted to rewrite insertion sort to arrange elements in non-increasing order (in Python), we could write:
```
def insertion_sort_nonincreasing(A):
    for j in range(1, len(A)):
        key = A[j]
        i = j-1
        while i >= 0 and A[i] <= key:
            A[i+1] = A[i]
            i = i-1
        A[i+1] = key
```

3. Pseudocode for linear search would look like: 
```
def linear_search(A, v):
    for index, element in enumerate(A):
        if v == element:
            return index
    return None
```

Now let's use loop invariants to prove that this algorithm is correct. We let the loop invariant be that the subarray A[1, 2, ..., j-1] does not contain the value v. 