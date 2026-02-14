import clsx from "clsx";
import useMackbookStore from "../store"
import { Canvas } from "@react-three/fiber";
import { Box, OrbitControls } from "@react-three/drei";
import MackBookModel14 from "./models/Macbook-14";
import StudioLights from "./three/StudioLights";
import ModelSwitcher from "./three/ModelSwitcher";
import { useMediaQuery } from "react-responsive";

const ProductViewer = () => {
  const { color, scale, setColor, setScale } = useMackbookStore();
  const isMobile = useMediaQuery({query: '(max-width: 1024)'});

  return (
    <section id="product-viewer">
      <h2>Take a closer look.</h2>

      <div className="controls">
        <p className="info">
          MacbookPro 16" in {color}
        </p>

        <div className="flex-center gap-5 mt-5">
          <div className="color-control">
            <div
              onClick={() => setColor('#adb5db')}
              className={clsx('bg-neutral-300', color === '#adb5db' && 'active')}
            />

            <div
              onClick={() => setColor('#2c2e2c')}
              className={clsx('bg-neutral-900', color === '#2c2e2c' && 'active')}
            />
          </div>

          <div className="size-control">
            <div
              onClick={() => setScale(0.06)}
              className={clsx(scale === 0.06 ? 'bg-white text-black' : 'bg-transparent text-white')}
            >
              <p>14"</p>
            </div>
            <div
              onClick={() => setScale(0.08)}
              className={clsx(scale === 0.08 ? 'bg-white text-black' : 'bg-transparent text-white')}
            >
              <p>16"</p>
            </div>
          </div>
        </div>
      </div>

      <Canvas id="canvas" camera={{position: [0,2,5], fov: 50, near: 0.1, far: 100}}>
        <StudioLights />
        <ModelSwitcher scale={isMobile ? scale - 0.03 : scale} isMobile={isMobile} />
      </Canvas>
    </section>
  )
}

export default ProductViewer