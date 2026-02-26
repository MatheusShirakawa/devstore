import { AddToCartButton } from "@/components/add-to-cart-button"
import { api } from "@/data/api"
import { Product } from "@/data/types/product"
import { formatPrice } from "@/utils/functions"
import { Metadata } from "next"
import Image from "next/image"

interface ProductProps {
	params:{
		slug:string
	}
}

async function getProduct(slug:string): Promise<Product>{
	const response = await api(`/products/${slug}`,{
		next:{
			revalidate:60 * 60 // 1 hour
		}
	})
	const product = await response.json()
	return product
}

export async function generateMetadata({ params }:ProductProps): Promise<Metadata> {
	const { slug } = await params
	const product = await getProduct(slug)

	return {
		title: product.title
	}
}

export async function generateStaticParams(){
	const response = await api('/products/featured')

	const products: Product[] = await response.json()

	return products.map(product => {
		return { slug:product.slug }
	})
}

export default async function ProductPage({ params }: ProductProps) {
	const { slug } = await params
  	const product = await getProduct(slug)
	const sizes = [
		'PP',
		'P',
		'M',
		'G',
		'GG'
	]

	return(
		<div className="relative grid max-h-215 grid-cols-3">
			<div className="col-span-2 overflow-hidden">
				<Image
					src={product.image}
					width={1000}
					height={1000}
					quality={100}
					loading="eager"
					alt=""
				/>
			</div>
			<div className="flex flex-col justify-center px-12">
				<h1 className="text-3xl font-bold leading-tight">{product.title}</h1>
				<p className="mt-2 leading-relaxed text-zinc-400">
					{product.description}
				</p>
				<div className="mt-8 flex items-center gap-3">
					<span className="inline-block px-5 py-2.5 font-semibold rounded-full bg-violet-500">{formatPrice(product.price)}</span>
					em até 12x sem juros <span className="text-sm text-zinc-400">{formatPrice(product.price / 12, true)}</span>
				</div>
				<div className="mt-8 space-y-4">
					<span className="block font-semibold">Tamanhos</span>
					<div className="flex gap-2">
						{sizes.map((size,index) => (
							<button
								key={index}
								type="button"
								className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold cursor-pointer">{size}
							</button>
						))}
					</div>
				</div>

				<AddToCartButton productId={product.id}/>
			</div>
		</div>
	)
}