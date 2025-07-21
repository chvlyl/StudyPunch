Question 1

Q: According to the instructors, what is the primary motivation for creating the CS 336 course?
A. To make all lectures available on YouTube for global access.
B. To provide students with foundational understanding of prompting proprietary models.
C. To enable fundamental research by teaching how to build language models from scratch, addressing a "crisis" where researchers are disconnected from the technology.
D. To offer a less work-intensive alternative to other advanced CS courses.
答案: C
时间定位: 2:25-3:50

Question 2

Q: Why does the course focus on building small language models instead of frontier models like GPT-4?
A. Because the instructors believe small models are more representative of modern AI.
B. Because frontier models are extremely expensive to train and their architectural and data details are kept secret.
C. Because small models exhibit more interesting emergent behaviors than large ones.
D. Because the university's compute cluster only supports small model training.
答案: B
时间定位: 4:55-5:14

Question 3

Q: What concept is illustrated by the phenomenon where a model's accuracy on a task remains flat for a while and then suddenly improves after a certain amount of training scale is reached?
A. Scaling mindset
B. Leaky abstractions
C. Emergent behavior
D. Divine benevolence
答案: C
时间定位: 6:20-6:45

Question 4

Q: The course aims to teach three types of knowledge. Which of the following can only be *partially* taught, according to the lecture, because it doesn't always scale from small to large models?
A. The mechanics of how things work, like implementing a transformer.
B. The mindset of taking scaling seriously and maximizing hardware efficiency.
C. The intuitions about which specific data and modeling decisions lead to the best-performing models.
D. The history of how language models have evolved.
答案: C
时间定位: 8:12-8:31

Question 5

Q: What is the correct interpretation of Rich Sutton's "bitter lesson" as explained in the lecture?
A. Scale is the only thing that matters, and algorithm design is irrelevant.
B. Researchers should focus only on improving hardware efficiency.
C. Algorithms that leverage computation at scale are what truly matter for long-term progress.
D. The most efficient algorithms are always the most complex ones.
答案: C
时间定位: 9:32-9:52

Question 6

Q: According to the lecture, which of these was NOT mentioned as a key ingredient from the 2010s that led to the modern language model revolution?
A. Sequence-to-sequence (seq-to-seq) models.
B. The Adam optimizer.
C. Large-scale N-gram models trained on over two trillion tokens.
D. The attention mechanism and the "Attention Is All You Need" paper.
答案: C
时间定位: 12:48-13:08

Question 7

Q: What is the key distinction between an "open weight" model and a true "open source" model according to the lecture?
A. Open weight models are only accessible via a paid API.
B. Open source models make both the model weights and the full training data available, whereas open weight models only release the weights.
C. Open weight models are developed by companies like Meta, while open source models are from academic institutions.
D. Open source models are generally smaller in scale than open weight models.
答案: B
时间定位: 16:28-16:48

Question 8

Q: What is the recommended strategy for working on the course assignments to ensure correctness and efficient use of resources?
A. Run all experiments directly on the shared cluster to get results faster.
B. Use AI tools like Copilot or Cursor to generate the majority of the code.
C. Implement and test for correctness on small examples locally on a laptop before using the cluster for large-scale benchmarking.
D. Wait until just before the deadline to use the cluster when it is less crowded.
答案: C
时间定位: 24:13-24:49

Question 9

Q: In Assignment 1 (Basics), what will students be required to implement from scratch?
A. The PyTorch deep learning framework.
B. A Byte Pair Encoding (BPE) tokenizer, a transformer model architecture, and the AdamW optimizer.
C. A web crawler to collect the TinyStories dataset from the internet.
D. The low-level CUDA kernels for all GPU operations.
答案: B
时间定位: 32:27-32:48

Question 10

Q: What is the primary bottleneck that low-level optimization techniques like kernel fusion and tiling aim to minimize in GPU computation?
A. The number of floating point operations (FLOPs).
B. The cost of data movement between the GPU's high-bandwidth memory (HBM) and its on-chip compute units.
C. The power consumption of the GPU chip during training.
D. The time it takes to compile the CUDA code for the GPU.
答案: B
时间定位: 35:24-35:39

Question 11

