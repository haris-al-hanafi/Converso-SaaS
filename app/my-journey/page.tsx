import React from "react";
import { getCompanionHistory } from "@/lib/actions/companion.action";
import CompLists from "@/components/CompLists";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

const Profile = async () => {
  const companions = await getCompanionHistory();
  const user = await currentUser();

  return (
    <section className="p-7 flex flex-col gap-4">
      <article className="flex  max-sm:flex-col justify-between items-center w-full p-5 ">
          <div className="flex gap-3 items-center">
            <Image src={user?.imageUrl} width={70} height={70} alt="user avatar"  className="rounded-md"   />
            <div>
                <h1 className="capitalize">{user?.fullName}</h1>
                <p>{user?.primaryEmailAddress?.emailAddress}</p>
            </div>
            <div></div>
            <div></div>
          </div>
      </article>
      <section className="companions-grid">
          <CompLists 
          title={'Recently Completed sessions'}
          companions={companions}
          classNames="md:w-2/3 max-w-full"
          />       
      </section>
    </section>
  );
};

export default Profile;
