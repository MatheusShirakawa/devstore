import { ReactNode, Suspense } from "react"
import { Header } from "@/components/header"
import { CartProvider } from "@/contexts/cart-context"

export default function StoreLayout({ children }:{ children: ReactNode}) {
	return (
		<CartProvider>
			<div className="mx-auto grid min-h-screen w-full max-w-400 grid-rows-[min-content_max-content] gap-5 p-8">
				<Suspense fallback={null}>
					<Header />
				</Suspense>
				{children}
			</div>
		</CartProvider>
	)
}