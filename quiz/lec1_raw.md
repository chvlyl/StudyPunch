Question 1

Q: What is the primary motivation for the CS 336 course, according to the instructors?
A. To help students get high-paying jobs at top AI companies.
B. To enable fundamental research by providing a deep, end-to-end understanding of building language models.
C. To critique the over-reliance on proprietary models like GPT-4.
D. To make all lecture materials and assignments available on YouTube for a global audience.
Answer: B
Time: 3:31–3:57

Question 2

Q: Why are abstractions in language models described as "leaky"?
A. Because they often reveal confidential training data.
B. Because the underlying mechanics are not well-defined, unlike traditional programming abstractions.
C. Because they consume excessive memory and computational resources.
D. Because they cannot be easily transferred between different models.
Answer: B
Time: 3:16–3:24

Question 3

Q: What is a major challenge in academia for training language models that is mentioned in the lecture?
A. Lack of skilled PhD students to conduct the research.
B. The high cost and secrecy surrounding frontier models like GPT-4.
C. Insufficient theoretical knowledge about transformer architectures.
D. The difficulty in obtaining high-quality training data.
Answer: B
Time: 4:05–4:45

Question 4

Q: How does the relationship between FLOPs spent in attention layers versus MLP layers change with model scale?
A. Attention layers consistently dominate FLOPs usage regardless of model size.
B. The ratio of FLOPs between attention and MLP layers remains relatively constant across scales.
C. At small scales, FLOPs are comparable, but MLP layers dominate at very large scales.
D. At large scales, optimizing attention layers becomes the most critical factor for efficiency.
Answer: C
Time: 5:21–5:52

Question 5

Q: What does the phenomenon of "emergent behavior" in large language models imply?
A. Models develop consciousness as they scale up.
B. Certain abilities, like in-context learning, only appear after a model reaches a significant size.
C. Smaller models can be fine-tuned to exhibit the same behaviors as larger ones.
D. The model's performance grows linearly with the amount of training FLOPs.
Answer: B
Time: 6:20–6:50

Question 6

Q: Which of the following is NOT one of the three types of knowledge the course aims to impart?
A. Mechanics (how things work, e.g., a transformer).
B. Mindset (e.g., taking scaling seriously).
C. Intuitions (which decisions lead to good models).
D. Heuristics (shortcuts for prompt engineering).
Answer: D
Time: 7:05–8:12

Question 7

Q: According to a Shazeer paper, what was the given reason for the success of the SwiGLU non-linearity?
A. It was mathematically proven to be superior to ReLU.
B. It was based on principles of cognitive neuroscience.
C. The paper offered no scientific explanation, attributing it to "divine benevolence".
D. It was a simplified version of a more complex, pre-existing activation function.
Answer: C
Time: 8:59–9:17

Question 8

Q: What is the correct interpretation of the "bitter lesson" as presented in the lecture?
A. Scale is the only thing that matters, and algorithms are irrelevant.
B. Algorithms that perform well at scale are what truly matter for advancing AI.
C. Human-like cognitive architectures will eventually outperform scaling.
D. Any gains from better algorithms are quickly nullified by increased compute.
Answer: B
Time: 9:37–9:52

Question 9

Q: The lecture highlights a significant improvement in algorithmic efficiency for ImageNet training between 2012 and 2019. How large was this improvement?
A. 10x, roughly in line with Moore's law.
B. 2x, a modest but important gain.
C. 100x, far exceeding any hardware improvements.
D. 44x, a rate faster than Moore's law.
Answer: D
Time: 11:02–11:09

Question 10

Q: What is the central question that the lecture proposes should frame the task of building language models?
A. How can we build a model that perfectly mimics human conversation?
B. What is the fastest way to train a model on the entire internet?
C. What is the best model one can build given a certain compute and data budget?
D. How can we ensure a model is completely safe and unbiased before deployment?
Answer: C
Time: 11:42–11:47

Question 11

Q: Which of these is NOT an "ingredient" mentioned as falling into place during the 2010s that enabled the deep learning revolution for language models?
A. The Adam optimizer.
B. The transformer architecture.
C. The concept of reinforcement learning from human feedback (RLHF).
D. Seq-to-seq models.
Answer: C
Time: 13:21–14:00

Question 12

