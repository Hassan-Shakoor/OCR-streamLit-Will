import HeroImage from "@/app/assets/hero-image.svg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { features } from "@/data/features";
import { pricing } from "@/data/pricing";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const { userId } = auth();
  if (userId) {
    // const user = await currentUser();
    // if (user) {
    //     console.log(user.firstName);
    // } else {
    //     console.log('User not found');
    // }
  }
  return (
    <>
      <div className="border-b border-border">
        <main className="container mx-auto">
          <div className="relative md:mt-24 mx-auto w-full max-w-4xl pt-4 text-center">
            <div className="justify-center hidden md:flex">
              <div className="flex flex-row items-center justify-center gap-5 p-1 text-xs bg-card/60 backdrop-blur-lg rounded-md border border-border">
                <Badge className="font-semibold">New</Badge>
                <h5 className={"pr-2"}>View Task history now added</h5>
              </div>
            </div>
            <h1 className="md:text-7xl my-4 font-extrabold text-4xl md:leading-tight">
              Transform book excerpts into perfect notes
            </h1>
            <p className="mx-auto my-4 text-sm w-full max-w-xl text-center font-medium leading-relaxed tracking-wide">
              Upload images of book pages and let our AI generate comprehensive
              notes. Save time and enhance your learning with Booknoter.
            </p>
            <div className="flex flex-row justify-center items-center space-x-4 my-8">
              <Button>
                <Link href="/sign-up">Get Started</Link>
              </Button>
              <Button variant="secondary">Learn More</Button>
            </div>

            <div className="absolute top-0 -z-10 max-h-full max-w-screen-lg w-full h-full blur-2xl">
              <div className="absolute top-24 left-24 w-56 h-56 bg-violet-600 rounded-full mix-blend-multiply opacity-70 animate-blob filter blur-3xl"></div>
              <div className="absolute hidden md:block bottom-2 right-1/4 w-56 h-56 bg-sky-600 rounded-full mix-blend-multiply opacity-70 animate-blob delay-1000 filter blur-3xl"></div>
              <div className="absolute hidden md:block bottom-1/4 left-1/3 w-56 h-56 bg-pink-600 rounded-full mix-blend-multiply opacity-70 animate-blob delay-500 filter blur-3xl"></div>
            </div>
          </div>

          <div className="w-full max-w-4xl mx-auto aspect-[3/2] relative">
            <Image
              src={HeroImage}
              alt="Dashboard ui design"
              priority
              className="object-contain"
              fill
            />
          </div>
        </main>
      </div>

      {/* features */}

      <section className="border-b border-border bg-gradient-to-b from-background to-transparent via-background via-90% relative">
        <div className="container mx-auto text-center">
          <div className="my-24">
            <h5 className="text-primary">WHY CHOOSE US</h5>
            <h2 className="text-4xl font-extrabold my-4">
              Revolutionize your reading with AI note generation
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
              {features.map((feature) => (
                <Card key={feature.title} className="max-w-lg mx-auto">
                  <CardHeader>
                    <div className="w-16 h-16 text-primary-foreground flex justify-center items-center border border-border rounded-xl bg-primary mx-auto">
                      {feature.icon}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute top-0 -z-10 max-h-full w-full h-full blur-2xl">
          <div className="absolute bottom-0 left-0 w-1/2 h-56 bg-violet-600 rounded-full mix-blend-multiply opacity-70 animate-blob filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-56 bg-sky-600 rounded-full mix-blend-multiply opacity-70 animate-blob delay-1000 filter blur-3xl"></div>
        </div>
      </section>
      {/* Pricing */}
      <section className="border-b dark border-border bg-background">
        <div className="container mx-auto text-center">
          <div className="py-14">
            <h2 className="text-4xl font-extrabold my-4 text-foreground">
              Pricing
            </h2>

            <p className="mx-auto my-4 text-sm w-full max-w-md text-muted-foreground font-medium leading-relaxed tracking-wide">
              Only pay for what you use - no monthly commintments. Simply upload
              your book pages and we'll generate detailed AI-powered notes.
              AI-Powered Note Generation Interact with your generated notes via
              custom prompts 1 credit per note generated or Inputted prompt
            </p>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
              {pricing.map((plan) => (
                <Card
                  key={plan.title}
                  className={`relative overflow-hidden w-full mx-auto max-w-lg rounded-3xl shadow-lg transition-transform transform hover:scale-105 
            ${plan.fancy ? "bg-purple-600 text-white" : "bg-card"}`}
                >
                  {plan.fancy && (
                    <Badge className="absolute top-4 right-4 bg-yellow-500 text-white">
                      Popular
                    </Badge>
                  )}

                  {/* Apply overlay to ensure readability */}
                  {plan.fancy && (
                    <div className="absolute inset-0 bg-black/30 z-[-1] rounded-3xl" />
                  )}

                  <CardHeader className="pt-8 pb-4 text-center">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full">
                      <span className="text-3xl font-extrabold">"💼"</span>
                    </div>

                    <CardTitle className="text-2xl font-extrabold tracking-tight">
                      {plan.title}
                    </CardTitle>

                    <h5 className="mt-4 text-3xl font-bold text-white">
                      {plan.credits} credits for {plan.price}
                    </h5>
                  </CardHeader>

                  <CardContent className="px-6">
                    <Button
                      className={`w-full mt-4 py-3 rounded-full text-lg ${
                        plan.fancy
                          ? "bg-white text-purple-600"
                          : "bg-primary text-white"
                      }`}
                    >
                      <Link
                        href={`/checkout?plan=${encodeURIComponent(
                          plan.title
                        )}&price=${encodeURIComponent(
                          plan.price
                        )}&credits=${encodeURIComponent(plan.credits)}`}
                      >
                        Get Started
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
