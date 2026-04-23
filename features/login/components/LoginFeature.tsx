"use client";
import Rectangle1 from "@/assets/shapes/rectangle-1.svg";
import Rectangle2 from "@/assets/shapes/rectangle-2.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { tokenStore } from "@/lib/tokenStore";
import { useUserStore } from "@/stores/userStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { IdCard } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useLogin } from "../api/auth";
import { LoginFormValues, loginSchema } from "../schemas/login.schema";

export const LoginFeature = () => {
  const router = useRouter();
  const { setUser } = useUserStore();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const {
    mutate,
    error: apiError,
    isPending,
  } = useLogin((res) => {
    toast.success(res?.message);
    tokenStore.setAccessToken(res?.payload?.accessToken);
    setUser(res?.payload?.patient);
    if (res?.payload?.role == "admin") {
      router.replace("/dashboard");
    } else {
      router.replace(`/profile`);
    }
  });

  useEffect(() => {
    if (apiError) {
      if (apiError?.errorFields) {
        Object.entries(apiError?.errorFields).forEach(([field, messages]) => {
          setError(field as keyof LoginFormValues, {
            type: "server",
            message: (messages as string[])[0],
          });
        });
      }
    }
  }, [apiError, setError]);

  return (
    <main
      className="w-screen h-hero-height relative flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(45deg, #6B78FB, #BFDAF5)" }}
    >
      <div className="w-full max-w-sm h-fit relative">
        <Rectangle1 className="absolute -top-12 start-0 z-0" />
        <Rectangle2 className="absolute -bottom-48 end-48 z-0" />
        <div className="w-full bg-white rounded-xl h-full z-10 relative px-5 py-8">
          <div className="mb-6">
            <h1 className="font-bold text-xl leading-[140%]">تسجيل الدخول</h1>
            <p className="font-normal text-base">
              أدخل بيانات المعرّف للمتابعة
            </p>
          </div>
          <form onSubmit={handleSubmit((data) => mutate(data))}>
            {/* <div className="grid gap-2 mb-4">
              <Label>أسم المستخدم</Label>
              <Input
                {...register("username")}
                placeholder="أدخل اسم المستخدم من البطاقة"
                icon={<User />}
                size={"sm"}
                type="text"
                error={
                  errors?.username?.message ? [errors?.username?.message] : []
                }
              />
            </div> */}
            <div className="grid gap-2">
              <Label>المعرّف الخاص</Label>
              <Input
                {...register("id")}
                placeholder="مثال: 9980"
                icon={<IdCard />}
                size={"sm"}
                type="text"
                error={errors.id?.message ? [errors.id.message] : []}
              />
            </div>
            <Button className="w-full mt-4" type="submit" disabled={isPending}>
              {!isPending ? "تسجيل الدخول" : "يرجى الانتضار..."}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
};