Q: What was the key contribution of models like ELMo, BERT, and T5?
A. They were the first models to use the transformer architecture.
B. They pioneered the idea of foundation models that could be adapted to many downstream tasks.
C. They were the first truly open-source models with both weights and data released.
D. They demonstrated emergent abilities like in-context learning.
Answer: B
Time: 14:43–14:51

Question 13

Q: The lecture describes three levels of openness for language models. What is the defining characteristic of "open weight" models?
A. The model weights are available, but details about the training data are often missing.
B. Only the model's architecture is published, not the weights or data.
C. All weights, data, and training code are fully available.
D. The model is accessible via an API, but no other details are provided.
Answer: A
Time: 16:33–16:39

Question 14

Q: In the overview of the course's five pillars, what is the goal of the "Basics" unit?
A. To learn how to use pre-trained models via APIs.
B. To get a basic version of a full model training pipeline working from scratch.
C. To understand the history and theory behind language models.
D. To master advanced prompt engineering techniques.
Answer: B
Time: 27:43–27:49

Question 15

Q: Which improvement to the original transformer architecture is a type of non-linear activation function?
A. RMSNorm
B. Rotary Positional Embeddings (RoPE)
C. SwiGLU
D. Mixture of Experts (MoE)
Answer: C
Time: 30:02–30:11

Question 16

Q: What normalization method is mentioned as a simpler alternative to the original transformer's LayerNorm?
A. BatchNorm
B. RMSNorm
C. InstanceNorm
D. GroupNorm
Answer: B
Time: 30:24–30:30

Question 17

Q: What will be the primary task in Assignment 1?
A. Fine-tuning a pre-trained model on a custom dataset.
B. Implementing a BPE tokenizer, transformer model, and training loop from scratch using PyTorch.
C. Writing a research paper on the ethics of large language models.
D. Optimizing a model's inference speed using Triton.
Answer: B
Time: 32:27–32:48

Question 18

Q: In the "Systems" part of the course, what is the main challenge related to GPU hardware?
A. The slow speed of floating point operations.
B. The high cost of data movement between memory and compute units.
C. The lack of available GPUs for academic research.
D. The difficulty of writing code in CUDA.
Answer: B
Time: 35:15–35:39

Question 19

Q: What is the purpose of using Triton in the "Systems" unit?
A. To build custom, high-performance GPU kernels for operations like fusion and tiling.
B. To automatically parallelize model training across multiple nodes.
C. To manage and schedule jobs on the H100 cluster.
D. To visualize the internal states of a running model.
Answer: A
Time: 35:54–36:00

Question 20

Q: What makes the autoregressive decoding part of inference particularly difficult to optimize?
A. It requires a massive amount of VRAM.
B. It is computationally intensive due to large matrix multiplications.
C. It is often memory-bound because tokens are generated one at a time, making it hard to saturate the GPU.
D. It can only be performed on CPUs, not GPUs.
Answer: C
Time: 38:58–39:10

Question 21

Q: What is speculative decoding?
A. A technique to guess the user's next prompt.
B. A method where a smaller, cheaper model generates multiple tokens that are then verified by the main model.
C. A way to train models on hypothetical or "speculative" data.
D. An algorithm for finding the single most likely next token.
Answer: B
Time: 39:22–39:34

Question 22

Q: What is the key question that "Scaling Laws" aim to answer?
A. How much will it cost to train the next generation of models?
B. Given a fixed compute budget, what is the optimal model size and amount of training data?
C. Which hardware is most efficient for training transformers?
D. At what point do models start to show emergent abilities?
Answer: B
Time: 41:11–41:22

Question 23

Q: The "Chinchilla optimal" scaling laws suggest a simple rule of thumb for the relationship between model size (N) and the number of tokens to train on. What is that rule?
A. Train on N * 10 tokens.
B. Train on N * 20 tokens.
C. Train on N^2 tokens.
D. Train on sqrt(N) tokens.
Answer: B
Time: 42:23–42:37

Question 24

Q: What is a primary finding from looking at raw Common Crawl data?
A. It is a highly curated and clean dataset, ideal for training.
B. It consists mostly of academic papers and books.
C. A large portion of the data is "trash" or spammy, requiring significant filtering.
D. It lacks data in languages other than English.
Answer: C
Time: 48:05–48:15

Question 25

