import cv2
import mediapipe as mp
import numpy as np

# Initialize MediaPipe Face Mesh
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(min_detection_confidence=0.5, min_tracking_confidence=0.5)

# Open webcam
cap = cv2.VideoCapture(0)

# Threshold to determine turning head
THRESHOLD = 40  # Adjust this if needed

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break
    
    # Convert BGR to RGB (MediaPipe requires RGB format)
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = face_mesh.process(rgb_frame)

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
                status = "Looking Left"
            elif nose_x > face_midpoint_x + THRESHOLD:
                status = "Looking Right"
            else:
                status = "Looking Straight"

            # Display status
            cv2.putText(frame, status, (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

    # Show the output
    cv2.imshow('Face Tracker', frame)

    # Exit on 'q' key
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
