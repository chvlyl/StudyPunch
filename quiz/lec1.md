Question 1

Q: According to the lecturer, what is the "real reason" for creating the CS 336 course?
A. To provide a foundational understanding of common techniques.
B. To enable students to train their own GPT-4 level models.
C. To address the crisis of researchers being disconnected from the underlying technology.
D. To make all lecture materials available on YouTube for a global audience.
Answer: C
Time: 2:25–2:38

Question 2

Q: What does the lecturer mean when he says that abstractions in language models are "leaky"?
A. They are inefficient and waste computational resources.
B. The underlying mechanics are not fully understood, unlike in traditional programming.
C. They often fail to generate coherent and grammatically correct text.
D. They cannot be easily transferred from one model to another.
Answer: B
Time: 3:16–3:24

Question 3

Q: What is the primary philosophy of the CS 336 course?
A. To learn by prompting proprietary models.
B. To understand a technology, you have to build it.
C. To focus on developing better and more efficient optimizers.
D. To primarily study the theoretical aspects of language models.
Answer: B
Time: 3:50–3:57

Question 4

Q: Why are frontier models like GPT-4 considered "out of reach" for students in the class?
A. The source code and architectural details are proprietary secrets.
B. The training requires immense capital and computational resources that are not available in academia.
C. The models are too complex to be understood within a single academic quarter.
D. The safety limitations prevent open access to these models.
Answer: B
Time: 4:05–4:55

Question 5

Q: How does the proportion of FLOPs spent in attention versus MLP layers change as models scale up?
A. Attention layers consistently dominate the computation at all scales.
B. The proportion remains roughly comparable regardless of model size.
C. MLP layers become increasingly dominant in larger models.
D. Small models spend most FLOPs on MLP layers, while large models spend more on attention.
Answer: C
Time: 5:21–5:52

Question 6

Q: What is meant by "emergent behavior" in language models as they scale?
A. Models become more efficient at smaller scales.
B. The training cost suddenly decreases after a certain point.
C. Capabilities like in-context learning appear suddenly at large scales after not being present at smaller scales.
D. The model's architecture spontaneously changes during training.
Answer: C
Time: 6:20–6:51

Question 7

Q: Which of the "three types of knowledge" does the lecturer claim can only be partially taught in the class?
A. The mechanics of how things work (e.g., a transformer).
B. The mindset of taking scaling seriously.
C. The intuitions about which data and modeling decisions lead to good models.
D. The history of language model development.
Answer: C
Time: 7:05–8:25

Question 8

Q: What is the lecturer's interpretation of the "bitter lesson" by Rich Sutton?
A. Scale is all that matters, and algorithms are irrelevant.
B. General-purpose methods that leverage computation are ultimately the most effective.
C. Algorithms that work at scale are what truly matter.
D. Building larger hardware is more important than designing new algorithms.
Answer: C
Time: 9:32–9:52

Question 9

Q: According to a 2020 study mentioned, how much did algorithmic efficiency improve for training ImageNet from 2012 to 2019?
A. 2x, roughly following Moore's Law.
B. 10x, a significant but expected improvement.
C. 44x, which was faster than Moore's Law.
D. 100x, due to the invention of the transformer.
Answer: C
Time: 10:57–11:16

Question 10

Q: What key development in the 2010s was NOT a direct predecessor to the transformer model?
A. The Adam optimizer.
B. Sequence-to-sequence (seq-to-seq) models.
C. Large-scale N-gram models trained on trillions of tokens.
D. The attention mechanism.
Answer: C
Time: 12:48–13:15

Question 11

Q: What distinguishes "open source models" from "open weight models" according to the lecture?
A. Open weight models are more powerful than open source models.
B. Open source models make both the weights and the data available, while open weight models only release the weights.
C. Open source models are free for commercial use, whereas open weight models are not.
D. There is no difference; the terms are used interchangeably.
Answer: B
Time: 16:28–16:48

Question 12

Q: What is the main purpose of a tokenizer in the language modeling pipeline?
A. To correct spelling and grammar in the input text.
B. To convert strings into sequences of integers and back.
C. To filter out irrelevant or harmful content from the training data.
D. To compress the model weights for more efficient storage.
Answer: B
Time: 27:57–28:02

