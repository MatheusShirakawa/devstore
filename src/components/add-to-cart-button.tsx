"use client"

import { useCart } from "@/contexts/cart-context"

export interface AddToCartButtonProps {
	productId: number
}

export const AddToCartButton = ({ productId }: AddToCartButtonProps) => {
	const { addToCart } = useCart()

	function handleAddToCart(){
		addToCart(productId)
	}

	return (
		<button
			onClick={handleAddToCart}
			type="button"
			className="mt-8 flex items-center h-12 justify-center rounded-full bg-emerald-600 hover:bg-emerald-400 duration-300 ease-in-out text-white font-semibold cursor-pointer">
				Adicionar ao carrinho
		</button>
	)
}