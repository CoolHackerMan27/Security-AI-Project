# Security-AI-Project
 
This is an LLM application based on privateGPT. It is primarily designed to operate over a local network, where all data is kept locally on that network. It is 100% private and no data is logged or leaves the local network.

# Setup
There are two main portions that need to be configured and set up. The web interface and the backend that runs the LLM.

## Backend
First, install the necessary requirements using pip.
```shell
pip3 install -r requirements.txt
```
This will install all the requirements to run a GPT4ALL model on the CPU. 
Next, download a LLM of your choice. This is the default model that privateGPT uses: [ggml-gpt4all-j-v1.3-groovy.bin](https://gpt4all.io/models/ggml-gpt4all-j-v1.3-groovy.bin)  
You can also use any GPT4ALL-J compatible model.

Rename the 
