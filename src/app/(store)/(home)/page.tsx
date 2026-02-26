import { api } from "@/data/api";
import { Product } from "@/data/types/product";
import { Metadata } from "next";
import { ProductList } from "@/components/product-list";

async function getFeaturedProducts(): Promise<Product[]>{
	const response = await api('/products/featured',{
		cache:'no-cache'
		// next:{
		// 	revalidate:60 * 60
		// }
	})
	const products = await response.json()
	return products
}

export const metadata: Metadata = {
  title: 'Home',
}

export default async function Home() {
	const [highlightedProduct, ...otherProducts] = await getFeaturedProducts()

	return (
		<div className="grid max-h-215 grid-cols-9 grid-rows-6 gap-6">
			<ProductList isHighlighted product={highlightedProduct} />

			{otherProducts.map(product => (
				<ProductList key={product.id} product={product} />
			))}
		</div>
	);
}