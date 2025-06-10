"use client";

import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subjects } from "@/constants";
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'


const SubjectFilter = () => {
  const [subject, setSubject] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("topic") || "";

  useEffect(() => {
    setTimeout(() => {
      if (subject === 'all') {
        const newUrl = removeKeysFromUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ["subject"],
        });
        router.push(newUrl, {
          scroll: false,
        });
      }else {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "subject",
          value: subject,
        });
        router.push(newUrl, {
          scroll: false,
        })
      } 
    }, 500);
  }, [subject]);
  // console.log(subject);

  return (
    <div>
      <Select
        onValueChange={(value) => {
          setSubject(value);
        }}
      >
        <SelectTrigger className="w-[150px] border-black">
          <SelectValue placeholder="Select a subject" />
        </SelectTrigger>
        <SelectContent>
          {subjects.map((subject) => (
            <SelectItem key={subject} value={subject} className="capitalize">
              {subject}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SubjectFilter;
