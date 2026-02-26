import { ProductList } from "@/components/product-list";
import { api } from "@/data/api";
import { Product } from "@/data/types/product";
import { redirect } from "next/navigation";

interface SearchPageProps {
	searchParams:{
		q:string
	}
}

async function searchProducts(query:string): Promise<Product[]>{
	const response = await api(`/products/search?q=${query}`,{
		cache:'no-cache'
		// next:{
		// 	revalidate:60 * 60
		// }
	})
	const products = await response.json()
	return products
}


export default async function SearchPage({ searchParams }:SearchPageProps){
	const { q: query } = await searchParams


	const products = await searchProducts(query)

	if(!query){
		redirect('/')
	}

	return(
		<div className="flex flex-col gap-4">
			<p className="text-sm">Resultados para: <span className="font-semibold">{query}</span></p>

			<div className="grid grid-cols-3 gap-6">
				{products.map(product => (
					<ProductList
						key={product.id}
						isSearch={true}
						product={product}
					/>
				))}
			</div>
		</div>
	)
}