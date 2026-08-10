// import { CaseStudyImage, NumberedBlock, Overview } from "@/components/work/CaseStudyPrimitives";

// const galleryImageSizes = "(max-width: 767px) calc(100vw - 2.5rem), (max-width: 1600px) 88vw, 1400px";

// export function GalerieDesTanneursCaseStudy() {
//   return (
//     <div className="page-shell case-study-content py-[var(--section-space)]">
//       <CaseStudyImage
//         src="/projects/galerie-des-tanneurs/Analytics.png"
//         alt="Galerie des Tanneurs analytics dashboard showing commercial activity, sales values and filters"
//         width={1911}
//         height={882}
//         priority
//         sizes={galleryImageSizes}
//       />

//       <div className="mt-[var(--case-study-space)]">
//         <Overview detail="The system connects commercial activity, stock movement and transactions across the day-to-day running of a retail business.">
//           A working system for seeing the business clearly, from inventory to the point of sale.
//         </Overview>
//       </div>

//       <section className="mt-[var(--case-study-space)] grid gap-10 lg:grid-cols-12 lg:items-start">
//         <div className="lg:col-span-3">
//           <NumberedBlock number="01" title="Product management">
//             Product records bring categories, pricing and available quantity into one operational list.
//           </NumberedBlock>
//         </div>
//         <div className="lg:col-span-9 lg:col-start-4">
//           <CaseStudyImage
//             src="/projects/galerie-des-tanneurs/Products.png"
//             alt="Galerie des Tanneurs product management interface with categories, prices, stock quantity and actions"
//             width={1911}
//             height={882}
//             sizes="(max-width: 1023px) calc(100vw - 2.5rem), (max-width: 1600px) 70vw, 1120px"
//           />
//         </div>
//       </section>

//       <section className="mt-[var(--case-study-space)] grid gap-10 lg:grid-cols-12 lg:items-start">
//         <div className="lg:col-span-8">
//           <CaseStudyImage
//             src="/projects/galerie-des-tanneurs/stock-transfers.png"
//             alt="Galerie des Tanneurs stock transfers interface showing preparation, transit and received transfer states"
//             width={1911}
//             height={882}
//             sizes="(max-width: 1023px) calc(100vw - 2.5rem), (max-width: 1600px) 63vw, 1010px"
//           />
//         </div>
//         <div className="lg:col-span-3 lg:col-start-10 lg:pt-16">
//           <NumberedBlock number="02" title="Stock operations">
//             Transfer states and filters surface the movement of goods between the warehouse and stores.
//           </NumberedBlock>
//         </div>
//       </section>

//       <section className="mt-[var(--case-study-space)]">
//         <div className="mb-8 max-w-md">
//           <NumberedBlock number="03" title="Point of sale">
//             EasyPos brings the transaction workspace forward: basket, payment controls and cashier actions stay in view.
//           </NumberedBlock>
//         </div>
//         <CaseStudyImage
//           src="/projects/galerie-des-tanneurs/POS.png"
//           alt="EasyPos cashier interface with basket, payment controls and numeric keypad"
//           width={1911}
//           height={882}
//           sizes={galleryImageSizes}
//         />
//       </section>

//       <section className="mt-[var(--case-study-space)] grid gap-10 lg:grid-cols-12 lg:items-start">
//         <div className="lg:col-span-3">
//           <NumberedBlock number="04" title="Transactions">
//             Ticket history, customer records, items and payment breakdowns make each sale traceable after checkout.
//           </NumberedBlock>
//         </div>
//         <div className="lg:col-span-9 lg:col-start-4">
//           <CaseStudyImage
//             src="/projects/galerie-des-tanneurs/transaction-details.png"
//             alt="EasyPos ticket detail interface with transaction history, products, seller and payment breakdown"
//             width={1911}
//             height={882}
//             sizes="(max-width: 1023px) calc(100vw - 2.5rem), (max-width: 1600px) 70vw, 1120px"
//           />
//         </div>
//       </section>

//       <div className="mt-[var(--case-study-space)] grid gap-12 lg:grid-cols-2 lg:gap-8">
//         <NumberedBlock number="01" title="Challenge">
//           Make interconnected retail operations legible without reducing the depth of the underlying workflows.
//         </NumberedBlock>
//         <NumberedBlock number="02" title="Solution">
//           Dedicated workspaces provide focused control while shared patterns keep product, stock and sales activity connected.
//         </NumberedBlock>
//       </div>
//     </div>
//   );
// }

