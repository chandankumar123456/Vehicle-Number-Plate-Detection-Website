const video = document.getElementById('video');
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');

        // Access the camera
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                video.srcObject = stream;
                startPredicting(); // Start predicting when the video starts
            })
            .catch((error) => {
                console.error("Error accessing the camera: ", error);
            });

        function startPredicting() {
            setInterval(captureFrame, 2000); // Capture frame every 2 seconds
        }

        async function captureFrame() {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
        
            context.drawImage(video, 0, 0);
        
            canvas.toBlob(async (blob) => {
                const formData = new FormData();
                formData.append('frame', blob, 'frame.jpg');
        
                const response = await fetch('http://localhost:5000/predict', {
                    method: 'POST',
                    body: formData
                });
        
                if (response.ok) {
                    const imageBlob = await response.blob();
                    const imageUrl = URL.createObjectURL(imageBlob);
        
                    const resultImage = document.createElement('img');
                    resultImage.src = imageUrl;
                    resultImage.width = 640; // Set the desired width
                    resultImage.height = 480; // Set the desired height
        
                    document.getElementById('result').innerHTML = ''; // Clear previous results
                    document.getElementById('result').appendChild(resultImage); // Show the predicted image
        
                    console.log('Prediction image displayed'); // Log when image is displayed
                } else {
                    const error = await response.json();
                    document.getElementById('result').textContent = JSON.stringify(error, null, 2);
                    console.error('Error response:', error); // Log the error response
                }
            }, 'image/jpeg');
        }
        
        // async function captureFrame() {
        //     canvas.width = video.videoWidth;
        //     canvas.height = video.videoHeight;
        
        //     context.drawImage(video, 0, 0);
        
        //     // Convert the canvas to a Blob
        //     canvas.toBlob(async (blob) => {
        //         const formData = new FormData();
        //         formData.append('frame', blob, 'frame.jpg');
        
        //         const response = await fetch('http://localhost:5000/predict', {
        //             method: 'POST',
        //             body: formData
        //         });
        
        //         if (response.ok) {
        //             const data = await response.json(); // Get the response as JSON
        
        //             // Display the predicted image using the base64 URL
        //             const resultImage = document.createElement('img');
        //             resultImage.src = data.image_url; // Use the base64 URL
        //             resultImage.width = 640; // Set the desired width
        //             resultImage.height = 480; // Set the desired height
        //             document.getElementById('result').innerHTML = ''; // Clear previous results
        //             document.getElementById('result').appendChild(resultImage); // Show the predicted image
        
        //             // Display extracted text
        //             const extractedText = data.extracted_text.join(', '); // Join the extracted texts
        //             const textDiv = document.createElement('div');
        //             textDiv.textContent = `Extracted Text: ${extractedText}`;
        //             document.getElementById('result').appendChild(textDiv); // Show the extracted text
        //         } else {
        //             const error = await response.json();
        //             document.getElementById('result').textContent = JSON.stringify(error, null, 2);
        //         }
        //     }, 'image/jpeg');
        // }
        
        