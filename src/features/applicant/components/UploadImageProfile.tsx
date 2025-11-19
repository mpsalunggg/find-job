"use client";

import { useEffect, useRef, useState, Fragment } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import * as handpose from "@tensorflow-models/handpose";
import "@tensorflow/tfjs-backend-webgl";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { poseSteps } from "../applicant.constants";
import Image from "next/image";

interface UploadImageProfileProps {
  open: boolean;
  onClose: () => void;
  onCapture: (imgBase64: string) => void;
}

export default function UploadImageProfile({
  open,
  onClose,
  onCapture,
}: UploadImageProfileProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const countdownTimer = useRef<NodeJS.Timeout | null>(null);

  const detectionState = useRef({
    lastCount: 0,
    stableFrames: 0,
    progression: { three: false, two: false, one: false },
    countdownStarted: false,
  });

  const [model, setModel] = useState<handpose.HandPose | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [captured, setCaptured] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [activeSteps, setActiveSteps] = useState({
    three: false,
    two: false,
    one: false,
  });

  const setupCamera = async () => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadeddata = () => {
          videoRef.current?.play().then(() => {
            setVideoReady(true);
          });
        };
      }
    } catch (error) {
      console.error("camera error bro", error);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setVideoReady(false);
  };

  const countFingers = (landmarks: number[][]) => {
    if (!landmarks || landmarks.length !== 21) return 0;

    let count = 0;
    const palmHeight = Math.abs(landmarks[0][1] - landmarks[9][1]);
    const threshold = Math.max(25, palmHeight * 0.25);

    const fingerPairs = [
      [8, 6], // index finger
      [12, 10], // middle finger
      [16, 14], // ring finger
    ];

    for (const [tip, pip] of fingerPairs) {
      if (landmarks[tip][1] < landmarks[pip][1] - threshold) {
        count++;
      }
    }

    return count;
  };

  const drawVideo = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
  };

  const takePhoto = () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0);
    setCaptured(canvas.toDataURL("image/jpeg", 0.95));
  };

  const startCountdown = () => {
    if (detectionState.current.countdownStarted) return;
    detectionState.current.countdownStarted = true;

    let count = 3;
    setCountdown(count);

    countdownTimer.current = setInterval(() => {
      count--;
      setCountdown(count);

      if (count < 0) {
        if (countdownTimer.current) clearInterval(countdownTimer.current);
        takePhoto();
        setTimeout(() => setCountdown(null), 500);
      }
    }, 1000);
  };

  const resetCapture = () => {
    if (countdownTimer.current) clearInterval(countdownTimer.current);

    setCaptured(null);
    setCountdown(null);
    setActiveSteps({ three: false, two: false, one: false });

    detectionState.current = {
      lastCount: 0,
      stableFrames: 0,
      progression: { three: false, two: false, one: false },
      countdownStarted: false,
    };

    setupCamera();
  };

  const handleSubmit = () => {
    if (captured) {
      onCapture(captured);
      onClose();
    }
  };

  const getStepSrc = (step: {
    id: string;
    activeSrc: string;
    inactiveSrc: string;
  }) => {
    const isActive =
      (step.id === "one" && activeSteps.one) ||
      (step.id === "two" && activeSteps.two) ||
      (step.id === "three" && activeSteps.three);

    return isActive ? step.activeSrc : step.inactiveSrc;
  };

  useEffect(() => {
    let mounted = true;
    handpose.load().then((m) => {
      if (mounted) setModel(m);
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (open) {
      setupCamera();
    } else {
      stopCamera();
      setCaptured(null);
      setCountdown(null);
      setActiveSteps({ three: false, two: false, one: false });
      detectionState.current = {
        lastCount: 0,
        stableFrames: 0,
        progression: { three: false, two: false, one: false },
        countdownStarted: false,
      };
    }

    return () => {
      stopCamera();
    };
  }, [open]);

  useEffect(() => {
    if (!videoReady || !model || !open || captured) return;

    let animationId: number;
    let active = true;

    const detect = async () => {
      if (!active || !videoRef.current || !model) return;

      const video = videoRef.current;
      if (!video.videoWidth || !video.videoHeight) {
        animationId = requestAnimationFrame(detect);
        return;
      }

      try {
        drawVideo();
        const predictions = await model.estimateHands(video, false);

        if (predictions.length > 0) {
          const landmarks = predictions[0].landmarks as number[][];
          const count = countFingers(landmarks);
          const state = detectionState.current;

          if (count === state.lastCount) {
            state.stableFrames++;
          } else {
            state.lastCount = count;
            state.stableFrames = 0;
          }

          if (state.stableFrames >= 15 && !state.countdownStarted) {
            const prog = state.progression;

            if (count === 3 && !prog.three) {
              prog.three = true;
              prog.two = false;
              prog.one = false;
              setActiveSteps({ three: true, two: false, one: false });
            } else if (count === 2 && prog.three && !prog.two) {
              prog.two = true;
              prog.one = false;
              setActiveSteps({ three: true, two: true, one: false });
            } else if (count === 1 && prog.three && prog.two && !prog.one) {
              prog.one = true;
              setActiveSteps({ three: true, two: true, one: true });
              startCountdown();
            }
          }
        }
      } catch (err) {
        console.error(err);
      }

      if (active) {
        animationId = requestAnimationFrame(detect);
      }
    };

    detect();

    return () => {
      active = false;
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [videoReady, model, open, captured]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full sm:min-w-[500px] lg:min-w-[637px]">
        <div className="space-y-4">
          <div>
            <DialogTitle className="text-xl font-bold">
              Raise Your Hand to Capture
            </DialogTitle>
            <p className="text-sm text-neutral-900">
              We&apos;ll take the photo once your hand pose is detected.
            </p>
          </div>

          {!captured ? (
            <>
              <div className="relative overflow-hidden bg-black">
                <video ref={videoRef} className="hidden" />
                <canvas
                  ref={canvasRef}
                  className="aspect-video w-full object-cover"
                />

                {countdown !== null && countdown > 0 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
                    <p className="text-sm font-bold text-white">
                      Capturing photo in
                    </p>
                    <div className="text-[48px] font-bold text-white">
                      {countdown}
                    </div>
                  </div>
                )}

                {countdown === 0 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
                    <p className="text-sm font-bold text-white">
                      Capturing photo in
                    </p>
                    <div className="text-[48px] font-bold text-white">0</div>
                  </div>
                )}

                {model && !videoReady && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white">
                    Initializing camera...
                  </div>
                )}
              </div>

              <p className="text-sm text-neutral-900">
                To take a picture, follow the hand poses in the order shown
                below. The system will automatically capture the image once the
                final pose is detected.
              </p>

              <div className="flex items-center justify-center gap-2">
                {poseSteps.map((step, idx) => (
                  <Fragment key={step.id}>
                    <div className="flex h-[57.26px] w-[57.26px] items-center justify-center bg-[#F6F1EB]">
                      <Image
                        src={getStepSrc(step)}
                        alt={step.id}
                        className="h-full w-full p-1"
                        width={57.26}
                        height={57.26}
                      />
                    </div>
                    {idx < poseSteps.length - 1 && (
                      <ChevronRightIcon strokeWidth={2} className="h-6 w-6" />
                    )}
                  </Fragment>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <Image
                  src={captured}
                  alt="Captured"
                  className="aspect-video w-full object-cover"
                  width={637}
                  height={480}
                />

                <div className="flex items-center justify-center gap-3">
                  <Button
                    variant="outline"
                    onClick={resetCapture}
                    className="font-bold"
                  >
                    Retake photo
                  </Button>
                  <Button variant="primary-solid" onClick={handleSubmit}>
                    Submit
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