Q: Why is deduplication of the training data an important step?
A. To reduce the total size of the dataset and save storage costs.
B. To prevent the model from overfitting and memorizing specific examples.
C. To comply with copyright laws regarding data usage.
D. To ensure the model is trained on a diverse range of topics.
Answer: B
Time: 49:55-50:00

Question 26

Q: What is the goal of the "Alignment" phase of model training?
A. To increase the model's raw intelligence and knowledge.
B. To make the model's architecture more efficient.
C. To make the model useful by teaching it to follow instructions, adhere to a specific style, and be safe.
D. To compress the model's weights for faster deployment.
Answer: C
Time: 50:43–50:50

Question 27

Q: What kind of data is used in Supervised Fine-Tuning (SFT)?
A. A large corpus of unlabeled web text.
B. Pairs of prompts and desired responses.
C. Preference data indicating which of two responses is better.
D. Data generated by the model itself.
Answer: B
Time: 51:49–51:59

Question 28

Q: What is the primary advantage of learning from feedback (like DPO) over SFT?
A. It allows the model to learn from lighter forms of annotation, like preference data, which can be cheaper to collect.
B. It is computationally less expensive than SFT.
C. It completely eliminates the need for human-generated data.
D. It is the only way to teach a model safety and refusal skills.
Answer: A
Time: 53:04–53:13

Question 29

Q: What type of data does the DPO (Direct Preference Optimization) algorithm use?
A. User-assistant dialogue turns.
B. Text with quality scores assigned by a verifier.
C. Pairs of responses where one is labeled as better than the other.
D. A dataset of harmful prompts to teach refusal.
Answer: C
Time: 53:20–54:37

Question 30

Q: What is the core function of a tokenizer in a language model pipeline?
A. To translate text from one language to another.
B. To correct grammatical errors in the input string.
C. To convert raw text strings into sequences of integers (tokens) and back.
D. To filter out harmful or irrelevant content from the input.
Answer: C
Time: 1:00:49–1:01:12

Question 31

Q: What is a significant drawback of using simple character-based tokenization with Unicode code points?
A. It cannot handle emojis or special characters.
B. The sequence length becomes excessively long.
C. The vocabulary size becomes very large, and it's an inefficient use of the vocabulary for rare characters.
D. The encoding is not reversible, leading to data loss.
Answer: C
Time: 1:06:12–1:06:49

Question 32

Q: What is the main problem with pure byte-based tokenization?
A. The vocabulary size is too large (over 65,000).
B. It results in very long token sequences, which is inefficient for models with quadratic attention complexity.
C. It cannot represent all characters in the UTF-8 standard.
D. It is computationally expensive to convert strings to bytes.
Answer: B
Time: 1:08:20–1:08:47

Question 33

Q: What is a major issue with traditional word-based tokenization that BPE aims to solve?
A. It splits words into too many sub-word units.
B. It cannot handle punctuation or spaces.
C. It produces an unbounded vocabulary and struggles with rare or unseen words (out-of-vocabulary problem).
D. It is not adaptive to the statistics of the training corpus.
Answer: C
Time: 1:10:04–1:10:39

Question 34

Q: The Byte Pair Encoding (BPE) algorithm was first introduced to NLP for what task?
A. Text classification.
B. Language modeling.
C. Named entity recognition.
D. Neural machine translation.
Answer: D
Time: 1:11:16–1:11:22

Question 35

Q: What is the fundamental principle of the BPE algorithm?
A. It splits words based on a fixed set of grammatical rules.
B. It learns to merge the most frequently occurring adjacent pair of tokens iteratively.
C. It assigns a unique token to every word found in the training corpus.
D. It breaks down all text into individual bytes.
Answer: B
Time: 1:12:49–1:12:54

Question 36

Q: In the BPE training process, what is the initial state of the text sequence?
A. It is a sequence of words separated by spaces.
B. It is a sequence of Unicode characters.
C. It is a sequence of bytes.
D. It is a sequence of pre-defined subword units.
Answer: C
Time: 1:12:43–1:12:49

Question 37

Q: As the BPE algorithm performs merges, what happens to the length of the token sequence representing the training text?
A. It increases.
B. It stays the same.
C. It decreases.
D. It fluctuates unpredictably.
Answer: C
Time: 1:15:46–1:15:46

Question 38

