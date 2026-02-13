import { useEffect, useRef } from "react";
import img1 from "../src/img/1.jpeg";
import img2 from "../src/img/2.jpeg";
import img3 from "../src/img/3.jpg";
import "./index.css";

let highestZ = 1;

export default function DragPapers() {
  const papersRef = useRef([]);

  useEffect(() => {
    papersRef.current.forEach((paper) => {
      if (!paper) return;

      let holding = false;
      let offsetX = 0;
      let offsetY = 0;
      let startX = 0;
      let startY = 0;
      let rotation = Math.random() * 30 - 15;

      // ✅ START FROM EXACT CENTER
      paper.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;

      const onMouseDown = (e) => {
        holding = true;
        startX = e.clientX - offsetX;
        startY = e.clientY - offsetY;
        paper.style.zIndex = highestZ++;
        paper.style.cursor = "grabbing";
      };

      const onMouseMove = (e) => {
        if (!holding) return;

        offsetX = e.clientX - startX;
        offsetY = e.clientY - startY;

        paper.style.transform = `
          translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))
          rotate(${rotation}deg)
        `;
      };

      const onMouseUp = () => {
        holding = false;
        paper.style.cursor = "grab";
      };

      paper.addEventListener("mousedown", onMouseDown);
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);

      // TOUCH SUPPORT
      paper.addEventListener("touchstart", (e) => {
        holding = true;
        startX = e.touches[0].clientX - offsetX;
        startY = e.touches[0].clientY - offsetY;
        paper.style.zIndex = highestZ++;
      });

      window.addEventListener("touchmove", (e) => {
        if (!holding) return;

        offsetX = e.touches[0].clientX - startX;
        offsetY = e.touches[0].clientY - startY;

        paper.style.transform = `
          translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))
          rotate(${rotation}deg)
        `;
      });

      window.addEventListener("touchend", () => {
        holding = false;
      });
    });
  }, []);

  return (
    <>
      <div ref={(el) => (papersRef.current[0] = el)} className="paper">
        <p>I love youuuuuuuuuuuu...... ❤️</p>
        <p>Happy Valentines Day ❤️</p>
      </div>

      <div ref={(el) => (papersRef.current[1] = el)} className="paper heart" />

      <div ref={(el) => (papersRef.current[2] = el)} className="paper image">
        <p>and I fallen in</p>
        <p>Love with You 😍</p>
        <img src={img1} alt="" />
      </div>

      <div ref={(el) => (papersRef.current[3] = el)} className="paper image">
        <img src={img2} alt="" />
      </div>

      <div ref={(el) => (papersRef.current[4] = el)} className="paper image">
        <p>How can be</p>
        <p>someone so cute ❤️</p>
        <img src={img3} alt="" />
      </div>

      <div ref={(el) => (papersRef.current[5] = el)} className="paper">
        <p>and My Babyyyyy, Icecreammmmm 😍</p>
      </div>

      <div ref={(el) => (papersRef.current[6] = el)} className="paper">
        <p>You are Cute Amazing ❤️</p>
      </div>

      <div ref={(el) => (papersRef.current[7] = el)} className="paper">
        <p>Drag the papers to move!</p>
        <p>I Have a Surprise for You ❤️</p>
        <p>My Icecreaaaammmmmmmm ❤️</p>
      </div>
    </>
  );
}
