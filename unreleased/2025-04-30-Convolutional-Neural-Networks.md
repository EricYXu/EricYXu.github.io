# Convolutional Neural Networks

## Motivations

Convolutional neural networks (CNNs) are widely known for their performance with respect to image classification tasks, and bear many noticable differences from prior methods like artificial neural networks (which encapsulate methods like feed-forward neural networks, recurrent neural networks, etc.). CNNs are a non-probabilistic supervised learning technique, but can find applications in continuous (regression) and discrete output domains (image classification). 

But given the power of feed-forward neural networks to classify handwritten digits, why would we not use these ANNs to perform more complex tasks like colored image classification? There are few reasons for this:

1. First, ANNs like feed-forward neural networks are fully-connected, meaning that each hidden layer neuron has connections to each neuron in the previous input layer and every neuron in the following hidden layer. Thus, each neuron has a large number of weights, which will require substantially more compute when we conduct backpropagation. 

2. A by-product of this added complexity is that these models have a higher probability of over-fitting, which occurs when the model optimizes too much with respect to the training data and does not generalize to real-world data. These issues warrant an architecture that can handle data with extremely high dimension, but that is also not too complex as to lower overfitting.


## Architecture 

There are three main components of a convolutional neural network's architecture. There first are **convolutional layers**, which involve taking a filter (a small matrix) and striding it over the input image (which we assume takes on the form of a tensor). Then, we compute the Frobenius inner product as the filter slides over each channel of the tensor, and obtain a new tensor with each entry being one of these dot products. Padding, which involves adding values to the beyond the edges of our matrix, can be used to ensure our intermediate tensor representation maintains the size of our input tensor.

- Hyperparameters: kernel size, padding type, stride

The intutiion behind the convolutional layers is that they allow us to find relationships between groups of pixels (local features) in an image. Smaller filters focus on learning local features, and has high variance (layer more complex). Larger filters can be used to learn more general features about an image (layer more general), and thus can exhibit high bias.

The next type of layer we may encounter are **max-pooling layers**. These act to convert our input tensor into a more condensed tensor (known as downsampling). By specifying a particular kernel size and stride, we let an entry in our output max-pooling tensor be the maximum of the receptive field of that entry. The receptive field of a neuron is the set of prior neurons that are able to influence the value of the neuron. For instance, if our inputted tensor was 3x3 and our kernel size was 3x3, then the result of a max-pooling layer would be a scalar that corresponds to the maximum value of that 3x3 matrix. 

- Hyperparameters: kernel size, stride

The intuition behind max-pooling layers is that they help preserve only the important features that we want to include in our feature map/intermediate representation.

The last type of layer that we may find are **fully-connected layers**. These layers are typically found towards the end of a convolutional neural networks and are analogous to the layers that are found in multi-layer perceptrons. Typically, the tensor preceding the fully-connected layer is flattened to match the dimensions necessary for the application of the layer.

- Hyperparameters: neuron count, dropout (which involves selecting nodes in the input and hidden layers to output zero with probability *p* during the training process, but then re-inserting the original weights when running inference)

## Training

Now that we are aware of the structure that a convolutional neural network, larger questions remain: *how do we train convolutional neural networks?* and *why is this architecture conducive to learning?*

Let's first tackle the challenge of training.





