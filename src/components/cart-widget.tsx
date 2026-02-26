"use client"

import { useCart } from "@/contexts/cart-context"
import { ShoppingBag } from "lucide-react"

export function CartWidget(){
	const { items } = useCart()

	return(
		<div className="flex items-center gap-2">
			<ShoppingBag className="w-4 h-4 text-zinc-500"/>
			<span className="text-sm text-zinc-500">Cart ({items.length})</span>
		</div>
	)
}