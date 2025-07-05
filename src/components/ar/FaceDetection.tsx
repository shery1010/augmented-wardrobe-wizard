import { useEffect, useRef } from 'react';
import { pipeline, env } from '@huggingface/transformers';

// Configure transformers to use WebGPU if available
env.allowLocalModels = false;
env.useBrowserCache = true;

interface FaceDetectionProps {
  video: HTMLVideoElement | null;
  onFaceDetected: (landmarks: any) => void;
}

export const FaceDetection = ({ video, onFaceDetected }: FaceDetectionProps) => {
  const detectorRef = useRef<any>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const initializeDetector = async () => {
      try {
        console.log('Initializing face detection...');
        const detector = await pipeline(
          'object-detection',
          'Xenova/yolos-tiny',
          { device: 'webgpu' }
        );
        detectorRef.current = detector;
        console.log('Face detection initialized');
      } catch (error) {
        console.error('Error initializing face detector:', error);
        // Fallback to CPU if WebGPU fails
        try {
          const detector = await pipeline(
            'object-detection',
            'Xenova/yolos-tiny'
          );
          detectorRef.current = detector;
          console.log('Face detection initialized (CPU fallback)');
        } catch (fallbackError) {
          console.error('Face detection initialization failed:', fallbackError);
        }
      }
    };

    initializeDetector();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!video || !detectorRef.current) return;

    const detectFaces = async () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);

        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        const results = await detectorRef.current(imageData);
        
        // Filter for person detections (which include faces)
        const faces = results.filter((detection: any) => 
          detection.label === 'person' && detection.score > 0.5
        );

        if (faces.length > 0) {
          onFaceDetected(faces[0]); // Use the first detected person
        }
      } catch (error) {
        console.error('Error in face detection:', error);
      }
    };

    // Run detection every 100ms
    intervalRef.current = setInterval(detectFaces, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [video, onFaceDetected]);

  return null; // This component doesn't render anything
};