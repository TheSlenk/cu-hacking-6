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
THRESHOLD = 40  # Adjust this if needed

def get_face_direction_status(frame):
    """
    This function takes a frame, processes it through MediaPipe, 
    and returns the face direction status (Looking Left, Right, or Straight).
    """
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
                face_direction_status = "Looking Right"
            elif nose_x > face_midpoint_x + THRESHOLD:
                face_direction_status = "Looking Left"
            else:
                face_direction_status = "Looking Straight"
    
    return face_direction_status

def generate_frames():
    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # Get face direction status
        face_direction_status = get_face_direction_status(frame)

        # Add status to the frame
        cv2.putText(frame, face_direction_status, (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

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

    # Get face direction status
    face_direction_status = get_face_direction_status(frame)

    # Return the face status as JSON
    return jsonify({'status': face_direction_status})

if __name__ == '__main__':
    app.run(debug=True)
