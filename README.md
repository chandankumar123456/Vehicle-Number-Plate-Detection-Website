# Vehicle Number Plate Detection

## Description

This project is a Flask web application that performs vehicle number plate detection using YOLO (You Only Look Once) models. The application allows users to stream live video for real-time number plate detection.

## Features

- Stream live video for vehicle number plate detection.
- Display detected number plates on the web interface.
- Responsive design with separate CSS files for home and index pages.

## Tech Stack

- **Backend**: Flask
- **Machine Learning**: YOLOv7
- **Frontend**: HTML, CSS, JavaScript
- **Deployment**: Render.com

## Requirements

- Python 3.6 or higher
- Flask
- OpenCV
- NumPy
- YOLOv7 (and their dependencies)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/chandankumar123456/Vehicle-Number-Plate-Detection.git
   cd vehicle-number-plate-detection
   ```

2. **Set up a virtual environment** (optional but recommended):

   ```bash
   python -m venv venv
   venv/Scripts/activate  
   ```

3. **Install dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**:

   ```bash
   python app.py
   ```

5. **Access the application**: Open your browser and navigate to `http://127.0.0.1:5000`.

## Usage

- **Home Page**: Upload an image of a vehicle to detect the number plate.
- **Index Page**: Access the application functionalities and view the results.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any improvements or suggestions.

## Acknowledgments

- [YOLO](https://github.com/WongKinYiu/yolov7) for object detection.
- Flask for providing a robust web framework.
