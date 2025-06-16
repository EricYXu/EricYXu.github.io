# Thoughts on "The Bitter Lesson" by Rich Sutton

## Key Idea
Models trained with **large amounts of compute + data** generally perform better than models with huamn-based structure.

In ["The Bitter Lesson"](https://www.cs.utexas.edu/~eunsol/courses/data/bitter_lesson.pdf), Rich Sutton describes how "meta-methods" that employ large amounts of computation to learn relationships have consistently performed better than human-informed methods in the long-term. He defines **"meta-methods"** as techniques that use large amounts of compute and data to fit a general model, his two most notable examples being search and learning. Sutton then defines human-informed methods as those that seek to apply our understanding of the human mind or task to our problem-solver, such as using our human knowledge of chess strategy to improve chess-playing computers.

Sutton calls for the teaching of "bitter lesson" regarding the human-centric approach to AI research because it has been found time and time again that these "meta-methods" have perform better than human-informed problem-solvers in the long-term. The best solutions to problems in natural language processing (DARPA speech recognition challenge), game playing (Deep Blue and AlphaGo), and computer vision, have employed primarily search and learning rather than some human intuition for how these problems are solved within the human brain. For researchers to continue self-indulgently using human understanding to solve tasks would be a counterproductive approach. This is mainly due to the fact that the development human-designed problem-solvers often takes substantial amounts of time, just for "meta-methods" to still achieve better performance. The author concludes by emphasizing the need to acknowledge our world's immense complexity and the futility of trying to incorporate our interpretation of the brain's model of the world/task into a problem-solver for said task. 

### Questions
- What are some problem domains where human-centered techniques are still common? 
- Are there other "meta-methods" besides search and learning?