Question 13

Q: Which of the following is NOT an improvement to the original transformer architecture mentioned in the lecture?
A. Rotary Positional Embeddings (RoPE).
B. RMS Norm instead of LayerNorm.
C. The use of Recurrent Neural Networks (RNNs) instead of attention.
D. SwiGLU non-linear activation function.
Answer: C
Time: 29:42–30:44

Question 14

Q: In the context of inference, what is the "pre-fill" phase?
A. Generating tokens one by one autoregressively.
B. The initial processing of the input prompt through the model.
C. Fine-tuning the model on the prompt before generating a response.
D. Selecting the best response from multiple generated candidates.
Answer: B
Time: 38:29–38:36

Question 15

Q: Why is the autoregressive decoding phase of inference often memory-bound?
A. It requires storing the entire training dataset in memory.
B. It's hard to saturate the GPUs when generating one token at a time, leading to bottlenecks in data movement.
C. The model's size dynamically increases with each generated token.
D. It uses a very large vocabulary that does not fit into the GPU cache.
Answer: B
Time: 38:58–39:10

Question 16

Q: What is the core idea behind "speculative decoding"?
A. Using a cheaper, smaller model to generate multiple token candidates that are then verified by the larger model.
B. Generating multiple independent responses and picking the most plausible one.
C. Skipping parts of the model architecture to speed up token generation.
D. Reducing the precision of the model weights from 32-bit to 8-bit floats.
Answer: A
Time: 39:16–39:42

Question 17

Q: What fundamental trade-off is addressed by the "Chinchilla optimal" scaling laws?
A. The trade-off between training speed and model accuracy.
B. The trade-off between the number of layers and the hidden dimension size.
C. The trade-off between model size and the amount of training data for a fixed compute budget.
D. The trade-off between pre-training and fine-tuning costs.
Answer: C
Time: 41:11–41:22

Question 18

Q: What is the simple rule of thumb derived from scaling laws for the relationship between model size (N) and the number of training tokens?
A. Number of tokens should be approximately equal to N.
B. Number of tokens should be approximately 20 times N.
C. Number of tokens should be approximately N squared.
D. Number of tokens should be approximately the square root of N.
Answer: B
Time: 42:23–42:37

Question 19

Q: What is a major reason that one cannot simply "train the model on the internet"?
A. The internet contains copyrighted material that cannot be used legally.
B. Most of the web is "trash" (spammy, low-quality) and requires extensive filtering and curation.
C. Internet data is mostly images and videos, not text.
D. The internet's data volume is too large even for frontier models to process.
Answer: B
Time: 46:50–48:15

Question 20

Q: After pre-training, what is the initial capability of a "base model"?
A. It can follow instructions and answer questions accurately.
B. It can only generate text in a specific style.
C. It can complete the next token based on the input text.
D. It can verify the correctness of mathematical proofs.
Answer: C
Time: 50:29–50:36

Question 21

Q: What is the goal of "Supervised Fine-Tuning" (SFT)?
A. To train the model from scratch on a small, high-quality dataset.
B. To teach the model to follow instructions by training it on prompt-response pairs.
C. To reduce the size of the model by pruning unnecessary weights.
D. To increase the model's vocabulary with new, domain-specific tokens.
Answer: B
Time: 51:43–52:05

Question 22

Q: What kind of data is used in algorithms like DPO (Direct Preference Optimization)?
A. Prompt-response pairs where the response is written by a human expert.
B. Data where a human has rated which of two model-generated responses is better.
C. Text that has been formally verified for correctness, such as mathematical proofs.
D. Data that has been automatically generated by another language model.
Answer: B
Time: 53:13–53:26

Question 23

Q: Which tokenization method results in very long sequences and a compression ratio of 1?
A. Character-based tokenization.
B. Word-based tokenization.
C. Byte-based tokenization.
D. Byte Pair Encoding (BPE).
Answer: C
Time: 1:08:20–1:08:40

Question 24

Q: What is a major drawback of simple word-based tokenization?
A. It produces very short, inefficient sequences.
B. The vocabulary size is fixed and cannot be changed.
C. It cannot handle punctuation or special characters.
D. It struggles with rare or new words, often requiring an "UNK" (unknown) token.
Answer: D
Time: 1:10:04–1:10:39

