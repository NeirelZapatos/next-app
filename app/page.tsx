'use client'

import onePiece from "@/public/images/one piece.jpg"
import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/ProductCard/ProductCard";
import { getServerSession } from 'next-auth'
import { authOptions } from "./api/auth/[...nextauth]/route";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { useState } from "react";

const HeavyComponent = dynamic(() => import('./components/HeavyComponent'),
  { 
    // ssr: false,
    loading: () => <p>Loading...</p>
  }
);

// const Header = () => (
//   <div className="navbar bg-base-100" data-theme="light">
//     <div className="navbar-start">
//       <div className="dropdown">
//         <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor">
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M4 6h16M4 12h8m-8 6h16" />
//           </svg>
//         </div>
//         <ul
//           tabIndex={0}
//           className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
//           <li><a>Item 1</a></li>
//           <li>
//             <a>Parent</a>
//             <ul className="p-2">
//               <li><a>Submenu 1</a></li>
//               <li><a>Submenu 2</a></li>
//             </ul>
//           </li>
//           <li><a>Item 3</a></li>
//         </ul>
//       </div>
//       <a className="btn btn-ghost text-xl">daisyUI</a>
//     </div>
//     <div className="navbar-center hidden lg:flex">
//       <ul className="menu menu-horizontal px-1">
//         <li><a>Item 1</a></li>
//         <li>
//           <details>
//             <summary>Parent</summary>
//             <ul className="p-2">
//               <li><a>Submenu 1</a></li>
//               <li><a>Submenu 2</a></li>
//             </ul>
//           </details>
//         </li>
//         <li><a>Item 3</a></li>
//       </ul>
//     </div>
//     <div className="navbar-end">
//       <a className="btn">Button</a>
//     </div>
//   </div>  
// )

export default function Home() {
  const [isVisible, setVisible] = useState(false);
  // const session = await getServerSession(authOptions)

  return (
    <main className="relative h-screen">
      {/* <Header /> */}
      {/* <h1 className="font-poppins">Hello { session && <span>{ session.user!.name }</span>}</h1> */}
      <Link href="/users">Users</Link>
      <ProductCard />
      <Image src={onePiece} alt="One Piece"/>
      <Image src="https://bit.ly/react-cover" alt="React Cover" height={300} width={170} />
      <button onClick={(async () => {
        const _ = (await import('lodash')).default;
        const users = [
          { name: 'c'},
          { name: 'b'},
          { name: 'a'}
        ];

        const sorted = _.orderBy(users, ['name']);
        console.log(sorted);
      })}>Sort</button>

      <button onClick={() => setVisible(true)}>Show</button>
      { isVisible && <HeavyComponent />}
      {/* <Image src="https://bit.ly/react-cover" alt="React Cover" fill style={{ objectFit: 'cover' }}/>
      <Image src="https://bit.ly/react-cover" alt="React Cover" fill style={{ objectFit: 'contain' }}/>
      <Image src="https://bit.ly/react-cover" alt="React Cover" fill className="object-cover" sizes="100vw"/>
      <Image src="https://bit.ly/react-cover" alt="React Cover" fill className="object-cover" sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33 vw" quality={100} priority /> */}
    </main>
  );
}

// used to override the metadata for the website
// export const metadata: Metadata = {
//   title: '...'
// }