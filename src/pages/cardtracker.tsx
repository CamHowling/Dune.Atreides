import * as React from "react";

import './../app/globals.css';
import { useRouter } from 'next/router'
import { House } from "@/classes/house";
import { Expansion } from "@/classes/expansion";
import { redirect } from "next/navigation";

export default function Tracker () {
  const router = useRouter();
  const houses = (router.query.houses ? JSON.parse( router.query.houses.toString()) : []) as House[];
  if (houses.length == 0) {
    redirect('/');
  }
  const expansions = (router.query.expansions? JSON.parse( router.query.expansions.toString()) : []) as Expansion[];


  console.log(expansions);
  return (
    <div>stse</div>
  );
}

