**Expectation-Maximization (EM)** is an technique used to learn the parameters for models like mixture models, Gaussian mixture models, and Hidden Markov models. The crux of the EM algorithm revolves around the fact that we would like to approximate a set of latent (hidden) variables that affect our observed data via another probability distribution which has its own set of parameters. 

Let's investigate the EM-algorithm with respect to mixture models:

### Mixture Model EM-Algorithm
We observe that there are two parameters in our model. One is $\mathbf{\theta}$ which parameterizes $p(z ; \mathbf{\theta})$, which gives the probability of a data point belonging to . The other parameters is $\mathbf{w}$, wh

$\gamma$