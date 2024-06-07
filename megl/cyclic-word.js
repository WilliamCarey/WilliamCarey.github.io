
class CyclicWordModel {
	constructor(len, alphabet)
	{
		this.delegates = new Array()
		
		this.alphabet = alphabet
		this.length = len
				
		this.values = Array.from({ length: this.length}, (v, i) => 0)
	}

	addDelegate(delegate)
	{
		this.delegates.push(delegate)
	}

	valueAtIndex(index)
	{
		return this.values[index]
	}

	setValueAtIndex(index, value)
	{
		this.values[index] = value
		
		this.delegates.forEach((d) => {
			d.valueDidChange(this, index)
		});
	}
	
	incrementValueAtIndex(index)
	{
		this.delegates.forEach((d) => {
			d.valueDidChange(this, index)
		});
	}
		
	rotateLeft(shiftSize)
	{
		console.log("rotl");
		
		var temp = this.values[0]
		for (var x = 0; x < this.length-1; x++)
		{
			this.values[x] = this.values[x+1]
		}		
		this.values[this.length-1] = temp

		this.delegates.forEach((d) => {
			d.allValuesDidChange(this)
		});
	}
	
	rotateRight(shiftSize)
	{
		console.log("rotr")
		
		var temp = this.values[this.length-1]

		for (var x = this.length-1; x > 0; x--)
		{
			this.values[x] = this.values[x-1]
		}		
		this.values[0] = temp
		
		this.delegates.forEach((d) => {
			d.allValuesDidChange(this)
		});
	}
}

class CyclicWordViewController
{
	constructor(element)
	{
		this.element = element
		console.log(this.element)
		// This delegate will own a horizontal table that represents the cyclic word and has buttons to modify it.
		
		this.cells = []
		
		this.rotl_button = document.createElement("button");
		this.rotl_button.innerText = "<--"
		
		this.element.appendChild(this.rotl_button)
		
		this.rotr_button = document.createElement("button");
		this.rotr_button.innerText = "-->"

		this.element.appendChild(this.rotr_button)		

		this.values = document.createElement("table")

		this.values_row = document.createElement("tr")
		this.values.appendChild(this.values_row)
		
		this.element.appendChild(this.values)
	}
	
	setModel(model)
	{
		this.model = model
		console.log("Setting Model to:", this.model)

		this.rotr_button.addEventListener("click", (e) => {
			this.model.rotateRight(1)
		});

		this.rotl_button.addEventListener("click", (e) => {
			this.model.rotateLeft(1)
		});

		this.cells = Array.from({ length: this.model.length}, (v, i) => document.createElement("td"))
				
		for(var x = 0; x < this.model.length; x++)
		{
			this.cells[x].innerHTML = this.model.valueAtIndex(x)
			this.values_row.appendChild(this.cells[x])
		}
	}
	
	allValuesDidChange(model)
	{
		if (this.cells.length == 0) return;

		for(var x = 0; x < this.model.length; x++)
		{
			this.cells[x].innerHTML = this.model.valueAtIndex(x)
		}
	}
	
	valueDidChange(model, index)
	{
		if (this.cells.length == 0) return;
		this.cells[index].innerHTML = this.model.valueAtIndex(x)
	}
}
