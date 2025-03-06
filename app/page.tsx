import { Header } from "@/components/header";
import { VolunteerCalendar } from "@/components/volunteer-calendar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Calendário de Voluntários.
        </h1>
        <VolunteerCalendar />
      </main>
    </div>
  );
}
