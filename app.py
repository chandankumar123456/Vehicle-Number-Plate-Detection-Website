from flask import Flask, request, jsonify, render_template, send_file
import torch
import cv2
import numpy as np
from PIL import Image
import io
import base64

import os
from dotenv import load_dotenv

load_dotenv()
# Initialize Flask app
app = Flask(__name__)

# Load YOLOv7 model (use your path to best.pt)
# model_path = r"best.pt"
model_path = os.getenv('MODEL_PATH', './yolov7/best.pt')
model = torch.hub.load('WongKinYiu/yolov7', 'custom', model_path, force_reload=True)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/predict')
def predict_page():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if 'frame' not in request.files:
        return jsonify({'error': 'No frame uploaded'}), 400

    # Read the uploaded frame
    file = request.files['frame']
    image = Image.open(file.stream)

    # Perform inference
    results = model(image)
    predictions = results.pandas().xyxy[0]

    # Draw bounding boxes on the image
    img = np.array(image)
    extracted_text = []
    for _, row in predictions.iterrows():
        # Get bounding box coordinates
        x1, y1, x2, y2 = int(row['xmin']), int(row['ymin']), int(row['xmax']), int(row['ymax'])
        # Draw a rectangle on the image
        cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)  # Green box


        # # Using pytesseract to extract text
        # number_plate_img = img[y1:y2, x1:x2]
        
        # # Convert the cropped image to PIL format for pytesseract
        # pil_img = Image.fromarray(number_plate_img)

        # # Use pytesseract to extract text
        # text = pytesseract.image_to_string(pil_img)
        # extracted_text.append(text.strip())

    # Convert the image with bounding boxes back to PIL format
    img_with_boxes = Image.fromarray(img)

    # Save to a BytesIO object
    img_io = io.BytesIO()
    img_with_boxes.save(img_io, 'JPEG')
    img_io.seek(0)

    return send_file(img_io, mimetype='image/jpeg')
    # return jsonify({
    #     'image': send_file(img_io, mimetype='image/jpeg'),
    #     'extracted_text': extracted_text  # Return the list of extracted texts
    # })


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000)) 
    app.run(host='0.0.0.0', port=port, debug=True)
