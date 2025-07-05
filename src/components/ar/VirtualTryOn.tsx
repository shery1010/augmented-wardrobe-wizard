import { useState, useCallback } from 'react';
import { ARCamera } from './ARCamera';
import { FaceDetection } from './FaceDetection';
import { ClothingOverlay } from './ClothingOverlay';
import { ClothingSelector } from './ClothingSelector';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, Shirt, Camera } from 'lucide-react';

export const VirtualTryOn = () => {
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);
  const [faceLandmarks, setFaceLandmarks] = useState<any>(null);
  const [selectedClothing, setSelectedClothing] = useState<string | null>(null);
  const [isARActive, setIsARActive] = useState(false);

  const handleVideoReady = useCallback((videoElement: HTMLVideoElement) => {
    setVideo(videoElement);
  }, []);

  const handleFaceDetected = useCallback((landmarks: any) => {
    setFaceLandmarks(landmarks);
  }, []);

  const handleClothingSelect = useCallback((clothingUrl: string) => {
    setSelectedClothing(clothingUrl);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/20 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AR Virtual Try-On
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Experience the future of fashion with real-time clothing visualization
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* AR Camera Section */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Camera className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Live Camera Feed</h2>
              </div>
              
              <div className="relative">
                <ARCamera 
                  onVideoReady={handleVideoReady}
                  isActive={isARActive}
                />
                
                {video && (
                  <>
                    <FaceDetection 
                      video={video}
                      onFaceDetected={handleFaceDetected}
                    />
                    <ClothingOverlay
                      video={video}
                      faceLandmarks={faceLandmarks}
                      selectedClothing={selectedClothing}
                    />
                  </>
                )}
              </div>

              <div className="mt-4 flex justify-center">
                <Button
                  onClick={() => setIsARActive(!isARActive)}
                  variant={isARActive ? "destructive" : "default"}
                  size="lg"
                >
                  {isARActive ? 'Stop AR' : 'Start AR Experience'}
                </Button>
              </div>
            </Card>
          </div>

          {/* Clothing Selection Panel */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shirt className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Select Clothing</h2>
              </div>
              
              <ClothingSelector 
                onSelect={handleClothingSelect}
                selectedItem={selectedClothing}
              />
            </Card>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="mt-6 flex justify-center gap-4">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
            video ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              video ? 'bg-green-500' : 'bg-gray-400'
            }`} />
            Camera {video ? 'Active' : 'Inactive'}
          </div>
          
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
            faceLandmarks ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              faceLandmarks ? 'bg-blue-500' : 'bg-gray-400'
            }`} />
            Face {faceLandmarks ? 'Detected' : 'Not Detected'}
          </div>
          
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
            selectedClothing ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-600'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              selectedClothing ? 'bg-purple-500' : 'bg-gray-400'
            }`} />
            Clothing {selectedClothing ? 'Selected' : 'None'}
          </div>
        </div>
      </div>
    </div>
  );
};