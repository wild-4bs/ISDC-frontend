import Image from "next/image";

export const XRayImage = () => {
  return (
    <div className="relative w-full h-full min-h-[200px] border border-input bg-primary/5 rounded-xl overflow-hidden">
      <Image
        src={"/xRays/1.png"}
        width={10000}
        height={1000}
        alt="x-ray"
        className="object-cover relative z-0 w-full h-full"
      />
    </div>
  );
};
