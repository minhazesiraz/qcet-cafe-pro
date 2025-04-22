import { getProducts } from "@/queries/products-qrs";

export default async function Client_Page() {
   const products = await getProducts();
   console.log(products);

   //  how to some total price of all products in the array
   const totalPrice = products.reduce((acc, product) => {
      return acc + parseFloat(product.price);
   }, 0);

   return (
      <>
         <span>{totalPrice}</span>
         <p>Client Page</p>
         <p>This page is protected and requires authentication.</p>
         <div>
            {products.map((product) => (
               <div
                  key={product._id}
                  className="border p-4 mb-4 rounded-md shadow-md bg-white"
               >
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-gray-600">Price: ${product.price}</p>
               </div>
            ))}
         </div>
      </>
   );
}