Q: Why is the autoregressive decoding phase of inference often described as being "memory-bound"?
A. Because it requires loading the entire model into the fast L1 cache.
B. Because it generates one token at a time, which makes it difficult to saturate the GPU's compute units and leads to being limited by memory access speed.
C. Because the key-value cache for past tokens grows to exceed the available High Bandwidth Memory (HBM).
D. Because speculative decoding requires two complete models to be stored in memory simultaneously.
答案: B
时间定位: 38:58-39:10

Question 12

Q: What fundamental question do the "Chinchilla scaling laws" help to answer?
A. Which GPU architecture is the most efficient for training language models.
B. For a given compute budget, what is the optimal trade-off between model size and the amount of training data?
C. Which optimizer (e.g., AdamW, SOAP) is superior for training at large scale.
D. What is the maximum possible accuracy a model can achieve on a benchmark like MMLU.
答案: B
时间定位: 41:11-41:34

Question 13

Q: According to the Chinchilla scaling laws, what is the simple rule of thumb for the relationship between model size (N) and the number of training tokens?
A. You should train on approximately N * 10 tokens.
B. You should train on approximately N * 20 tokens.
C. You should train on approximately N * 50 tokens.
D. You should train on approximately N * 100 tokens.
答案: B
时间定位: 42:23-42:37

Question 14

Q: Why is the statement "we're training the model on the internet" a misleading simplification?
A. Because the internet contains mostly copyrighted data that cannot be legally used for training.
B. Because high-quality training data must be actively acquired, filtered, de-duplicated, and curated from raw sources like Common Crawl, which is a non-trivial process.
C. Because most of the internet is in HTML format, which transformer models cannot directly process.
D. Because the internet does not contain enough unique text to train modern frontier models.
答案: B
时间定位: 46:50-47:16

Question 15

Q: What is the main purpose of the "alignment" process in creating a useful language model?
A. To increase the model's raw knowledge and potential by training on more data.
B. To adapt a pre-trained base model to make it useful, safe, and capable of following instructions in a specific style.
C. To pre-train the model on a massive dataset before any fine-tuning occurs.
D. To compress the model's size significantly without losing its performance capabilities.
答案: B
时间定位: 50:43-51:43

Question 16

Q: What is a key difference between Supervised Fine-Tuning (SFT) and alignment methods like Direct Preference Optimization (DPO)?
A. SFT is an unsupervised process, while DPO is a supervised process.
B. SFT requires high-quality, human-written prompt-response pairs, while DPO can learn from a lighter signal like a preference for one response over another.
C. SFT is only used for base models, while DPO is exclusively used for instruction-following models.
D. SFT is computationally cheaper than pre-training, but DPO is more expensive.
答案: B
时间定位: 51:43-54:37

Question 17

Q: The lecture explains that design decisions depend on the resource regime. In a future "data-constrained" regime, what current practice might no longer make sense?
A. Using tokenization to compress text.
B. The common strategy of training for only a single epoch over the dataset.
C. Using model parallelism techniques like FSDP.
D. Using smaller vocabulary sizes to improve efficiency.
答案: B
时间定位: 58:09-58:33

Question 18

Q: What is the fundamental purpose of a tokenizer in the language model pipeline?
A. To compress the raw text to save disk space during training.
B. To correct spelling and grammar mistakes in the input text.
C. To convert raw text (strings) into a sequence of integers (tokens) that the model can process and to convert them back.
D. To remove all punctuation and special characters from the input data.
答案: C
时间定位: 1:00:49-1:01:12

Question 19

Q: What is a major drawback of using simple byte-based tokenization for language models?
A. The vocabulary size is excessively large, containing over 100,000 tokens.
B. It is unable to handle many common Unicode characters correctly.
C. It results in very long sequences (compression ratio of 1.0), which is highly inefficient for models with quadratic attention complexity.
D. The encoding process is not reversible, so tokens cannot be decoded back to the original string.
答案: C
时间定位: 1:08:20-1:08:54

Question 20

