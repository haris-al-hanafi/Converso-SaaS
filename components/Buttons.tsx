'use client';

import React from "react";
import Image from "next/image";
import { useState } from "react";
import {vapi} from "@/lib/vapi.sdk";


const Buttons = () => {
  
    const [IsMuted, setIsMuted] = useState(false);
    const isMuted = vapi.isMuted();
    const handleMicToggle = () => {
      vapi.setMuted(!isMuted);
      setIsMuted(!IsMuted);
    }
  return (
    
  );
};

export default Buttons;
