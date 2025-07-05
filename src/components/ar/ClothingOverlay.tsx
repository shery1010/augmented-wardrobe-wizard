import { useEffect, useRef } from 'react';
import { Canvas as FabricCanvas, Image as FabricImage } from 'fabric';

interface ClothingOverlayProps {
  video: HTMLVideoElement | null;
  faceLandmarks: any;
  selectedClothing: string | null;
}

export const ClothingOverlay = ({ video, faceLandmarks, selectedClothing }: ClothingOverlayProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<FabricCanvas | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !video) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: video.videoWidth || 640,
      height: video.videoHeight || 480,
      selection: false,
      backgroundColor: 'transparent'
    });

    fabricCanvasRef.current = canvas;

    return () => {
      canvas.dispose();
    };
  }, [video]);

  useEffect(() => {
    if (!fabricCanvasRef.current || !faceLandmarks || !selectedClothing) return;

    const canvas = fabricCanvasRef.current;
    canvas.clear();

    // Calculate position based on face detection
    const { box } = faceLandmarks;
    const faceWidth = box.width;
    const faceHeight = box.height;
    const faceX = box.xmin;
    const faceY = box.ymin;

    // Load and position clothing overlay
    FabricImage.fromURL(selectedClothing, {
      crossOrigin: 'anonymous'
    }).then((img) => {
      // Scale clothing based on face size
      const scale = faceWidth / 200; // Adjust scaling factor as needed
      
      img.set({
        left: faceX - (faceWidth * 0.2), // Slightly left of face
        top: faceY + (faceHeight * 0.8), // Below face for clothing
        scaleX: scale,
        scaleY: scale,
        selectable: false,
        evented: false
      });

      canvas.add(img);
      canvas.renderAll();
    }).catch(error => {
      console.error('Error loading clothing image:', error);
    });
  }, [faceLandmarks, selectedClothing]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 pointer-events-none"
      style={{ 
        transform: 'scaleX(-1)', // Mirror to match video
        zIndex: 10 
      }}
    />
  );
};