Q: What is the primary issue with traditional word-based tokenization that subword algorithms like BPE were introduced to solve?
A. It produces sequences that are too short for the model to effectively learn from.
B. It is incapable of handling words that contain numbers or hyphens.
C. It struggles with out-of-vocabulary words (e.g., rare words, misspellings, new terms), often mapping them all to a single generic "UNK" token.
D. The vocabulary size is too small, which severely limits the model's expressiveness.
答案: C
时间定位: 1:10:04-1:10:39

Question 21

Q: What is the core iterative operation of the Byte Pair Encoding (BPE) training algorithm?
A. Splitting the rarest words in the corpus into individual character-level tokens.
B. Using a complex regular expression to split text into words and subwords.
C. Finding the most frequently occurring pair of adjacent tokens in the corpus and merging them into a new, single token.
D. Mapping each unique character in the training data to a unique integer ID based on its frequency.
答案: C
时间定位: 1:12:43-1:13:02

Question 22

Q: In the GPT-2 implementation of BPE, what pre-processing step is applied to the raw text before running the BPE merge algorithm?
A. The entire text is converted to lowercase to reduce vocabulary size.
B. The text is first broken up into initial segments using a regular-expression-based word tokenizer.
C. All numbers in the text are replaced with a special `<NUM>` token.
D. The text is normalized from Unicode into a pure ASCII representation.
答案: B
时间定位: 1:12:29-1:12:43

Question 23

Q: Who does the lecture credit with pioneering the "scaling mindset" that led to breakthrough models like GPT-2 and GPT-3?
A. Google
B. DeepMind
C. Meta
D. OpenAI
答案: D
时间定位: 7:54-8:06

Question 24

Q: In the context of model inference, what is speculative decoding?
A. A technique to run inference on multiple GPUs in parallel to increase throughput.
B. A method where a smaller, faster model generates "draft" tokens that are then checked and accepted in parallel by the larger, more powerful model.
C. A way to decode text by only looking at the most probable token at each step.
D. An algorithm for finding the optimal hyperparameters for an inference server.
答案: B
时间定位: 39:16-39:42

Question 25

Q: What is a key reason that having a good evaluation set and methodology is crucial for data curation?
A. Evaluation is needed to determine the optimal batch size for training.
B. It provides a way to measure whether data filtering and mixing decisions are actually improving model quality.
C. A good evaluation set is required to compile the Triton kernels for inference.
D. The evaluation score is used directly in the loss function during alignment.
答案: B
时间定位: 45:57-46:03

Question 26

Q: What is the role of a "verifier" in the context of learning from feedback?
A. It is a person who manually writes correct responses for supervised fine-tuning.
B. It is a program or model that can automatically rate the quality or correctness of a generated response, especially in domains like math or code.
C. It is a type of optimizer used during the DPO phase of training.
D. It is the unit test suite provided with the course assignments to check for correctness.
答案: B
时间定位: 53:50-54:07

Question 27

Q: What is the final output of the BPE training algorithm?
A. A sequence of integers representing the compressed training corpus.
B. A vocabulary of tokens and a list of learned merges that can be applied to new text.
C. A trained neural network that performs tokenization.
D. A Python script for encoding and decoding text.
答案: B
时间定位: 1:13:27-1:13:46

Question 28

Q: What is a major advantage of byte-based tokenization, despite its flaws?
A. It has a very high compression ratio.
B. It is the most computationally efficient method for long sequences.
C. It has a very small, fixed vocabulary size (256 tokens) and can represent any string without out-of-vocabulary issues.
D. It learns the statistical properties of the language it is trained on.
答案: C
时间定位: 1:07:56-1:08:09

Question 29

Q: The course assignments are designed without providing scaffolding code. What is the stated pedagogical reason for this?
A. To make the assignments more difficult and time-consuming.
B. To force students to make their own software design decisions and learn how to organize their code.
C. To prevent students from using AI code assistants.
D. To ensure all student submissions are completely unique.
答案: B
时间定位: 23:25-24:06

Question 30

Q: What does the term "compression ratio" refer to in the context of tokenization?
A. The ratio of the model size in parameters to the vocabulary size.
B. The time it takes to tokenize a text divided by the time it takes to train on it.
C. The number of bytes in the original string divided by the number of tokens it is converted into.
D. The percentage of the vocabulary that is used to tokenize an average document.
答案: C
时间定位: 1:04:40-1:04:48 
