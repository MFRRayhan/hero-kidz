import { mayaboti } from "@/app/layout";
import Image from "next/image";
import React from "react";

export default function Banner() {
  return (
    <section className="flex items-center justify-between py-20">
      <div className="flex-1 space-y-5">
        <h2 className={`${mayaboti.className} text-6xl`}>
          আপনার শিশুকে দিন একটি{" "}
          <span className="text-primary">সুন্দর ভবিষ্যত</span>{" "}
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
          nulla, rem culpa minus dicta eum quibusdam esse? Recusandae, inventore
          possimus?
        </p>
        <button className="btn btn-primary">Explore Products</button>
      </div>
      <div className="flex-1 flex justify-end">
        <Image
          src={"/assets/hero.png"}
          alt="Hero-banner"
          width={500}
          height={400}
          className="w-auto h-auto"
          loading="eager"
        />
      </div>
    </section>
  );
}
