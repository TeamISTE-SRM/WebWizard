from transformers import AutoTokenizer
import transformers 
import torch
import re

from flask import Flask, request, jsonify
app = Flask(__name__)

model = "TinyLlama/TinyLlama-1.1B-Chat-v0.4"
tokenizer = AutoTokenizer.from_pretrained(model)
pipeline = transformers.pipeline(
    "text-generation",
    model=model,
    torch_dtype=torch.float16,
    device_map="auto",
)

CHAT_EOS_TOKEN_ID = 32002
regex = re.compile('[^a-zA-Z]')

def generate_text(prompt):
    prompt = prompt
    
    formatted_prompt = (
        f"<|im_start|>user\n{prompt} respond in one liner<|im_end|>\n<|im_start|>assistant\n"
    )


    sequences = pipeline(
        formatted_prompt,
        do_sample=True,
        top_k=50,
        top_p = 0.9,
        num_return_sequences=1,
        repetition_penalty=1.1,
        max_new_tokens=1024,
        eos_token_id=CHAT_EOS_TOKEN_ID,
    )
    result = ""
    for seq in sequences:
        result = seq['generated_text'].split('assistant')[1]
        regex.sub('', result)
        print(f"Result: {result}")
    return result



@app.route('/generate_response', methods=['POST'])
def generate_response():
    try:
        # Get the prompt from the request
        prompt = request.json['prompt']
        generated_words = generate_text(prompt)
        
        return jsonify({'response': generated_words}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)