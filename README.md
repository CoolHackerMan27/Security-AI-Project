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
This will create a folder called db with the vectorstore. This process can take 30 seconds per document, depending on the document size and type. Each time the ingest script is run it adds any new source files to the vectorstore. To start from an empty data set just delete the db folder.

At this point the model is fully configured but, before you can use the model you need to configure the API host address. This repo sets the API host to 0.0.0.0, which will be accessible on the machine's network IP and its local host. This API is not designed to be exposed to the greater internet. Doing so is a security risk.

## Backend-GPU Support
This is much more complicated to set up than the GPT4ALL models, but yields better responses and runs faster.

You need to configure LlammaCpp-python for GPU acceleration.
This varies depending on the install environment and the OS. For more information go to: [LlammaCpp-python] (https://github.com/abetlen/llama-cpp-python) or [LlammaCpp](https://github.com/ggerganov/llama.cpp).
Here is a general overview 

First, install the necessary requirements using pip.
```shell
pip3 install -r requirements.txt
```
Then install cMake: [cMake] (https://cmake.org/download/)

Once cMake is installed the correct environment variables must be set:
#### Nivida
- ``set CMAKE_ARGS="-DLLAMA_CUBLAS=on"``: Tells cMake to build LlammaCpp wheel with Cuda acceleration.
- ``set FORCE_CMAKE=1``
#### AMD (Only on Linux)
- ``set CMAKE_ARGS="-DLLAMA_CLBLAS=on"``: Tells cMake to build LlammaCpp wheel with CLBlas acceleration.
- ``apt install libclblast-dev``: Installs CLBLas
- ``set FORCE_CMAKE=1``
Then the required drivers should be installed:
#### Nvidia
-Latest NVidia drivers.-- https://www.nvidia.com/drivers
- CUDA 12.1-- https://developer.nvidia.com/cuda-downloads?target_os=Windows&target_arch=x86_64&target_version=10&target_type=exe_local
- CUDA 11.8-- https://developer.nvidia.com/cuda-downloads?target_os=Windows&target_arch=x86_64&target_version=10&target_type=exe_local
- cuDNN 8.9.1 for CUDA 11.8-- https://developer.nvidia.com/rdp/cudnn-download
- x64 C++ Redistributable.-- https://support.microsoft.com/en-us/topic/the-latest-supported-visual-c-downloads-2647da03-1eea-4433-9aff-95f26a218cc0
- x86 C++ Redistributable.-- https://support.microsoft.com/en-us/topic/the-latest-supported-visual-c-downloads-2647da03-1eea-4433-9aff-95f26a218cc0
