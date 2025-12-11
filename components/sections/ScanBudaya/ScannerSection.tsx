'use client';

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface ScannerSectionProps {
  onScanComplete?: (result: any) => void;
  autoPlayAudio?: boolean;
  onAutoPlayChange?: (value: boolean) => void;
}

export default function ScannerSection({ onScanComplete, autoPlayAudio = true, onAutoPlayChange }: ScannerSectionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      setIsScanning(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await new Promise((resolve) => {
          if (videoRef.current) {
            videoRef.current.onloadedmetadata = () => {
              videoRef.current?.play();
              resolve(true);
            };
          }
        });
        streamRef.current = stream;
        setIsCameraActive(true);
        setError(null);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Tidak dapat mengakses kamera. Pastikan izin kamera telah diberikan.');
    } finally {
      setIsScanning(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const handleRetry = () => {
    setCapturedImage(null);
    setError(null);
  };

  const handleCapture = async () => {
    if (!isCameraActive) {
      await startCamera();
    } else {
      setIsScanning(true);
      
      try {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        
        if (canvas && video) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext('2d');
          
          if (ctx) {
            ctx.drawImage(video, 0, 0);
            const base64Image = canvas.toDataURL('image/jpeg', 0.8);
            const base64Data = base64Image.split(',')[1];
            
            // Freeze camera by storing captured image
            setCapturedImage(base64Image);
            
            const response = await fetch('/api/scan-culture', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ image: base64Data }),
            });
            
            const result = await response.json();
            
            if (response.ok && onScanComplete) {
              // Add captured image to result
              const resultWithImage = {
                ...result,
                capturedImage: base64Image // Add the captured image to the result
              };
              onScanComplete(resultWithImage);
              stopCamera(); // Stop camera after successful scan
              // Keep capturedImage displayed
            } else {
              // Handle different error types
              if (response.status === 429) {
                setError('⚠️ Rate limit tercapai. Gemini API sedang sibuk. Silakan coba lagi dalam 1-2 menit.');
              } else {
                setError(result.error || 'Gagal memindai objek');
              }
            }
          }
        }
      } catch (err) {
        console.error('Scan error:', err);
        setError('Terjadi kesalahan saat memindai objek');
      } finally {
        setIsScanning(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <>
    {/* Auto-play Toggle */}
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-between p-4 bg-white rounded-xl border border-[#F0F4F4] shadow-sm mb-4"
    >
      <div className="flex items-center gap-3">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#111818]">
          <path d="M10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM7.5 6.5L13.5 10L7.5 13.5V6.5Z" fill="currentColor"/>
        </svg>
        <div>
          <p className="text-sm font-bold text-[#111818]">Putar Audio Otomatis</p>
          <p className="text-xs text-[#618989]">Aktifkan untuk mendengar deskripsi setelah scan</p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => onAutoPlayChange?.(!autoPlayAudio)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#13ECEC] focus:ring-offset-2 ${
          autoPlayAudio ? 'bg-[#13ECEC]' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-200 ${
            autoPlayAudio ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="relative w-full aspect-square rounded-2xl overflow-hidden border border-[#F0F4F4] shadow-sm"
      style={{
        background: isCameraActive || capturedImage ? '#000' : 'linear-gradient(135deg, #1A2C2C 0%, #0F1A1A 100%)',
      }}
    >
      {/* Camera Video */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
        style={{ display: isCameraActive && !capturedImage ? 'block' : 'none' }}
      />
      
      {/* Captured/Frozen Image */}
      {capturedImage && (
        <img
          src={capturedImage}
          alt="Captured"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      
      {/* Hidden canvas for capturing */}
      <canvas ref={canvasRef} className="hidden" />
      
      {/* Error Message */}
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 left-4 right-4 bg-red-500/95 backdrop-blur-sm text-white px-4 py-3 rounded-xl text-sm z-50 flex justify-between items-start shadow-lg"
        >
          <div className="flex-1 pr-2">
            <p className="font-semibold">{error}</p>
            {error.includes('Rate limit') && (
              <p className="text-xs mt-1 text-white/90">
                Tip: Gunakan API key berbeda atau tunggu beberapa menit.
              </p>
            )}
          </div>
          <button 
            onClick={() => setError(null)} 
            className="ml-2 font-bold text-xl hover:text-red-100 transition-colors flex-shrink-0"
          >
            ×
          </button>
        </motion.div>
      )}
      
      {/* Dark overlay */}
      {!capturedImage && (
        <div className={`absolute inset-0 z-10 ${isCameraActive ? 'bg-black/10' : 'bg-black/20'}`} />
      )}
      
      {/* Animated dashed border */}
      {!capturedImage && (
        <motion.div
          animate={{
            opacity: isScanning ? [0.5, 1, 0.5] : [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 z-20 flex items-center justify-center p-8 sm:p-12"
        >
          <div className="w-full h-full max-w-[582px] max-h-[510px] rounded-xl border-2 border-dashed border-white/50" />
        </motion.div>
      )}

      {/* Content */}
      {!capturedImage && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center px-4 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-center space-y-2"
          >
            <h3 className="text-base sm:text-lg font-semibold text-white drop-shadow-lg">
              {isScanning && !isCameraActive ? 'Memuat Kamera...' : isScanning ? 'Sedang Memindai...' : isCameraActive ? 'Posisikan Objek di Dalam Bingkai' : 'Siap untuk Memindai'}
            </h3>
            <p className="text-sm text-white/80 drop-shadow-lg">
              {isScanning && !isCameraActive ? 'Mohon tunggu sebentar...' : isCameraActive ? 'Pastikan pencahayaan cukup' : 'Klik tombol untuk memulai'}
            </p>
          </motion.div>

        </div>
      )}
    </motion.div>
        {/* Scan Button */}
        <div className="mt-1 w-full flex justify-center gap-3 pointer-events-auto mx-auto">
          <motion.button
            onClick={capturedImage ? handleRetry : handleCapture}
            disabled={isScanning}
            whileHover={{ scale: isScanning ? 1 : 1.05 }}
            whileTap={{ scale: isScanning ? 1 : 0.95 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="flex items-center justify-center gap-3 px-8 sm:px-12 py-2 sm:py-3 bg-[#0FD94F] hover:bg-[#0BC943] rounded-full shadow-2xl relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isScanning && !isCameraActive ? (
              <motion.div
                className="w-6 h-6 border-3 border-black border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              <>
                <motion.div
                  animate={{
                    x: isHovered ? 0 : '-100%',
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/50 to-white/10"
                />
                
                {capturedImage ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                ) : (
                  <svg width="30" height="36" viewBox="0 0 30 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.25 14.25H24.25C23.6875 12.8125 22.8281 11.5781 21.6719 10.5469C20.5156 9.51562 19.1875 8.79167 17.6875 8.375L14.25 14.25ZM11.375 16.75L16.375 8.125C16.1458 8.08333 15.9167 8.05208 15.6875 8.03125C15.4583 8.01042 15.2292 8 15 8C13.625 8 12.3438 8.26042 11.1562 8.78125C9.96875 9.30208 8.91667 10 8 10.875L11.375 16.75ZM5.3125 20.5H12.125L7.125 11.875C6.45833 12.7292 5.9375 13.6719 5.5625 14.7031C5.1875 15.7344 5 16.8333 5 18C5 18.4375 5.02604 18.8594 5.07812 19.2656C5.13021 19.6719 5.20833 20.0833 5.3125 20.5ZM12.3125 27.625L15.6875 21.75H5.75C6.3125 23.1875 7.17188 24.4219 8.32812 25.4531C9.48438 26.4844 10.8125 27.2083 12.3125 27.625ZM15 28C16.375 28 17.6562 27.7396 18.8438 27.2188C20.0312 26.6979 21.0833 26 22 25.125L18.625 19.25L13.625 27.875C13.8542 27.9167 14.0781 27.9479 14.2969 27.9688C14.5156 27.9896 14.75 28 15 28ZM22.875 24.125C23.5417 23.2708 24.0625 22.3281 24.4375 21.2969C24.8125 20.2656 25 19.1667 25 18C25 17.5625 24.974 17.1406 24.9219 16.7344C24.8698 16.3281 24.7917 15.9167 24.6875 15.5H17.875L22.875 24.125ZM15 30.5C13.2917 30.5 11.6771 30.1719 10.1562 29.5156C8.63542 28.8594 7.30729 27.9635 6.17188 26.8281C5.03646 25.6927 4.14062 24.3646 3.48438 22.8438C2.82812 21.3229 2.5 19.7083 2.5 18C2.5 16.2708 2.82812 14.651 3.48438 13.1406C4.14062 11.6302 5.03646 10.3073 6.17188 9.17188C7.30729 8.03646 8.63542 7.14062 10.1562 6.48438C11.6771 5.82812 13.2917 5.5 15 5.5C16.7292 5.5 18.349 5.82812 19.8594 6.48438C21.3698 7.14062 22.6927 8.03646 23.8281 9.17188C24.9635 10.3073 25.8594 11.6302 26.5156 13.1406C27.1719 14.651 27.5 16.2708 27.5 18C27.5 19.7083 27.1719 21.3229 26.5156 22.8438C25.8594 24.3646 24.9635 25.6927 23.8281 26.8281C22.6927 27.9635 21.3698 28.8594 19.8594 29.5156C18.349 30.1719 16.7292 30.5 15 30.5Z" fill="black"/>
                  </svg>
                )}
                
                <span className="text-lg font-bold text-black tracking-[0.5px] relative z-10">
                  {capturedImage ? 'Pindai Lagi' : isCameraActive ? 'Pindai Sekarang' : 'Aktifkan Kamera'}
                </span>
              </>
            )}
          </motion.button>
          
          {isCameraActive && !isScanning && (
            <motion.button
              onClick={stopCamera}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="px-6 py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full shadow-2xl z-50"
            >
              Matikan
            </motion.button>
          )}
        </div>
        </>
  );
}

