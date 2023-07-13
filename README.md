# Security-AI-Project
 
This is an LLM application based on privateGPT. You can find more information about privateGPT here: [ privateGPT](https://github.com/imartinez/privateGPT). It is primarily designed to operate over a local network, where all data is kept locally on that network. It is 100% private and no data is logged or leaves the local network.

# Setup
There are two main portions that need to be configured and set up. The web interface and the backend that runs the LLM.

## Backend-CPU Support
First, install the necessary requirements using pip.
```shell
pip3 install -r requirements.txt
```
This will install all the requirements to run a GPT4ALL model on the CPU. 
Next, download an LLM of your choice. This is the default model that privateGPT uses: [ggml-gpt4all-j-v1.3-groovy.bin](https://gpt4all.io/models/ggml-gpt4all-j-v1.3-groovy.bin)  
You can also use any GPT4ALL-J compatible model.

Rename the "EnviromentVariable.env" to ".env" and reference the path to your model.
```
MODEL_TYPE: supports LlamaCpp or GPT4All
PERSIST_DIRECTORY: is the folder you want your vectorstore in
MODEL_PATH: Path to your GPT4All or LlamaCpp-supported LLM
MODEL_N_CTX: Maximum token limit for the LLM model
EMBEDDINGS_MODEL_NAME: SentenceTransformers embeddings model name (see https://www.sbert.net/docs/pretrained_models.html)
TARGET_SOURCE_CHUNKS: The number of chunks (sources) that will be used to answer a question
```
The first time the model is run it will need to download the embeddings model from the internet.

This repo uses the State of the Union address and Stephen E. Lucas' The Art Of Public Speaking textbook as source documents. You can put any file with the following extensions in the source_documents folder.
- `.csv`: CSV,
- `.docx`: Word Document,
- `.doc`: Word Document,
- `.enex`: EverNote,
- `.eml`: Email,
- `.epub`: EPub,
- `.html`: HTML File,
- `.md`: Markdown,
- `.msg`: Outlook Message,
- `.odt`: Open Document Text,
- `.pdf`: Portable Document Format (PDF),
- `.pptx`: PowerPoint Document,
- `.ppt`: PowerPoint Document,
- `.txt`: Text file (UTF-8),

Then after the source documents are in the folder, run this command in the terminal:
```shell
python ingest.py
```
This will create a folder called db with the vectorstore. This process can take 30 seconds per document, depending on document sise and type. Each time the ingest script is run it adds any new soruce files to the vectorstore. To start from an empty data set just delete the db folder.

At this poing the model is fully configured but, before you can use the model you need to configure the API host address. This repo sets the API host to 0.0.0.0, so it will be accessable on the machine network IP and its local host. This API is not designed to be exposed to the greater internet. Doing so is a security risk.

## Backend-GPU Support
This is much more complicated to set up than the GPT4ALL models, but yeilds better responces and runs faster.

You need to configure LlammaCpp-python for GPU acceleration.
This varys depending on the install envirment and the OS. For more information go to: [LlammaCpp-python] (https://github.com/abetlen/llama-cpp-python) or [LlammaCpp](https://github.com/ggerganov/llama.cpp).
Here is a general overview 

First, install the necessary requirements using pip.
```shell
pip3 install -r requirements.txt
```
Then install cMake: [cMake](


