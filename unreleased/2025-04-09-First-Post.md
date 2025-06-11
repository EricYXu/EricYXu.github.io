## First Post

Howdy, welcome to my first post! I hope you this post finds you well whatever your situation be. Creating content is something that I haven't really done before, so this post is my first attempt at making something engaging. 

A few days ago, I checked out the quintessential algorithms textbook by Cormen, Leiserson, Rivest, Stein (CLRS). There were some interesting things that I learned that I felt were worth sharing. 

### NP-Complete Problems

I learned about a type of computational problem known as **NP-complete problems**. These problems do not possess a known efficient algorithm, but have not been proven to not have an efficient solution. Perhaps the most interesting thing I learned was that once an efficient algorithm is found to solve one NP-complete problem, then all NP-complete problems will possess an efficient solution. Furthermore, NP-complete problems are not much different from problems that do have efficient solutions. For example, the travelling-salesman problem resembles the shortest-path problem besides a few additional conditions. 

### Insertion Sort

The first algorithm that was taught in this book was **insertion sort**. It is late and I am not motivated to detail the entire algorithm at this moment, but the essence of this in-place algorithm is to partition an input sequence into a sorted and unsorted section. Then for each key after the first sequence entry, you "insert" the key into the correct position within the sorted section of the sequence. 