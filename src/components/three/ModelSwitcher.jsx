import { PresentationControls } from "@react-three/drei";
import { useRef } from "react";
import MacBookModel16 from "../models/Macbook-16";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

const fadeMeshes = (group, opacity) => {
  if (!group) return;
  group.traverse((child) => {
    if (child.isMesh) {
      child.material.transparent = true;
      gsap.to(child.material, {
        opacity,
        duration: ANIMATION_DURATION,
      });
    }
  });
}

const moveGroup = (group, x) => {
  if (!group) return;
  gsap.to(group.position, {
    x,
    duration: ANIMATION_DURATION,
  });
}

const ModelSwitcher = ({ scale, isMobile }) => {
  const smallMacbbookRef = useRef();
  const largeMacbbookRef = useRef();

  const showLargeMacbook = scale === 0.08 || scale === 0.05;

  useGSAP(() => {
    if (showLargeMacbook) {
      moveGroup(smallMacbbookRef.current, -OFFSET_DISTANCE)
      moveGroup(largeMacbbookRef.current, 0)

      fadeMeshes(smallMacbbookRef.current, 0);
      fadeMeshes(largeMacbbookRef.current, 1);
    } else {
      moveGroup(smallMacbbookRef.current, 0)
      moveGroup(largeMacbbookRef.current, OFFSET_DISTANCE)
      fadeMeshes(smallMacbbookRef.current, 1);
      fadeMeshes(largeMacbbookRef.current, 0);
    }
  }, [showLargeMacbook])

  const controlsConfig = {
    snap: true,
    speed: 1,
    zoom: 1,
    polar: [-Math.PI, Math.PI],
    azimuth: [-Infinity, Infinity],
    config: { mass: 1, tension: 0, friction: 26 },
  }
  return (
    <>
      <PresentationControls {...controlsConfig}>
        <group ref={largeMacbbookRef}>
          <MacBookModel16 scale={isMobile ? 0.05 : 0.08} />
        </group>
      </PresentationControls>

      <PresentationControls {...controlsConfig}>
        <group ref={smallMacbbookRef}>
          <MacBookModel16 scale={isMobile ? 0.03 : 0.06} />
        </group>
      </PresentationControls>
    </>
  );
};

export default ModelSwitcher;