import React from 'react';
import Users_Dashboard from '@/components/users_dashboard';
import { User } from '@/models/user';


export default async function Page() {

  const res = await fetch("http://localhost:3000/api/users", { cache: "no-cache" })

  const { data } = await res.json()
  return (
    <>
      <div className="w-full bg-blue-950 bg-background">
        <div className=" pt-[5%] p-[1%]">
          {data.map((item: User) => {
            return <Users_Dashboard item={item} />
          })}
        </div>
      </div>
    </>
  );
};
