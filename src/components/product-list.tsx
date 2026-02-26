import Link from "next/link"
import Image from "next/image"
import { Product } from "@/data/types/product"
import { formatPrice } from "@/utils/functions"

interface ProductListProps {
	isHighlighted?: boolean
	isSearch?: boolean
	product: Product
}

export const ProductList =({
	isHighlighted = false,
	isSearch = false,
	product
}: ProductListProps) => {

	const highlightedClass = isHighlighted ? 'col-span-6 row-span-6' : 'col-span-3 row-span-3'
	const positionClass = isHighlighted ? 'bottom-28 right-28' : 'bottom-10 right-10'

	return(
		<Link href={`/product/${product.slug}`} className={`group relative ${!isSearch && highlightedClass} flex justify-center items-end rounded-lg bg-zinc-900 overflow-hidden`}>
			<Image
				src={product.image}
				width={isSearch ? 400 : 920}
				height={isSearch ? 400 : 920}
				quality={100}
				alt=""
				className="group-hover:scale-105 transition-transform duration-500"
			/>
			<div className={`absolute ${positionClass} h-12 flex items-center gap-2 max-w-70 rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5`}>
				<span className="text-sm truncate">{product.title}</span>
				<span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">{formatPrice(product.price)}</span>
			</div>
		</Link>
	)
}