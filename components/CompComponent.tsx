"use client";

import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from "@/constants/soundwaves.json";

// Enum representing the different call states
enum CallStatus {
  INACTIVE = "INACTIVE",
  ACTIVE = "ACTIVE",
  CONNECTING = "CONNECTING",
  ENDED = "ENDED",
}

// Define types
type SavedMessage = { role: string; content: string };
type Message = {
  type: string;
  role: string;
  transcript: string;
  transcriptType: string;
};
type Error = {
  message: string;
};

const CompComponent = ({
  name,
  subject,
  topic,
  style,
  voice,
  companionID,
  userImg,
  userName,
}) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const callRef = useRef<any>(null);

  useEffect(() => {
    const onCall = () => setCallStatus(CallStatus.ACTIVE);
    const endCall = () => setCallStatus(CallStatus.ENDED);
    const startConnecting = () => setCallStatus(CallStatus.CONNECTING);
    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [newMessage, ...prev]);
      }
    };
    const onError = (error: Error) => console.log("Error", error);
    const onSpeech = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);

    // Register listeners
    vapi.on("call-start", onCall);
    vapi.on("call-end", endCall);
    vapi.on("message", onMessage);
    vapi.on("error", onError);
    vapi.on("speech-start", onSpeech);
    vapi.on("speech-end", onSpeechEnd);


    return () => {
      vapi.off("call-start", onCall);
      vapi.off("call-end", endCall);
      vapi.off("message", onMessage);
      vapi.off("error", onError);
      vapi.off("speech-start", onSpeech);
      vapi.off("speech-end", onSpeechEnd);
      callRef.current?.destroy();
      callRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (isSpeaking) {
      lottieRef.current?.play();
    } else {
      lottieRef.current?.stop();
    }
  }, [isSpeaking]);

  const toggleMic = () => {
    const micMuted = vapi.isMuted();
    vapi.setMuted(!micMuted);
    setIsMuted(!micMuted);
  };

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);
    const assistantOverrides = {
      variableValues: {
        subject,
        topic,
        style,
      },
      clientMessages: ["transcript"],
      serverMessages: [],
    };
    vapi.start(configureAssistant(voice, style), assistantOverrides);
  };

  const handleEndCall = async () => {
    setCallStatus(CallStatus.ENDED);
    vapi.stop();
  };

  return (
    <section className="flex flex-col h-[70vh]">
      <section className="flex gap-8 max-sm:flex-col">
        {/* Companion Section */}
        <div className="companion-section relative">
          <div
            className="companion-avatar h-32 w-32"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <Image
              src={`/icons/${subject}.svg`}
              alt={`${subject}`}
              height={80}
              width={80}
            />
          </div>

          <div
            className={cn(
              "absolute transition-opacity duration-1000",
              callStatus === CallStatus.INACTIVE ||
              callStatus === CallStatus.ENDED
                ? "opacity-100"
                : "opacity-0",
              callStatus === CallStatus.CONNECTING &&
                "opacity-100 animate-pulse"
            )}
          ></div>

          <div
            className={cn(
              "absolute transition-opacity duration-1000",
              callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0"
            )}
          >
            <Lottie
              lottieRef={lottieRef}
              animationData={soundwaves}
              className="companion-lottie"
              autoplay={false}
            />
          </div>

          <p className="font-black text-2xl">{name}</p>
        </div>

        {/* User Section */}
        <div className="user-section">
          <div className="user-avatar">
            <Image
              className="rounded-full"
              src={userImg}
              alt={userName}
              width={120}
              height={120}
            />
          </div>

          <div className="flex flex-col gap-3 max-sm:w-full">
            <div className="flex gap-4">
              <button className="btn-mic" onClick={toggleMic}>
                <Image
                  src={isMuted ? "/icons/mic-on.svg" : "/icons/mic-off.svg"}
                  alt="mic"
                  width={32}
                  height={32}
                  className="max-sm:hidden"
                />
                {isMuted ? "TURN ON MIC" : "TURN OFF MIC"}
              </button>
              <button
                className={cn(
                  "btn-mic flex justify-center items-center text-white transition-colors",
                  callStatus === CallStatus.ACTIVE
                    ? "bg-black"
                    : "bg-primary",
                  callStatus === CallStatus.CONNECTING && "animate-pulse"
                )}
                onClick={
                  callStatus === CallStatus.ACTIVE ? handleEndCall : handleCall
                }
              >
                {callStatus === CallStatus.INACTIVE ||
                callStatus === CallStatus.ENDED
                  ? "START CALL"
                  : callStatus === CallStatus.CONNECTING
                  ? "Connecting..."
                  : "END CALL"}
              </button>
            </div>
            <button className="btn-mic">RESTART</button>
          </div>
        </div>
      </section>

      {/* Transcript Section */}
      <section className="transcript">
        <div className="transcript-message no-scrollbar">
          {messages.map((message, index) => (
            <h1 key={index}>
              {message.role === "assistant"
                ? `${name} : ${message.content}`
                : `${userName} : ${message.content}`}
            </h1>
          ))}
        </div>
        <div className="transcript-fade" />
      </section>
    </section>
  );
};

export default CompComponent;
