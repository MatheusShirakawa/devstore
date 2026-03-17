"use client"

import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense } from "react"

function SearchMain (){
	const router = useRouter()
	const searchParams = useSearchParams()

	const query = searchParams.get('q')

	function handleSearch(event: React.SubmitEvent<HTMLFormElement>){
		event.preventDefault()

		const formData = new FormData(event.currentTarget)
		const data = Object.fromEntries(formData)

		const query = data.q

		if(!query){
			return null
		}

		router.push(`/search?q=${query}`)
	}

	return(
		<form onSubmit={handleSearch} className="flex w-[320px] gap-3 rounded-full bg-zinc-900 px-5 py-3 ring-zinc-700">
			<button type="submit" className="cursor-pointer">
				<Search className="w-5 h-5 text-zinc-500"/>
			</button>
			<input
				name="q"
				type="text"
				defaultValue={query ?? ''}
				placeholder="Buscar produtos"
				className="flex-1 bg-transparent outline-none text-sm placeholder:text-zinc-500"
			/>
		</form>
	)
}

export function SearchForm(){
	return(
		<Suspense>
			<SearchMain/>
		</Suspense>
	)
}