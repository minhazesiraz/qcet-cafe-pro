import VerticalTraveling from "./_components/vertical-traveling";

export default function ProtectsLayout({ children }) {
   return (
      <>
         <div className="relative flex">
            {/* Side Navigation */}
            <VerticalTraveling />

            {/* Main Content */}
            <main className="flex-1 lg:ml-72 p-6">
               <div className="container m-auto">
                  <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
                     <div className="col-span-4 lg:col-span-12">{children}</div>
                  </div>
               </div>
            </main>
         </div>
      </>
   );
}