Q: When using a trained BPE tokenizer to encode a new string, what is the process?
A. The string is first broken into words, and each word is looked up in the vocabulary.
B. The string is converted to bytes, and then the learned merge operations are replayed in the same order they were learned.
C. The string is compared against the entire training corpus to find the closest match.
D. The BPE algorithm is re-run from scratch on the new string.
Answer: B
Time: 1:16:44–1:16:51

Question 39

Q: The lecture mentions a "compression ratio" for tokenizers. What does this ratio represent?
A. The number of tokens divided by the number of words.
B. The number of bytes in the original string divided by the number of tokens generated.
C. The size of the model vocabulary divided by the size of the training data.
D. The time it takes to encode versus decode a string.
Answer: B
Time: 1:04:40–1:04:48

Question 40

Q: The GPT-2 tokenizer uses a pre-tokenization step before applying BPE. What does this step do?
A. It converts all text to lowercase.
B. It removes all punctuation.
C. It uses a regular expression to split the string into segments, and BPE is run on each segment.
D. It translates the text into a standardized byte format.
Answer: C
Time: 1:12:34–1:12:43

Question 41

Q: What is the current status of "tokenizer-free" approaches that operate directly on raw bytes?
A. They are the new standard for all frontier models.
B. They have been shown to be more compute-efficient than BPE.
C. The work is promising, but so far has not been successfully scaled to frontier models.
D. They have been proven to be fundamentally flawed and are no longer an active area of research.
Answer: C
Time: 28:43–28:56

Question 42

Q: The lecture mentions that if you have a lot of data but are compute-constrained, you might filter data aggressively. Why?
A. To reduce data storage costs.
B. To avoid legal issues with copyrighted data.
C. To avoid wasting precious compute on bad or irrelevant data.
D. To make the model smaller and faster for inference.
Answer: C
Time: 56:43–56:49

Question 43

Q: Which optimizer is mentioned as the one predominantly used and taught in the class?
A. AdamW
B. SGD
C. Muon
D. SOAP
Answer: A
Time: 31:42–31:48

Question 44

Q: What is the main reason that training is typically done for only a single epoch in a compute-constrained regime?
A. To prevent the model from overfitting to the training data.
B. Multiple epochs provide diminishing returns and it's more efficient to see more unique data.
C. The hardware cannot handle reloading the dataset for a second epoch.
D. It is a convention set by the original transformer paper.
Answer: B
Time: 57:11–57:18

Question 45

Q: In the GPU analogy, what do the "factory" and the "warehouse" represent?
A. Factory: CPU, Warehouse: GPU
B. Factory: Compute units, Warehouse: Memory (DRAM)
C. Factory: The entire GPU, Warehouse: The network connection
D. Factory: The software, Warehouse: The hardware
Answer: B
Time: 35:15–35:15

Question 46

Q: What distinguishes the "pre-fill" phase from the "decode" phase in inference?
A. Pre-fill is memory-bound, while decode is compute-bound.
B. Pre-fill processes the prompt tokens in parallel, while decode generates tokens one by one.
C. Pre-fill happens during training, while decode happens during deployment.
D. Pre-fill uses a small model, while decode uses a large model.
Answer: B
Time: 38:29–38:41

Question 47

Q: What kind of supervision can be used in domains like math or code where formal verification is possible?
A. Preference data from human labelers.
B. Using a formal verifier to check the correctness of a generated response.
C. Instruction-following data from online tutorials.
D. Self-generated data from the model itself.
Answer: B
Time: 53:50–53:56

Question 48

Q: Which alternative to the transformer, mentioned as a more radical architectural change, is based on state space models?
A. GQA (Grouped-Query Attention)
B. Mixture of Experts (MoE)
C. Hyena
D. SwiGLU
Answer: C
Time: 31:17–31:17

Question 49

Q: Why is having a good base model crucial before the alignment phase?
A. Alignment cannot add new knowledge; it can only modify a model that already has raw potential.
B. A good base model is smaller and cheaper to align.
C. The alignment algorithms like DPO only work on models trained on web-scale data.
D. The base model determines the final vocabulary size.
Answer: A
Time: 50:36–52:12

Question 50

Q: By convention, where is the space character typically placed by tokenizers like BPE?
A. It is discarded during tokenization.
B. It is appended to the end of a token.
C. It is converted into a special <SPACE> token.
D. It is prepended to the beginning of the following token.
Answer: D
Time: 1:02:19–1:02:19 
