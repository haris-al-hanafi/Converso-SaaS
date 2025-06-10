"use server";
// import { getCompanion } from '@/lib/actions/companion.action'
import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { getCompanion } from "@/lib/actions/companion.action";
import { redirect } from "next/navigation";
import SubjectImage from "@/components/SubjectImage";
import CompComponent from "@/components/CompComponent";

interface CompanionSessionPageProps {
  params: Promise<{ Id: string }>;
}

const CompSession = async ({ params }: CompanionSessionPageProps) => {
  const { id  }  = await params;
  const data = await getCompanion(id);
  const user = await currentUser();
  
  const {name, subject, title, topic, duration} = data;
  

  if (!user) redirect("/sign-in");
  if (!data) redirect("/companions");

  return (
    <main>
      <article className="w-full  border border-black rounded-xl flex justify-between max-md:flex-col p-5">
        <div className="flex items-center gap-2">
          <SubjectImage subject={data.subject} isMobile={true}  />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold capitalize">{data.name}</h2>
            <div className="subject-badge">{data.subject}</div>
            </div>
            <p className="text-gray-700">Topic: {data.topic}</p>
          </div>
        </div>
        <div className="font-bold">{data.duration}{" "}Mins</div>
      </article>
      
    <CompComponent
      {...data}
      companionId={id}
      userName={user.firstName ? user.firstName : user.username}
      userImg={user.imageUrl}
    />

    </main>
  );
};

export default CompSession;
