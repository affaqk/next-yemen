"use client"

import Image from "next/image";
import { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function Home() {
  
  return (
    <>
      <Carousel>
                <div>
                    <Image src="/images/1.jpg" width={300} height={300}/>
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <Image src="/images/2.jpg" width={300} height={300} />
                  <p className="legend">Legend 2</p>
                </div>
                <div>
                    <Image src="/images/3.jpg" width={300} height={300}/>
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
    </>
  );
}


