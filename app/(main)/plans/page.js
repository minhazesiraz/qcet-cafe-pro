"use client";

import { placeOrder } from "@/app/actions/plans-acts";
import { useState } from "react";

export default function PlansPage() {
   const [isPending, setIsPending] = useState(null);

   const products = [
      {
         id: "prod-001",
         name: "Website Builder Pro",
         slug: "website-builder-pro",
         description:
            "A powerful drag-and-drop website builder for freelancers and small businesses.",
         price: 49.99,
         discount: 10,
         category: "Web Tools",
         tags: ["website", "builder", "drag-and-drop", "responsive"],
         image: "https://example.com/images/website-builder.jpg",
         stock: 120,
         rating: 4.5,
         reviews: 35,
         createdAt: "2025-04-20T15:23:00.000Z"
      },
      {
         id: "prod-002",
         name: "SEO Booster Pack",
         slug: "seo-booster-pack",
         description:
            "All-in-one SEO tools to help your website rank higher on search engines.",
         price: 29.0,
         discount: 0,
         category: "Marketing",
         tags: ["seo", "rank", "tools", "optimization"],
         image: "https://example.com/images/seo-booster.jpg",
         stock: 75,
         rating: 4.2,
         reviews: 20,
         createdAt: "2025-04-18T12:45:00.000Z"
      },
      {
         id: "prod-003",
         name: "UI Kit for React",
         slug: "ui-kit-for-react",
         description:
            "Premium UI components and templates for React.js applications.",
         price: 39.0,
         discount: 15,
         category: "UI Components",
         tags: ["react", "ui", "components", "kit"],
         image: "https://example.com/images/react-ui-kit.jpg",
         stock: 40,
         rating: 4.8,
         reviews: 50,
         createdAt: "2025-04-15T10:10:00.000Z"
      },
      {
         id: "prod-004",
         name: "Mobile App Starter Kit",
         slug: "mobile-app-starter-kit",
         description:
            "Starter template for building iOS and Android apps faster.",
         price: 59.0,
         discount: 5,
         category: "Mobile Development",
         tags: ["mobile", "starter", "template", "app"],
         image: "https://example.com/images/mobile-starter.jpg",
         stock: 50,
         rating: 4.3,
         reviews: 25,
         createdAt: "2025-04-10T14:00:00.000Z"
      },
      {
         id: "prod-005",
         name: "Email Marketing Templates",
         slug: "email-marketing-templates",
         description:
            "High-converting email templates for marketing campaigns.",
         price: 19.99,
         discount: 0,
         category: "Marketing",
         tags: ["email", "marketing", "templates"],
         image: "https://example.com/images/email-templates.jpg",
         stock: 200,
         rating: 4.0,
         reviews: 12,
         createdAt: "2025-04-12T08:30:00.000Z"
      },
      {
         id: "prod-006",
         name: "Analytics Dashboard",
         slug: "analytics-dashboard",
         description:
            "Customizable admin dashboard for web apps and SaaS platforms.",
         price: 79.99,
         discount: 20,
         category: "Dashboards",
         tags: ["analytics", "dashboard", "admin"],
         image: "https://example.com/images/analytics-dashboard.jpg",
         stock: 30,
         rating: 4.7,
         reviews: 40,
         createdAt: "2025-04-05T11:20:00.000Z"
      },
      {
         id: "prod-007",
         name: "Landing Page Templates",
         slug: "landing-page-templates",
         description: "Collection of high-converting landing page designs.",
         price: 25.0,
         discount: 10,
         category: "Web Design",
         tags: ["landing page", "templates", "conversion"],
         image: "https://example.com/images/landing-templates.jpg",
         stock: 95,
         rating: 4.4,
         reviews: 30,
         createdAt: "2025-04-01T09:00:00.000Z"
      },
      {
         id: "prod-008",
         name: "eCommerce Starter Theme",
         slug: "ecommerce-starter-theme",
         description:
            "A complete starter theme for online shops built with React and Next.js.",
         price: 99.0,
         discount: 25,
         category: "eCommerce",
         tags: ["ecommerce", "theme", "nextjs"],
         image: "https://example.com/images/ecommerce-theme.jpg",
         stock: 60,
         rating: 4.6,
         reviews: 45,
         createdAt: "2025-04-03T13:15:00.000Z"
      },
      {
         id: "prod-009",
         name: "Photography Portfolio Template",
         slug: "photography-portfolio-template",
         description:
            "Beautiful portfolio template for photographers and artists.",
         price: 45.0,
         discount: 5,
         category: "Portfolio",
         tags: ["photography", "portfolio", "template"],
         image: "https://example.com/images/photography-portfolio.jpg",
         stock: 80,
         rating: 4.1,
         reviews: 22,
         createdAt: "2025-04-07T07:45:00.000Z"
      },
      {
         id: "prod-010",
         name: "Custom Icon Pack",
         slug: "custom-icon-pack",
         description: "Set of 500+ unique icons for web and mobile projects.",
         price: 15.0,
         discount: 0,
         category: "Design Assets",
         tags: ["icons", "design", "pack"],
         image: "https://example.com/images/icon-pack.jpg",
         stock: 300,
         rating: 4.9,
         reviews: 55,
         createdAt: "2025-04-02T18:05:00.000Z"
      }
   ];

   const onSubmit = async (e, productId) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      setIsPending(productId);
      const res = await placeOrder(formData);
      alert(res.message);
      // setIsPending(true);
      setIsPending(null);

      // startTransition(() => {
      //    placeOrder(formData).then((res) => {
      //       alert(res.message)
      //    })
      // })
   };

   return (
      <>
         <p>Plans Page</p>
         <div className="container px-6 m-auto">
            <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
               {products.map((product, i) => (
                  <form
                     key={i}
                     onSubmit={onSubmit}
                     className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200 col-span-4"
                  >
                     {/* Hidden fields */}
                     <input type="hidden" name="name" value={product.name} />
                     <input type="hidden" name="price" value={product.price} />

                     <figure>
                        <img
                           src="https://example.com/images/icon-pack.jpg"
                           alt={product.name}
                           className="aspect-video w-full"
                        />
                     </figure>

                     <div className="p-6">
                        <header className="mb-4">
                           <h3 className="text-xl font-medium text-slate-700">
                              {product.name}
                           </h3>
                           <p className="text-slate-400">${product.price}</p>
                        </header>
                        <p>{product.description}</p>
                     </div>

                     <div className="flex justify-end p-6 pt-0">
                        <button
                           type="submit"
                           className="inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded bg-emerald-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
                           disabled={isPending === product.id}
                        >
                           {isPending ? "Ordering..." : "Order now!"}
                        </button>
                     </div>
                  </form>
               ))}
            </div>
         </div>
      </>
   );
}
