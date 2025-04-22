# Causal Inference and Random Control Trials

## Notation and Goal

The goal of causal inference is to determine the effects of *treatments* on the *outcomes* of individuals. For example, an important problem in real life is gauging whether or not a drug has a positive effect on the improvement of a patient. Even if we observe the patient get better after taking the drug, how can we be certain that the taking of the drug *caused* the pateint to improve? 

We first need to introduce some notation. We define **W** to be a vector (w1, w2, ..., wn), which contains the assignments for each of the n units/individuals. 