Question 25

Q: What is the fundamental principle of the Byte Pair Encoding (BPE) algorithm?
A. It splits words into their constituent syllables.
B. It recursively merges the most frequently occurring adjacent pair of tokens.
C. It assigns a unique token to every word in the training corpus.
D. It encodes each character as its raw UTF-8 byte value.
Answer: B
Time: 1:12:43–1:13:07

Question 26

Q: In the context of tokenization, what is the "compression ratio"?
A. The size of the model weights divided by the vocabulary size.
B. The number of bytes in the original text divided by the number of generated tokens.
C. The time it takes to tokenize a text versus the time to process it.
D. The ratio of known words to unknown words in a text.
Answer: B
Time: 1:04:40–1:04:48

Question 27

Q: Why is character-based tokenization that uses Unicode code points inefficient?
A. The sequences are too long for the model to process.
B. It cannot represent emojis or non-English characters.
C. The vocabulary becomes huge, and many code points for rare characters are used inefficiently.
D. It is not a reversible process, so you cannot decode the tokens back to text.
Answer: C
Time: 1:05:51–1:06:30

Question 28

Q: How did GPT-2's tokenizer handle pre-processing before applying the BPE algorithm?
A. It first converted the entire text into a sequence of bytes.
B. It used a word-based tokenizer to break the text into segments first.
C. It filtered out all punctuation and capitalization.
D. It did no pre-processing and applied BPE to the raw text.
Answer: B
Time: 1:12:29–1:12:43

Question 29

Q: During the BPE training process, what happens to the vocabulary?
A. It remains fixed at 256 entries for all bytes.
B. It shrinks as common pairs are merged.
C. It starts with byte-level tokens and expands with new tokens for each merge.
D. It is defined by a pre-existing list of common words.
Answer: C
Time: 1:14:47–1:15:00

Question 30

Q: What is the lecturer's view on the future of tokenization?
A. BPE will remain the standard for the foreseeable future.
B. He hopes for architectures that can operate directly on bytes, making tokenization obsolete.
C. Word-based tokenization will make a comeback due to its simplicity.
D. Tokenization will be replaced by methods that operate on individual pixels of text images.
Answer: B
Time: 1:18:18–1:18:25

Question 31

Q: What is the primary role of a GPU's memory (HBM) in relation to its compute units?
A. It acts as the factory where computations happen.
B. It is a long-term archive for the training data.
C. It acts as the warehouse for data and model parameters, which must be moved to compute units.
D. It is used exclusively for storing the final trained model.
Answer: C
Time: 35:04–35:15

Question 32

Q: What is a major bottleneck that kernel optimization techniques like fusion and tiling aim to minimize?
A. The cost of floating-point arithmetic operations.
B. The cost of data movement between memory and compute units.
C. The time it takes to compile the kernel code.
D. The power consumption of the GPU chip.
Answer: B
Time: 35:24–35:39

Question 33

Q: What type of parallelism involves splitting the model itself across multiple GPUs?
A. Data parallelism.
B. Tensor parallelism.
C. Pipeline parallelism.
D. Both B and C are forms of model parallelism.
Answer: D
Time: 14:16, 37:04

Question 34

Q: According to the lecture, why has efficiency become even MORE important at large scales?
A. Because smaller models are already perfectly efficient.
B. Because when spending hundreds of millions of dollars, you cannot afford to be wasteful.
C. Because there is a global shortage of GPUs.
D. Because large models are inherently slower than small models.
Answer: B
Time: 10:07–10:19

Question 35

Q: What was a key contribution of OpenAI that led to models like GPT-2 and GPT-3?
A. Inventing the transformer architecture from scratch.
B. Being the first to use GPUs for training neural networks.
C. Taking existing ingredients and pushing on scaling laws with strong engineering.
D. Developing the first open-source language model.
Answer: C
Time: 15:18–15:32

Question 36

Q: What is the main goal of the "Data" unit of the course?
A. Learning how to write code for data processing.
B. Understanding how to crawl the entire internet for data.
C. Understanding data sourcing, curation, filtering, and evaluation.
D. Learning to use synthetic data exclusively for training.
Answer: C
Time: 45:03, 46:43-49:55

Question 37