import {
  CaseStudyImage,
  NumberedBlock,
  Overview,
} from "@/components/work/CaseStudyPrimitives";

export function GalerieDesTanneursCaseStudy() {
  return (
    <div className="page-shell case-study-content pb-[var(--section-space)]">
      <div>
        <Overview detail="A connected retail platform bringing products, inventory, stock movements, sales and operational workflows into one system.">
          A full retail management platform built to connect back-office operations with the day-to-day reality of the point of sale.
        </Overview>
      </div>

      <section className="mt-[var(--case-study-space)] grid gap-10 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-3">
          <NumberedBlock number="01" title="Product management">
            A structured catalogue brings products, variants, pricing, categories
            and stock visibility into one operational workspace.
          </NumberedBlock>
        </div>

        <div className="lg:col-span-9 lg:col-start-4">
          <CaseStudyImage
            src="/projects/galerie-des-tanneurs/Products.png"
            alt="Galerie des Tanneurs product management interface with product variants, pricing and stock information"
            width={1911}
            height={882}
            sizes="(max-width: 1023px) calc(100vw - 2.5rem), (max-width: 1600px) 70vw, 1120px"
          />
        </div>
      </section>

      <section className="mt-[var(--case-study-space)] grid gap-10 lg:grid-cols-12 lg:items-start">
        <div className="order-1 lg:order-2 lg:col-span-3 lg:col-start-10">
          <NumberedBlock number="02" title="Inventory operations">
            Stock moves between the warehouse and stores through traceable
            transfer workflows, keeping every location connected.
          </NumberedBlock>
        </div>

        <div className="order-2 lg:order-1 lg:col-span-8">
          <CaseStudyImage
            src="/projects/galerie-des-tanneurs/stock-transfers.png"
            alt="Galerie des Tanneurs stock transfer interface showing preparation, transit and reception states"
            width={1911}
            height={882}
            sizes="(max-width: 1023px) calc(100vw - 2.5rem), (max-width: 1600px) 63vw, 1010px"
          />
        </div>
      </section>

      <section className="mt-[var(--case-study-space)] grid gap-10 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-3">
          <NumberedBlock number="03" title="Point of sale">
            A touch-first checkout experience keeps products, clients, sellers,
            discounts and payments accessible without slowing down the sale.
          </NumberedBlock>
        </div>

        <div className="lg:col-span-9 lg:col-start-4">
          <CaseStudyImage
            src="/projects/galerie-des-tanneurs/POS.png"
            alt="Galerie des Tanneurs point of sale interface with basket, payment controls and numeric keypad"
            width={1911}
            height={882}
            sizes="(max-width: 1023px) calc(100vw - 2.5rem), (max-width: 1600px) 70vw, 1120px"
          />
        </div>
      </section>

      <section className="mt-[var(--case-study-space)] grid gap-10 lg:grid-cols-12 lg:items-start">
        <div className="lg:order-2 lg:col-span-3 lg:col-start-10">
          <NumberedBlock number="04" title="Transaction history">
            Every sale remains traceable after checkout through its ticket,
            products, payments, client and seller information.
          </NumberedBlock>
        </div>

        <div className="lg:order-1 lg:col-span-8">
          <CaseStudyImage
            src="/projects/galerie-des-tanneurs/transaction-details.png"
            alt="Galerie des Tanneurs transaction detail interface showing products, sellers and payment breakdown"
            width={1911}
            height={882}
            sizes="(max-width: 1023px) calc(100vw - 2.5rem), (max-width: 1600px) 63vw, 1010px"
          />
        </div>
      </section>

      <div className="mt-[var(--case-study-space)] grid gap-12 lg:grid-cols-2 lg:gap-8">
        <NumberedBlock number="01" title="Challenge">
          Turn a large set of interconnected retail workflows into one system
          that remains clear and practical for both back-office teams and
          point-of-sale staff.
        </NumberedBlock>

        <NumberedBlock number="02" title="Solution">
          A unified platform connects catalogue management, inventory, stock
          movements, sales and transaction history while giving each workflow
          its own focused interface.
        </NumberedBlock>
      </div>
    </div>
  );
}
