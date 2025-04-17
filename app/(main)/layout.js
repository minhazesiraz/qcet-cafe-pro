import HorizontalTraveling from "./_components/horizontal-traveling";

export default function ProtectsLayout({ children }) {
   return (
      <>
         <HorizontalTraveling />
         <main
         // className="min-h-screen px-4 pt-20 pb-16"
         >
            {children}
         </main>
      </>
   );
}
