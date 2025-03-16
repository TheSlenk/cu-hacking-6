from flask import Flask, Response, jsonify
from flask_cors import CORS  # Import CORS
import cv2
import mediapipe as mp

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Initialize MediaPipe Face Mesh
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(min_detection_confidence=0.5, min_tracking_confidence=0.5)

# Open webcam
cap = cv2.VideoCapture(0)

# Threshold to determine turning head
THRESHOLD = 30  # Adjust this if needed

def generate_frames():
    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # Flip the frame horizontally
        frame = cv2.flip(frame, 1)

        # Convert BGR to RGB (MediaPipe requires RGB format)
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = face_mesh.process(rgb_frame)

        face_direction_status = "Looking Straight"  # Default status
        
        if results.multi_face_landmarks:
            for face_landmarks in results.multi_face_landmarks:
                # Get key face points
                h, w, _ = frame.shape
                nose_tip = face_landmarks.landmark[1]  # Nose tip
                left_cheek = face_landmarks.landmark[234]  # Left cheek
                right_cheek = face_landmarks.landmark[454]  # Right cheek

                # Convert to pixel coordinates
                nose_x = int(nose_tip.x * w)
                left_x = int(left_cheek.x * w)
                right_x = int(right_cheek.x * w)

                # Calculate midpoint
                face_midpoint_x = (left_x + right_x) // 2

                # Determine face direction
                if nose_x < face_midpoint_x - THRESHOLD:
                    face_direction_status = "Looking Left"
                elif nose_x > face_midpoint_x + THRESHOLD:
                    face_direction_status = "Looking Right"
                else:
                    face_direction_status = "Looking Straight"

                # Draw landmarks and connections
                for landmark in face_landmarks.landmark:
                    # Convert landmarks to pixel coordinates
                    x = int(landmark.x * w)
                    y = int(landmark.y * h)

                    # Draw a small circle for each landmark
                    cv2.circle(frame, (x, y), 1, (0, 255, 0), -1)

                # Draw connections between landmarks (e.g., eyes, eyebrows, etc.)
                connections = [
                    # Jawline (landmarks 0 to 16)
                    (0, 1), (1, 2), (2, 3), (3, 4), (4, 5), (5, 6), (6, 7), 
                    (7, 8), (8, 9), (9, 10), (10, 11), (11, 12), (12, 13), 
                    (13, 14), (14, 15), (15, 16),
                    
                    # Eyebrows (landmarks 17 to 26)
                    # (17, 18), (18, 19), (19, 20), (20, 21), (21, 22), 
                    # (22, 23), (23, 24), (24, 25), (25, 26),
                    
                    # Left eye (landmarks 33 to 133)
                    (33, 133), (133, 160), (160, 159), (159, 158), (158, 157), 
                    (157, 173), (173, 133), (133, 7), (7, 163), (163, 144), 
                    (144, 145), (145, 153), (153, 154), (154, 155), (155, 133),
                    
                    # Right eye (landmarks 362 to 263)
                    (362, 398), (398, 384), (384, 385), (385, 386), (386, 387), 
                    (387, 388), (388, 466), (466, 263), (263, 249), (249, 390), 
                    (390, 373), (373, 374), (374, 380), (380, 381), (381, 382), 
                    (382, 362),
                    
                    # Nose (landmarks 1 to 5)
                    (1, 2), (2, 3), (3, 4), (4, 5),
                    
                    # Mouth (landmarks 61 to 291)
                    (61, 146), (146, 91), (91, 181), (181, 84), (84, 17), 
                    (17, 314), (314, 405), (405, 321), (321, 375), (375, 291),
                    
                    # Inner mouth (landmarks 78 to 308)
                    # (78, 95), (95, 88), (88, 178), (178, 87), (87, 14), 
                    # (14, 317), (317, 402), (402, 318), (318, 324), (324, 308)
                ]

                # Draw the lines between landmarks based on defined connections
                for start, end in connections:
                    start_point = face_landmarks.landmark[start]
                    end_point = face_landmarks.landmark[end]

                    # Convert to pixel coordinates
                    start_x, start_y = int(start_point.x * w), int(start_point.y * h)
                    end_x, end_y = int(end_point.x * w), int(end_point.y * h)

                    # Draw the line
                    cv2.line(frame, (start_x, start_y), (end_x, end_y), (0, 255, 0), 2)

        # Add status to the frame
        # cv2.putText(frame, face_direction_status, (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

        # Encode the frame to JPEG
        ret, buffer = cv2.imencode('.jpg', frame)
        if not ret:
            continue
        frame = buffer.tobytes()

        # Yield the frame in a proper MJPEG format
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')


@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), 
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/face-status', methods=['GET'])
def get_face_status():
    # Capture frame from webcam
    ret, frame = cap.read()
    if not ret:
        return jsonify({'error': 'Failed to capture frame'}), 500

    # Flip the frame horizontally
    frame = cv2.flip(frame, 1)

    # Convert BGR to RGB (MediaPipe requires RGB format)
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = face_mesh.process(rgb_frame)

    face_direction_status = "Looking Straight"  # Default status
    
    if results.multi_face_landmarks:
        for face_landmarks in results.multi_face_landmarks:
            # Get key face points
            h, w, _ = frame.shape
            nose_tip = face_landmarks.landmark[4]  # Nose tip
            left_cheek = face_landmarks.landmark[234]  # Left cheek
            right_cheek = face_landmarks.landmark[454]  # Right cheek

            # Convert to pixel coordinates
            nose_x = int(nose_tip.x * w)
            left_x = int(left_cheek.x * w)
            right_x = int(right_cheek.x * w)

            # Calculate midpoint
            face_midpoint_x = (left_x + right_x) // 2

            # Determine face direction
            if nose_x < face_midpoint_x - THRESHOLD:
                face_direction_status = "Looking Left"
            elif nose_x > face_midpoint_x + THRESHOLD:
                face_direction_status = "Looking Right"
            else:
                face_direction_status = "Looking Straight"

    # Return the face status as JSON
    return jsonify({'status': face_direction_status})

if __name__ == '__main__':
    app.run(debug=True)
