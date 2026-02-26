export function formatPrice(price:number, withComma:boolean = false) {
	if(price == undefined){
		return
	}
	return price.toLocaleString('pt-BR', {
		style: 'currency',
		currency: 'BRL',
		minimumFractionDigits: withComma ? 2 : 0,
		maximumFractionDigits: withComma ? 2 : 0
	})
}