Q: What is the purpose of deduplication in the data processing pipeline?
A. To ensure the model does not see the exact same data multiple times, which can affect training.
B. To reduce the storage cost of the dataset.
C. To remove any text that contains repeated words.
D. To filter out documents written in foreign languages.
Answer: A
Time: 49:55–50:00

Question 38

Q: The process of making a model useful, instruction-following, and safe is broadly referred to as what?
A. Pre-training.
B. Alignment.
C. Tokenization.
D. Inference.
Answer: B
Time: 50:43–50:50

Question 39

Q: What is a key limitation of the Chinchilla scaling laws mentioned in the lecture?
A. They only apply to models smaller than one billion parameters.
B. They do not take the cost of inference into account.
C. They are only accurate for training on pure code datasets.
D. They become inaccurate if the model is trained for more than one epoch.
Answer: B
Time: 42:44–42:52

Question 40

Q: What is the primary task in Assignment 3 on Scaling Laws?
A. To implement the most efficient transformer model possible.
B. To use a limited compute budget to run small-scale experiments to predict performance at a larger scale.
C. To manually fine-tune a model to achieve the lowest possible loss.
D. To collect the largest possible dataset for training.
Answer: B
Time: 43:20–43:41

Question 41

Q: In the provided example, why is `hello` a different token from ` hello` (with a leading space)?
A. It is a mistake in the tokenizer that needs to be corrected.
B. The tokenizer treats capitalized and non-capitalized words differently.
C. The space is considered part of the token, making it a distinct entity.
D. One is an English word and the other is a special command token.
Answer: C
Time: 1:02:04–1:02:27

Question 42

Q: The lecturer mentions that the first neural language model dates back to 2003 from which research group?
A. Google Brain.
B. OpenAI.
C. Joshua Bengio's group.
D. Meta AI (FAIR).
Answer: C
Time: 13:21–13:27

Question 43

Q: Which popular optimizer, still widely used today, was introduced over a decade ago?
A. SGD (Stochastic Gradient Descent).
B. Adam.
C. RMSprop.
D. AdaGrad.
Answer: B
Time: 13:41–13:48

Question 44

Q: Which tool is mentioned for writing custom, high-performance GPU kernels in the course?
A. CUDA C++.
B. OpenCL.
C. PyTorch C++ Extensions.
D. Triton.
Answer: D
Time: 35:54–36:00

Question 45

Q: In the BPE training example, why is the pair `(116, 104)` merged first?
A. Because it is the first pair in the sequence.
B. Because it is the most frequently occurring pair in the training data.
C. Because the numbers are the lowest in value.
D. The choice is random.
Answer: B
Time: 1:14:24–1:14:42

Question 46

Q: What is one of the main reasons given for NOT taking the CS 336 class?
A. If you want to get any other research done during the quarter.
B. If you are not a Stanford student.
C. If you are not proficient in Python.
D. If you do not have access to a powerful personal computer.
Answer: A
Time: 21:34–21:40

Question 47

Q: What is an example of a "verifier" that can be used for learning from feedback?
A. A human who provides a rating on a scale of 1-5.
B. A formal verifier for correctness in domains like math or code.
C. A smaller language model that checks for grammatical errors.
D. A user who decides whether to accept or reject the model's output.
Answer: B
Time: 53:50–53:56

Question 48

Q: What does the lecturer state is a key factor that differentiates models, aside from architecture and systems?
A. The learning rate schedule.
B. The number of GPUs used for training.
C. The data used for training.
D. The random seed used for initialization.
Answer: C
Time: 45:03–45:11

Question 49

Q: The lecturer describes the current era as being "compute constrained." What does he predict will happen as frontier labs become "data constrained"?
A. The design decisions and architectures will likely change significantly.
B. Training will become much cheaper and more accessible.
C. Models will stop improving in capability.
D. Efficiency will no longer be an important consideration.
Answer: A
Time: 58:09–58:22

Question 50

Q: What is the core function of the `decode` operation in a tokenizer?
A. To convert a sequence of integer tokens back into a readable string.
B. To apply the merge rules to a sequence of bytes.
C. To calculate the compression ratio of a text.
D. To split a string into a sequence of tokens.
Answer: A
Time: 1:01:04–1:01:12 
