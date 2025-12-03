import Image from "next/image";

export const Doctor = () => {
  return (
    <article className="rounded-lg overflow-hidden border border-input shadow-xs">
      <Image
        src={"/doctors/1.png"}
        width={1000}
        height={1000}
        alt="doctor"
        className="w-full h-auto object-cover"
      />
      <div className="p-4 text-start">
        <h3 className="font-medium text-xl">د.مهدي الربيعي</h3>
        <p className="text-primary">طبيب اسنان متمرس</p>
      </div>
    </article>
  );
};
